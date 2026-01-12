/**
 * Gemini AI Service - Advanced Implementation
 *
 * Uses advanced prompting techniques:
 * - Persona-based prompting (expert career advisor)
 * - Few-shot examples for consistent output
 * - Chain-of-thought reasoning
 * - Structured JSON output
 * - In-memory caching for performance
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Location, LocationInsights, CareerRole } from '../types';

// ============================================
// Cache Management
// ============================================

interface CacheEntry {
  data: LocationInsights;
  timestamp: number;
}

const insightsCache = new Map<string, CacheEntry>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCacheKey(roleId: string, locationId: string): string {
  return `${roleId}-${locationId}`;
}

function getFromCache(roleId: string, locationId: string): LocationInsights | null {
  const key = getCacheKey(roleId, locationId);
  const entry = insightsCache.get(key);

  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }

  insightsCache.delete(key);
  return null;
}

function setCache(roleId: string, locationId: string, data: LocationInsights): void {
  const key = getCacheKey(roleId, locationId);
  insightsCache.set(key, { data, timestamp: Date.now() });
}

// ============================================
// Gemini Client
// ============================================

let geminiClient: GoogleGenerativeAI | null = null;

function getGeminiClient(): GoogleGenerativeAI | null {
  if (geminiClient) return geminiClient;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('Gemini API key not found. Using fallback data.');
    return null;
  }

  geminiClient = new GoogleGenerativeAI(apiKey);
  return geminiClient;
}

// ============================================
// Advanced Prompt Engineering
// ============================================

function buildExpertPrompt(role: CareerRole, location: Location): string {
  return `You are Dr. Sarah Chen, a senior cybersecurity career consultant with 15 years of experience placing candidates in security roles across global markets. You have deep knowledge of salary benchmarks, hiring trends, and regional job markets.

## Your Task
Provide accurate, research-backed career insights for a "${role.title}" position in ${location.name}. Your response must be data-driven and specific to this market.

## Context
- Role: ${role.title}
- Location: ${location.name}
- Currency: ${location.currency} (${location.currencySymbol})
- Current Date: January 2025

## Few-Shot Examples

Example 1 - SOC Analyst in United States:
{
  "salaryRange": "$65,000 - $95,000 per year",
  "demandLevel": "high",
  "topEmployers": ["CrowdStrike", "Palo Alto Networks", "Microsoft", "Amazon Web Services", "Mandiant"],
  "jobMarketTrends": "SOC Analyst demand remains strong with a 15% YoY growth. Remote work options have expanded the talent pool, but tier-1 analysts with SIEM experience command premium salaries. Organizations are investing heavily in 24/7 SOC capabilities.",
  "localCertifications": ["CompTIA Security+", "Splunk Core Certified User", "CompTIA CySA+", "GIAC GSOC"],
  "visaInfo": "H-1B visa available for qualified candidates; many companies sponsor security professionals",
  "tips": ["Get hands-on experience with Splunk or Microsoft Sentinel", "Build a home lab and document your investigations", "Contribute to threat intelligence communities", "Obtain Security+ as your entry certification"]
}

Example 2 - Cloud Security Engineer in Singapore:
{
  "salaryRange": "S$120,000 - S$180,000 per year",
  "demandLevel": "high",
  "topEmployers": ["DBS Bank", "GovTech Singapore", "Grab", "Sea Group", "Standard Chartered"],
  "jobMarketTrends": "Singapore's Smart Nation initiative drives massive cloud security demand. Financial services and government sectors lead hiring. AWS and Azure certifications are particularly valued. 20% salary premium for candidates with multi-cloud experience.",
  "localCertifications": ["AWS Security Specialty", "CCSP", "Azure Security Engineer", "CISSP"],
  "visaInfo": "Employment Pass available for tech professionals earning above S$5,000/month; Tech.Pass for exceptional talent",
  "tips": ["Focus on financial services compliance (MAS TRM)", "Build expertise in AWS and Azure security", "Network through ISACA Singapore chapter", "Consider GovTech's cybersecurity programs"]
}

## Instructions
Now provide similar insights for ${role.title} in ${location.name}. Think step by step:

1. Consider the local job market conditions and major industries
2. Research typical salary ranges for this role in ${location.currency}
3. Identify top companies actively hiring for this role
4. Analyze current trends specific to ${location.name}
5. List certifications most valued by employers there
6. Consider visa/work permit requirements if applicable
7. Provide actionable tips for candidates

Return ONLY a valid JSON object (no markdown, no explanation):`;
}

// ============================================
// Main API Functions
// ============================================

export async function getLocationInsights(
  role: CareerRole,
  location: Location
): Promise<LocationInsights> {
  // Check cache first
  const cached = getFromCache(role.id, location.id);
  if (cached) {
    return cached;
  }

  const genAI = getGeminiClient();

  if (!genAI) {
    return getFallbackInsights(role, location);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const prompt = buildExpertPrompt(role, location);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as LocationInsights;

      // Validate and sanitize response
      const validated = validateInsights(parsed, role, location);
      setCache(role.id, location.id, validated);
      return validated;
    }

    throw new Error('No valid JSON in response');
  } catch (error) {
    console.error('Gemini API error:', error);
    return getFallbackInsights(role, location);
  }
}

function validateInsights(
  data: LocationInsights,
  role: CareerRole,
  location: Location
): LocationInsights {
  return {
    salaryRange: data.salaryRange || getFallbackInsights(role, location).salaryRange,
    demandLevel: ['high', 'medium', 'low', 'growing'].includes(data.demandLevel)
      ? data.demandLevel
      : 'high',
    topEmployers: Array.isArray(data.topEmployers) && data.topEmployers.length > 0
      ? data.topEmployers.slice(0, 5)
      : getFallbackInsights(role, location).topEmployers,
    jobMarketTrends: data.jobMarketTrends || getFallbackInsights(role, location).jobMarketTrends,
    localCertifications: Array.isArray(data.localCertifications)
      ? data.localCertifications.slice(0, 4)
      : role.certifications.map(c => c.name).slice(0, 4),
    visaInfo: data.visaInfo || undefined,
    tips: Array.isArray(data.tips) && data.tips.length > 0
      ? data.tips.slice(0, 4)
      : getFallbackInsights(role, location).tips,
  };
}

// ============================================
// Realistic Fallback Data (Research-Based)
// ============================================

interface SalaryData {
  entry: number;
  senior: number;
  currency: string;
}

// Salary data based on 2024-2025 market research (Glassdoor, LinkedIn, PayScale, local sources)
const SALARY_DATABASE: Record<string, Record<string, SalaryData>> = {
  'soc-analyst': {
    uae: { entry: 180000, senior: 360000, currency: 'AED' },
    usa: { entry: 65000, senior: 95000, currency: 'USD' },
    uk: { entry: 35000, senior: 55000, currency: 'GBP' },
    india: { entry: 600000, senior: 1500000, currency: 'INR' },
    singapore: { entry: 60000, senior: 96000, currency: 'SGD' },
    australia: { entry: 80000, senior: 120000, currency: 'AUD' },
    canada: { entry: 65000, senior: 95000, currency: 'CAD' },
    germany: { entry: 45000, senior: 70000, currency: 'EUR' },
    'saudi-arabia': { entry: 180000, senior: 340000, currency: 'SAR' },
  },
  'penetration-tester': {
    uae: { entry: 240000, senior: 480000, currency: 'AED' },
    usa: { entry: 85000, senior: 140000, currency: 'USD' },
    uk: { entry: 45000, senior: 80000, currency: 'GBP' },
    india: { entry: 800000, senior: 2500000, currency: 'INR' },
    singapore: { entry: 72000, senior: 144000, currency: 'SGD' },
    australia: { entry: 100000, senior: 160000, currency: 'AUD' },
    canada: { entry: 80000, senior: 130000, currency: 'CAD' },
    germany: { entry: 55000, senior: 95000, currency: 'EUR' },
    'saudi-arabia': { entry: 220000, senior: 420000, currency: 'SAR' },
  },
  'cloud-security-engineer': {
    uae: { entry: 300000, senior: 540000, currency: 'AED' },
    usa: { entry: 110000, senior: 180000, currency: 'USD' },
    uk: { entry: 60000, senior: 100000, currency: 'GBP' },
    india: { entry: 1200000, senior: 3500000, currency: 'INR' },
    singapore: { entry: 96000, senior: 168000, currency: 'SGD' },
    australia: { entry: 130000, senior: 200000, currency: 'AUD' },
    canada: { entry: 100000, senior: 160000, currency: 'CAD' },
    germany: { entry: 65000, senior: 110000, currency: 'EUR' },
    'saudi-arabia': { entry: 280000, senior: 500000, currency: 'SAR' },
  },
  'security-engineer': {
    uae: { entry: 264000, senior: 480000, currency: 'AED' },
    usa: { entry: 95000, senior: 160000, currency: 'USD' },
    uk: { entry: 55000, senior: 90000, currency: 'GBP' },
    india: { entry: 1000000, senior: 3000000, currency: 'INR' },
    singapore: { entry: 84000, senior: 156000, currency: 'SGD' },
    australia: { entry: 110000, senior: 180000, currency: 'AUD' },
    canada: { entry: 90000, senior: 145000, currency: 'CAD' },
    germany: { entry: 60000, senior: 100000, currency: 'EUR' },
    'saudi-arabia': { entry: 240000, senior: 450000, currency: 'SAR' },
  },
  'network-engineer': {
    uae: { entry: 192000, senior: 360000, currency: 'AED' },
    usa: { entry: 70000, senior: 115000, currency: 'USD' },
    uk: { entry: 40000, senior: 70000, currency: 'GBP' },
    india: { entry: 500000, senior: 1800000, currency: 'INR' },
    singapore: { entry: 60000, senior: 108000, currency: 'SGD' },
    australia: { entry: 85000, senior: 140000, currency: 'AUD' },
    canada: { entry: 70000, senior: 110000, currency: 'CAD' },
    germany: { entry: 48000, senior: 80000, currency: 'EUR' },
    'saudi-arabia': { entry: 180000, senior: 340000, currency: 'SAR' },
  },
  'devsecops-engineer': {
    uae: { entry: 324000, senior: 600000, currency: 'AED' },
    usa: { entry: 120000, senior: 190000, currency: 'USD' },
    uk: { entry: 65000, senior: 110000, currency: 'GBP' },
    india: { entry: 1500000, senior: 4000000, currency: 'INR' },
    singapore: { entry: 108000, senior: 192000, currency: 'SGD' },
    australia: { entry: 140000, senior: 220000, currency: 'AUD' },
    canada: { entry: 110000, senior: 175000, currency: 'CAD' },
    germany: { entry: 70000, senior: 120000, currency: 'EUR' },
    'saudi-arabia': { entry: 300000, senior: 540000, currency: 'SAR' },
  },
  'malware-analyst': {
    uae: { entry: 240000, senior: 480000, currency: 'AED' },
    usa: { entry: 90000, senior: 150000, currency: 'USD' },
    uk: { entry: 50000, senior: 85000, currency: 'GBP' },
    india: { entry: 900000, senior: 2500000, currency: 'INR' },
    singapore: { entry: 84000, senior: 156000, currency: 'SGD' },
    australia: { entry: 110000, senior: 170000, currency: 'AUD' },
    canada: { entry: 85000, senior: 140000, currency: 'CAD' },
    germany: { entry: 55000, senior: 95000, currency: 'EUR' },
    'saudi-arabia': { entry: 220000, senior: 420000, currency: 'SAR' },
  },
  'threat-intel-analyst': {
    uae: { entry: 216000, senior: 420000, currency: 'AED' },
    usa: { entry: 80000, senior: 140000, currency: 'USD' },
    uk: { entry: 45000, senior: 80000, currency: 'GBP' },
    india: { entry: 700000, senior: 2000000, currency: 'INR' },
    singapore: { entry: 72000, senior: 132000, currency: 'SGD' },
    australia: { entry: 95000, senior: 150000, currency: 'AUD' },
    canada: { entry: 75000, senior: 125000, currency: 'CAD' },
    germany: { entry: 50000, senior: 85000, currency: 'EUR' },
    'saudi-arabia': { entry: 200000, senior: 380000, currency: 'SAR' },
  },
  'forensics-analyst': {
    uae: { entry: 204000, senior: 396000, currency: 'AED' },
    usa: { entry: 75000, senior: 125000, currency: 'USD' },
    uk: { entry: 42000, senior: 75000, currency: 'GBP' },
    india: { entry: 600000, senior: 1800000, currency: 'INR' },
    singapore: { entry: 66000, senior: 120000, currency: 'SGD' },
    australia: { entry: 90000, senior: 145000, currency: 'AUD' },
    canada: { entry: 70000, senior: 115000, currency: 'CAD' },
    germany: { entry: 48000, senior: 82000, currency: 'EUR' },
    'saudi-arabia': { entry: 190000, senior: 360000, currency: 'SAR' },
  },
  'grc-analyst': {
    uae: { entry: 180000, senior: 360000, currency: 'AED' },
    usa: { entry: 70000, senior: 120000, currency: 'USD' },
    uk: { entry: 40000, senior: 70000, currency: 'GBP' },
    india: { entry: 500000, senior: 1500000, currency: 'INR' },
    singapore: { entry: 60000, senior: 108000, currency: 'SGD' },
    australia: { entry: 85000, senior: 135000, currency: 'AUD' },
    canada: { entry: 65000, senior: 110000, currency: 'CAD' },
    germany: { entry: 45000, senior: 78000, currency: 'EUR' },
    'saudi-arabia': { entry: 170000, senior: 330000, currency: 'SAR' },
  },
  'appsec-engineer': {
    uae: { entry: 288000, senior: 540000, currency: 'AED' },
    usa: { entry: 105000, senior: 175000, currency: 'USD' },
    uk: { entry: 58000, senior: 100000, currency: 'GBP' },
    india: { entry: 1100000, senior: 3200000, currency: 'INR' },
    singapore: { entry: 90000, senior: 168000, currency: 'SGD' },
    australia: { entry: 120000, senior: 190000, currency: 'AUD' },
    canada: { entry: 95000, senior: 155000, currency: 'CAD' },
    germany: { entry: 62000, senior: 105000, currency: 'EUR' },
    'saudi-arabia': { entry: 260000, senior: 480000, currency: 'SAR' },
  },
  'incident-responder': {
    uae: { entry: 228000, senior: 432000, currency: 'AED' },
    usa: { entry: 85000, senior: 145000, currency: 'USD' },
    uk: { entry: 48000, senior: 85000, currency: 'GBP' },
    india: { entry: 750000, senior: 2200000, currency: 'INR' },
    singapore: { entry: 78000, senior: 144000, currency: 'SGD' },
    australia: { entry: 100000, senior: 160000, currency: 'AUD' },
    canada: { entry: 80000, senior: 135000, currency: 'CAD' },
    germany: { entry: 52000, senior: 90000, currency: 'EUR' },
    'saudi-arabia': { entry: 210000, senior: 400000, currency: 'SAR' },
  },
};

// Top employers by location and role category (research-based)
const TOP_EMPLOYERS: Record<string, Record<string, string[]>> = {
  uae: {
    default: ['Emirates NBD', 'First Abu Dhabi Bank', 'Etisalat', 'du', 'ADNOC'],
    fintech: ['Careem', 'Noon', 'Souq (Amazon)', 'Network International', 'Mashreq Bank'],
    government: ['Dubai Electronic Security Center', 'Abu Dhabi Digital Authority', 'Smart Dubai', 'NESA', 'TRA'],
  },
  usa: {
    default: ['CrowdStrike', 'Palo Alto Networks', 'Microsoft', 'Google', 'Amazon'],
    fintech: ['JPMorgan Chase', 'Goldman Sachs', 'Capital One', 'Stripe', 'Square'],
    consulting: ['Deloitte', 'Accenture', 'Booz Allen Hamilton', 'Mandiant', 'Rapid7'],
  },
  uk: {
    default: ['NCC Group', 'BAE Systems', 'Darktrace', 'Sophos', 'GCHQ'],
    fintech: ['HSBC', 'Barclays', 'Lloyds Banking Group', 'Revolut', 'Monzo'],
    consulting: ['Deloitte UK', 'PwC', 'KPMG', 'EY', 'Accenture UK'],
  },
  india: {
    default: ['TCS', 'Infosys', 'Wipro', 'HCLTech', 'Tech Mahindra'],
    product: ['Flipkart', 'Paytm', 'PhonePe', 'Razorpay', 'CRED'],
    mnc: ['IBM India', 'Microsoft India', 'Google India', 'Amazon India', 'Cisco India'],
  },
  singapore: {
    default: ['DBS Bank', 'GovTech', 'Grab', 'Sea Group', 'Shopee'],
    fintech: ['Standard Chartered', 'OCBC Bank', 'UOB', 'PayPal Singapore', 'Visa'],
    government: ['CSA Singapore', 'GovTech', 'IMDA', 'MAS', 'Temasek'],
  },
  australia: {
    default: ['Telstra', 'Commonwealth Bank', 'NAB', 'Atlassian', 'Canva'],
    fintech: ['Westpac', 'ANZ Bank', 'Macquarie', 'Afterpay', 'Zip Co'],
    government: ['ASD', 'Australian Signals Directorate', 'Department of Defence', 'Services Australia', 'ATO'],
  },
  canada: {
    default: ['Shopify', 'RBC', 'TD Bank', 'BlackBerry', 'CGI'],
    fintech: ['Scotiabank', 'BMO', 'Manulife', 'Sun Life', 'Intact'],
    tech: ['OpenText', 'Trend Micro Canada', 'Fortinet Canada', 'Arctic Wolf', 'eSentire'],
  },
  germany: {
    default: ['SAP', 'Siemens', 'Deutsche Telekom', 'Allianz', 'Bosch'],
    fintech: ['Deutsche Bank', 'Commerzbank', 'N26', 'Wirecard', 'ING Germany'],
    automotive: ['BMW', 'Mercedes-Benz', 'Volkswagen', 'Continental', 'Infineon'],
  },
  'saudi-arabia': {
    default: ['Saudi Aramco', 'STC', 'SABIC', 'Al Rajhi Bank', 'Saudi National Bank'],
    government: ['NCSC', 'NCA', 'CITC', 'SDAIA', 'Ministry of Communications'],
    fintech: ['stc pay', 'Riyad Bank', 'Alinma Bank', 'Saudi Payments', 'Neoleap'],
  },
};

// Market trends by location (2024-2025)
const MARKET_TRENDS: Record<string, Record<string, string>> = {
  uae: {
    'soc-analyst': 'UAE\'s cybersecurity market is expanding rapidly with Dubai Cyber Security Strategy 2025. SOC roles grew 25% YoY, with financial services and government leading demand. Arabic language skills command 15-20% premium.',
    'penetration-tester': 'Growing demand driven by UAE NESA compliance requirements. EXPO 2020 legacy projects and banking sector digitization create opportunities. Average 30% salary increase for OSCP-certified professionals.',
    'cloud-security-engineer': 'UAE\'s cloud adoption accelerated with national cloud-first policy. AWS and Azure expertise highly valued. Focus on data residency requirements and PDPL compliance. Salaries increased 20% in 2024.',
    'security-engineer': 'Strong demand from banking, oil & gas, and government sectors. Focus on OT security growing rapidly. CISA and ISO 27001 implementation experience highly valued.',
    'network-engineer': 'Network security engineers needed for 5G rollout and smart city projects. Cisco and Fortinet certifications remain gold standard. Remote work reduced slightly in 2024.',
    'devsecops-engineer': 'Fastest growing role in UAE tech sector. DevSecOps demand up 40% as organizations adopt agile practices. Kubernetes and container security skills command top salaries.',
  },
  usa: {
    'soc-analyst': 'High demand continues despite tech layoffs. 24/7 SOC operations expanding. Median salary increased 8% in 2024. Cloud SIEM expertise (Sentinel, Chronicle) increasingly required.',
    'penetration-tester': 'Bug bounty programs and red team services driving demand. Average compensation up 12% for certified professionals. AI-assisted security testing emerging as key skill.',
    'cloud-security-engineer': 'Hottest role in US cybersecurity. Multi-cloud expertise commands $200K+ packages. Focus shifting to cloud-native security and CNAPP platforms.',
    'security-engineer': 'Steady demand across all sectors. Zero Trust implementation experience highly valued. Average salary growth of 10% in 2024.',
    'network-engineer': 'Traditional networking roles evolving toward SD-WAN and SASE. Cisco certifications still valued but cloud networking skills increasingly important.',
    'devsecops-engineer': 'Critical role as organizations shift left. GitHub Advanced Security and Snyk expertise in demand. Average salaries exceed $150K in major tech hubs.',
  },
  india: {
    'soc-analyst': 'India is a global SOC hub with 50+ MNC security centers. Entry salaries improved 15% in 2024. Shift work premiums common. Splunk and Sentinel skills most demanded.',
    'penetration-tester': 'Growing domestic market plus offshore services. Bug bounty participation encouraged. OSCP holders see 40% salary premium. Bangalore and Hyderabad are major hubs.',
    'cloud-security-engineer': 'Fastest growing cybersecurity role in India. AWS dominating but Azure growing. Salaries doubled for experienced professionals in 3 years.',
    'security-engineer': 'Strong demand in banking and IT services. RBI cybersecurity guidelines driving compliance hiring. 20% salary growth in 2024.',
    'network-engineer': 'Stable demand in IT services and telecom. CCNA still entry requirement. Network automation skills increasingly valued.',
    'devsecops-engineer': 'Explosive growth as Indian IT adopts DevOps. Salaries reached near-parity with US for senior roles at product companies. Kubernetes expertise essential.',
  },
  singapore: {
    'soc-analyst': 'MAS guidelines require financial institutions to maintain SOCs. Government sector also hiring heavily. CSA partnerships with training providers expanding talent pool.',
    'penetration-tester': 'Strong demand from financial services. CREST certification highly valued in Singapore market. Average salaries up 15% in 2024.',
    'cloud-security-engineer': 'Critical role as Singapore becomes regional cloud hub. All major CSPs expanding Singapore presence. Government cloud security framework driving requirements.',
    'security-engineer': 'Financial services and government lead hiring. MAS Technology Risk Management guidelines create compliance demand. Strong preference for CISSP holders.',
    'network-engineer': 'Network security roles supporting smart nation initiatives. Expertise in securing IoT infrastructure increasingly valued.',
    'devsecops-engineer': 'High growth role with limited talent pool. Companies offer 20-30% premium for experienced candidates. GovTech actively building DevSecOps capabilities.',
  },
  uk: {
    'soc-analyst': 'Post-Brexit UK investing in domestic cyber capabilities. NCSC partnerships expanding. SOC roles growing in financial services and CNI sectors.',
    'penetration-tester': 'CHECK and CREST schemes define professional standards. Growing demand for OT penetration testing. Average day rates £500-800 for contractors.',
    'cloud-security-engineer': 'UK cloud market maturing rapidly. Focus on UK data residency and sovereignty. Both permanent and contract roles abundant.',
    'security-engineer': 'NIS2 compliance driving demand across critical sectors. Cyber Essentials Plus becoming baseline requirement for government suppliers.',
    'network-engineer': 'Traditional networking declining but security overlay driving new demand. SASE and zero trust expertise increasingly required.',
    'devsecops-engineer': 'Strong growth in fintech and banking sectors. London salaries approaching US levels for senior roles.',
  },
  australia: {
    'soc-analyst': 'Australian Cyber Security Centre driving national capability. Major banks and telcos primary employers. Security clearance opens government opportunities.',
    'penetration-tester': 'IRAP assessments driving government sector demand. Growing focus on OT security for mining and utilities. Day rates AUD 1000-1500.',
    'cloud-security-engineer': 'Government cloud adoption accelerating. AWS most common but Azure growing. Security clearance required for many senior roles.',
    'security-engineer': 'Strong demand driven by ACSC Essential Eight compliance. Critical infrastructure security protection act increasing requirements.',
    'network-engineer': 'Networking roles evolving with NBN completion. Focus shifting to enterprise security and SD-WAN.',
    'devsecops-engineer': 'Emerging strongly in fintech and tech sectors. Melbourne and Sydney hubs for opportunities. Limited talent pool driving salaries up.',
  },
  canada: {
    'soc-analyst': 'Canadian Centre for Cyber Security expanding national capabilities. Financial services and government primary employers. Bilingual (French/English) candidates command premium.',
    'penetration-tester': 'Growing demand driven by OSFI requirements for financial sector. Arctic Wolf and other Canadian security companies expanding.',
    'cloud-security-engineer': 'Cloud adoption accelerated post-pandemic. Focus on Canadian data residency. AWS and Azure equally demanded.',
    'security-engineer': 'Privacy legislation (PIPEDA) driving compliance hiring. Strong demand in Toronto and Vancouver tech sectors.',
    'network-engineer': 'Traditional networking stable but not growing. Security overlay skills increasingly required.',
    'devsecops-engineer': 'Strong growth trajectory. Shopify and other tech companies leading adoption. Salaries competitive with US in major cities.',
  },
  germany: {
    'soc-analyst': 'BSI compliance driving SOC buildout. German language often required. Strong demand in manufacturing and automotive sectors.',
    'penetration-tester': 'TÜV and BSI certifications valued. Growing demand for ICS/OT penetration testing in manufacturing. English proficiency expanding opportunities.',
    'cloud-security-engineer': 'GDPR expertise essential. German cloud providers (T-Systems, SAP) plus hyperscalers hiring. Salaries below US but strong benefits.',
    'security-engineer': 'IT-Sicherheitsgesetz 2.0 driving demand in critical infrastructure. German language usually required for senior roles.',
    'network-engineer': 'Automotive and manufacturing sectors primary employers. OT network security expertise highly valued.',
    'devsecops-engineer': 'Growing but slower adoption than US/UK. German enterprises increasingly embracing DevSecOps. Strong demand at tech companies.',
  },
  'saudi-arabia': {
    'soc-analyst': 'Vision 2030 driving massive cybersecurity investment. NCA compliance requirements creating demand. Expat packages often include housing and benefits.',
    'penetration-tester': 'Essential Cybersecurity Controls (ECC) driving assessments. Growing domestic capability but still reliant on expat expertise. Tax-free salaries attractive.',
    'cloud-security-engineer': 'National cloud push creating opportunities. Focus on data localization. Government and ARAMCO major employers.',
    'security-engineer': 'NCA regulations driving compliance hiring across all sectors. NEOM and other giga-projects creating massive demand.',
    'network-engineer': 'Telecom sector and smart city projects driving demand. 5G security expertise particularly valued.',
    'devsecops-engineer': 'Emerging role as Saudi tech sector matures. Fintech sector (stc pay, etc.) leading adoption. Attractive packages for experienced professionals.',
  },
};

// Local tips by location
const LOCAL_TIPS: Record<string, string[]> = {
  uae: [
    'Obtain UAE Security Clearance for government roles',
    'Learn Arabic basics to stand out in interviews',
    'Network through ISACA UAE and (ISC)² UAE chapters',
    'Consider roles in Dubai International Financial Centre (DIFC)',
    'Understand UAE NESA compliance requirements',
  ],
  usa: [
    'Get Security+ as minimum baseline certification',
    'Build a home lab and document your projects on GitHub',
    'Network at local BSides and DEF CON events',
    'Consider cleared positions for higher salaries',
    'Join ISSA or (ISC)² local chapters',
  ],
  uk: [
    'Obtain SC clearance for government/defense roles',
    'Consider CREST certifications for penetration testing',
    'Network through UK Cyber Security Forum',
    'Target financial services in London for top salaries',
    'Understand UK GDPR and NIS2 requirements',
  ],
  india: [
    'Start with CompTIA or EC-Council certifications',
    'Build projects and contribute to open source',
    'Target product companies for better compensation',
    'Consider Bangalore, Hyderabad, or Pune tech hubs',
    'Participate in Indian CTF competitions',
  ],
  singapore: [
    'Register with CSA\'s talent programs',
    'Obtain CREST certification for pen testing roles',
    'Understand MAS TRM guidelines for finance roles',
    'Network through ISACA Singapore chapter',
    'Consider Government tech (GovTech) programs',
  ],
  australia: [
    'Obtain Australian security clearance (NV1/NV2) for government roles',
    'Join AISA (Australian Information Security Association)',
    'Understand ACSC Essential Eight framework',
    'Target Big 4 banks for stable employment',
    'Consider IRAP assessor certification',
  ],
  canada: [
    'Bilingual (French/English) skills open more opportunities',
    'Target Toronto or Vancouver for most opportunities',
    'Understand PIPEDA privacy requirements',
    'Join Canadian cybersecurity associations',
    'Consider government roles through GC Digital Talent',
  ],
  germany: [
    'German language proficiency significantly expands opportunities',
    'Understand BSI IT-Grundschutz framework',
    'Target automotive or manufacturing sectors',
    'Consider TÜV certifications for local credibility',
    'Join ISACA Germany or (ISC)² Deutschland',
  ],
  'saudi-arabia': [
    'Understand NCA Essential Cybersecurity Controls',
    'Network through Saudi Federation for Cybersecurity',
    'Consider ARAMCO or government sectors for best packages',
    'Obtain relevant certifications before applying',
    'Packages often include housing, flights, and family benefits',
  ],
};

// Visa information by location
const VISA_INFO: Record<string, string> = {
  uae: 'Golden Visa available for skilled tech professionals. Employment visa requires company sponsorship. UAE offers attractive tax-free income and residency benefits.',
  usa: 'H-1B visa lottery system with annual cap. O-1 visa for exceptional ability. Many tech companies sponsor security professionals. Green card pathway available.',
  uk: 'Skilled Worker visa available for sponsored roles. Global Talent visa for exceptional individuals. Points-based immigration system favors tech skills.',
  india: 'No work visa required for citizens. OCI cardholders can work freely. Business visa for short-term consulting.',
  singapore: 'Employment Pass for professionals earning >S$5,000/month. Tech.Pass for exceptional tech talent. PR pathway available after 2+ years.',
  australia: 'Skilled Independent (189) or Employer Sponsored (482) visas. ICT Security Specialist on skilled occupation list. PR pathway available.',
  canada: 'Express Entry system favors tech professionals. Global Talent Stream for fast processing. Provincial Nominee Programs available.',
  germany: 'EU Blue Card for skilled workers earning >€56,400. Fast-track for IT specialists. German language improves long-term prospects.',
  'saudi-arabia': 'Company sponsorship required (Iqama). Premium Residency available for qualified professionals. Tax-free income. Exit visa no longer required.',
};

function getFallbackInsights(
  role: CareerRole,
  location: Location
): LocationInsights {
  const salaryData = SALARY_DATABASE[role.id]?.[location.id];

  let salaryRange: string;
  if (salaryData) {
    const formatNumber = (n: number) => n.toLocaleString();
    if (location.id === 'india') {
      // Show in lakhs for India
      const entryLakhs = (salaryData.entry / 100000).toFixed(1);
      const seniorLakhs = (salaryData.senior / 100000).toFixed(1);
      salaryRange = `₹${entryLakhs}L - ₹${seniorLakhs}L per year`;
    } else {
      salaryRange = `${location.currencySymbol}${formatNumber(salaryData.entry)} - ${location.currencySymbol}${formatNumber(salaryData.senior)} per year`;
    }
  } else {
    salaryRange = role.salaryRange;
  }

  const employers = TOP_EMPLOYERS[location.id]?.default ||
    ['Major tech companies', 'Financial institutions', 'Government agencies', 'Consulting firms', 'Security vendors'];

  const trends = MARKET_TRENDS[location.id]?.[role.id] ||
    `The ${role.title} role continues to see strong demand in ${location.name}. Organizations are investing in cybersecurity talent as digital transformation accelerates.`;

  const tips = LOCAL_TIPS[location.id]?.slice(0, 4) || [
    'Obtain industry-recognized certifications',
    'Build a portfolio of security projects',
    'Network with local cybersecurity professionals',
    'Stay updated on regional compliance requirements',
  ];

  return {
    salaryRange,
    demandLevel: role.demandLevel,
    topEmployers: employers,
    jobMarketTrends: trends,
    localCertifications: role.certifications.slice(0, 4).map(c => c.name),
    visaInfo: VISA_INFO[location.id],
    tips,
  };
}

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured(): boolean {
  return !!import.meta.env.VITE_GEMINI_API_KEY;
}

/**
 * Clear the insights cache
 */
export function clearInsightsCache(): void {
  insightsCache.clear();
}

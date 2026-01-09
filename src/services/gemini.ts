/**
 * Gemini AI Service
 *
 * Handles all interactions with Google's Gemini API.
 * Provides location-specific career insights and demand data.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Location, LocationInsights, CareerRole } from '../types';

// Initialize Gemini with API key from environment
const getGeminiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('Gemini API key not found. Using fallback data.');
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generate location-specific insights for a career role
 */
export async function getLocationInsights(
  role: CareerRole,
  location: Location
): Promise<LocationInsights | null> {
  const genAI = getGeminiClient();

  if (!genAI) {
    return getFallbackInsights(role, location);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a career advisor specializing in cybersecurity careers. Provide specific, accurate information about the "${role.title}" role in ${location.name}.

Return a JSON object with the following structure (no markdown, just pure JSON):
{
  "salaryRange": "salary range in ${location.currency} (e.g., '${location.currencySymbol}X - ${location.currencySymbol}Y per year')",
  "demandLevel": "one of: high, medium, low, growing",
  "topEmployers": ["list of 5 top companies hiring for this role in ${location.name}"],
  "jobMarketTrends": "2-3 sentences about current job market trends for this role in ${location.name}",
  "localCertifications": ["list of 3-4 certifications particularly valued in ${location.name}"],
  "visaInfo": "brief info about work visa/permit for tech workers if applicable, or null",
  "tips": ["3-4 specific tips for getting this job in ${location.name}"]
}

Be specific to ${location.name}'s market. Use realistic salary figures in ${location.currency}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON from response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as LocationInsights;
      return parsed;
    }

    return getFallbackInsights(role, location);
  } catch (error) {
    console.error('Error fetching Gemini insights:', error);
    return getFallbackInsights(role, location);
  }
}

/**
 * Get demand data for all roles in a specific location
 */
export async function getCountryDemandData(
  location: Location
): Promise<Record<string, { demand: string; trend: string }> | null> {
  const genAI = getGeminiClient();

  if (!genAI) {
    return null;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Provide current cybersecurity job market demand data for ${location.name}.

Return a JSON object with demand levels for these roles (no markdown, just pure JSON):
{
  "soc-analyst": { "demand": "high/medium/low", "trend": "growing/stable/declining" },
  "penetration-tester": { "demand": "high/medium/low", "trend": "growing/stable/declining" },
  "cloud-security-engineer": { "demand": "high/medium/low", "trend": "growing/stable/declining" },
  "security-engineer": { "demand": "high/medium/low", "trend": "growing/stable/declining" },
  "network-engineer": { "demand": "high/medium/low", "trend": "growing/stable/declining" },
  "devsecops-engineer": { "demand": "high/medium/low", "trend": "growing/stable/declining" }
}

Base this on actual job market conditions in ${location.name} as of 2024-2025.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return null;
  } catch (error) {
    console.error('Error fetching demand data:', error);
    return null;
  }
}

/**
 * Fallback data when Gemini API is unavailable
 */
function getFallbackInsights(
  role: CareerRole,
  location: Location
): LocationInsights {
  const salaryMultipliers: Record<string, number> = {
    uae: 1.1,
    usa: 1.0,
    uk: 0.85,
    india: 0.25,
    singapore: 1.05,
    australia: 0.95,
    canada: 0.9,
    germany: 0.88,
    'saudi-arabia': 1.05,
  };

  const baseSalaries: Record<string, [number, number]> = {
    'soc-analyst': [55000, 85000],
    'penetration-tester': [70000, 120000],
    'cloud-security-engineer': [90000, 150000],
    'security-engineer': [85000, 140000],
    'network-engineer': [70000, 110000],
    'devsecops-engineer': [95000, 160000],
  };

  const [baseLow, baseHigh] = baseSalaries[role.id] || [60000, 100000];
  const multiplier = salaryMultipliers[location.id] || 1.0;

  const formatSalary = (amount: number): string => {
    if (location.id === 'india') {
      return `${location.currencySymbol}${(amount * 83).toLocaleString()}`;
    }
    if (location.id === 'uae') {
      return `${location.currencySymbol}${(amount * 3.67).toLocaleString()}`;
    }
    if (location.id === 'saudi-arabia') {
      return `${location.currencySymbol}${(amount * 3.75).toLocaleString()}`;
    }
    if (location.id === 'uk') {
      return `${location.currencySymbol}${Math.round(amount * 0.79).toLocaleString()}`;
    }
    if (location.id === 'germany') {
      return `${location.currencySymbol}${Math.round(amount * 0.92).toLocaleString()}`;
    }
    if (location.id === 'singapore') {
      return `${location.currencySymbol}${Math.round(amount * 1.34).toLocaleString()}`;
    }
    if (location.id === 'australia') {
      return `${location.currencySymbol}${Math.round(amount * 1.53).toLocaleString()}`;
    }
    if (location.id === 'canada') {
      return `${location.currencySymbol}${Math.round(amount * 1.36).toLocaleString()}`;
    }
    return `${location.currencySymbol}${amount.toLocaleString()}`;
  };

  const lowSalary = Math.round(baseLow * multiplier);
  const highSalary = Math.round(baseHigh * multiplier);

  const topEmployersByLocation: Record<string, string[]> = {
    uae: ['Emirates NBD', 'Etisalat', 'du', 'ADNOC', 'Careem'],
    usa: ['Google', 'Microsoft', 'Amazon', 'CrowdStrike', 'Palo Alto Networks'],
    uk: ['GCHQ', 'Deloitte', 'BAE Systems', 'NCC Group', 'Darktrace'],
    india: ['TCS', 'Infosys', 'Wipro', 'HCLTech', 'Paytm'],
    singapore: ['DBS Bank', 'Grab', 'Shopee', 'GovTech', 'Singtel'],
    australia: ['Telstra', 'NAB', 'Commonwealth Bank', 'Atlassian', 'Canva'],
    canada: ['Shopify', 'RBC', 'TD Bank', 'BlackBerry', 'CGI'],
    germany: ['SAP', 'Siemens', 'Deutsche Telekom', 'Allianz', 'Bosch'],
    'saudi-arabia': ['Aramco', 'STC', 'SABIC', 'Mobily', 'Al Rajhi Bank'],
  };

  return {
    salaryRange: `${formatSalary(lowSalary)} - ${formatSalary(highSalary)} per year`,
    demandLevel: role.demandLevel,
    topEmployers: topEmployersByLocation[location.id] || ['Various tech companies'],
    jobMarketTrends: `The ${role.title} role is in ${role.demandLevel} demand in ${location.name}. Companies are actively seeking qualified professionals with relevant certifications and hands-on experience.`,
    localCertifications: role.certifications.slice(0, 4).map((c) => c.name),
    visaInfo: location.id !== 'usa' && location.id !== 'uk'
      ? `Work permits available for qualified tech professionals in ${location.name}.`
      : undefined,
    tips: [
      `Network with cybersecurity professionals in ${location.name}`,
      'Obtain internationally recognized certifications',
      `Research ${location.name}-specific compliance requirements`,
      'Build a portfolio with relevant projects',
    ],
  };
}

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured(): boolean {
  return !!import.meta.env.VITE_GEMINI_API_KEY;
}

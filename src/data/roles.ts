/**
 * Career Roles Data
 *
 * This file contains all career role definitions for PathForge.
 * Each role includes complete information for display and roadmap generation.
 *
 * To add a new role:
 * 1. Add the role ID to RoleId type in types/index.ts
 * 2. Create a new role object following the CareerRole interface
 * 3. Add the role to the CAREER_ROLES array
 * 4. Update question weights in questions.ts to include the new role
 */

import type { CareerRole } from '../types';

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'soc-analyst',
    title: 'SOC Analyst',
    shortDescription: 'Monitor and defend organizations against cyber threats in real-time',
    overview:
      'Security Operations Center (SOC) Analysts are the frontline defenders of an organization\'s digital assets. They monitor security alerts, investigate incidents, and respond to threats 24/7. This role is perfect for those who enjoy detective work and want to make an immediate impact in cybersecurity.',
    whyFits: [
      'You enjoy analyzing patterns and investigating anomalies',
      'You thrive in fast-paced environments with real-time challenges',
      'You want a clear entry point into cybersecurity with strong growth potential',
      'You\'re comfortable with shift work and high-pressure situations',
    ],
    skills: [
      'Log analysis and correlation',
      'Incident detection and response',
      'Malware analysis fundamentals',
      'Network traffic analysis',
      'Security tool administration',
      'Threat intelligence',
      'Documentation and reporting',
    ],
    tools: [
      'Splunk / QRadar / Sentinel',
      'Wireshark',
      'YARA',
      'VirusTotal',
      'TheHive',
      'Cortex XSOAR',
      'CrowdStrike / Carbon Black',
    ],
    certifications: [
      { name: 'CompTIA Security+', provider: 'CompTIA', level: 'beginner' },
      { name: 'CompTIA CySA+', provider: 'CompTIA', level: 'intermediate' },
      { name: 'Splunk Core Certified User', provider: 'Splunk', level: 'beginner' },
      { name: 'BTL1', provider: 'Security Blue Team', level: 'intermediate' },
    ],
    roadmap: {
      month1: {
        title: 'Security Fundamentals',
        focus: 'Build your foundation in networking and security concepts',
        tasks: [
          'Complete CompTIA Security+ study materials',
          'Set up a home lab with VirtualBox/VMware',
          'Learn Linux command line basics',
          'Understand the OSI model and TCP/IP',
          'Study common attack types and indicators',
        ],
        resources: [
          'Professor Messer Security+ Course (Free)',
          'TryHackMe - Pre Security Path',
          'Cybrary - SOC Analyst Path',
        ],
      },
      month2: {
        title: 'Hands-on Detection',
        focus: 'Practice with real security tools and scenarios',
        tasks: [
          'Set up ELK Stack or Splunk Free',
          'Practice log analysis with sample datasets',
          'Complete TryHackMe SOC Level 1 path',
          'Learn Wireshark for packet analysis',
          'Study MITRE ATT&CK framework',
        ],
        resources: [
          'Blue Team Labs Online',
          'CyberDefenders - Free Challenges',
          'Splunk Boss of the SOC datasets',
        ],
      },
      month3: {
        title: 'Projects & Certification',
        focus: 'Build portfolio projects and get certified',
        tasks: [
          'Take and pass CompTIA Security+ exam',
          'Build a detection lab and document it',
          'Create 2-3 incident investigation write-ups',
          'Contribute to open-source detection rules',
          'Apply to SOC Analyst positions',
        ],
        resources: [
          'LinkedIn Learning - Interview Prep',
          'GitHub - Awesome SOC resources',
          'Discord - InfoSec community servers',
        ],
      },
    },
    salaryRange: '$55,000 - $85,000',
    demandLevel: 'high',
  },

  {
    id: 'penetration-tester',
    title: 'Penetration Tester',
    shortDescription: 'Ethically hack systems to find vulnerabilities before attackers do',
    overview:
      'Penetration Testers (or Ethical Hackers) are hired to break into systems legally. They simulate real-world attacks to identify security weaknesses before malicious hackers can exploit them. This role combines creativity, technical depth, and problem-solving skills.',
    whyFits: [
      'You love solving puzzles and thinking like an attacker',
      'You enjoy hands-on technical challenges',
      'You want to continuously learn new exploitation techniques',
      'You\'re self-motivated and detail-oriented',
    ],
    skills: [
      'Web application security testing',
      'Network penetration testing',
      'Vulnerability assessment',
      'Exploit development basics',
      'Social engineering awareness',
      'Report writing',
      'Scripting (Python, Bash)',
    ],
    tools: [
      'Burp Suite',
      'Nmap',
      'Metasploit',
      'Kali Linux',
      'Gobuster / ffuf',
      'SQLMap',
      'Hashcat / John the Ripper',
    ],
    certifications: [
      { name: 'eJPT', provider: 'INE Security', level: 'beginner' },
      { name: 'PNPT', provider: 'TCM Security', level: 'intermediate' },
      { name: 'OSCP', provider: 'OffSec', level: 'advanced' },
      { name: 'CompTIA PenTest+', provider: 'CompTIA', level: 'intermediate' },
    ],
    roadmap: {
      month1: {
        title: 'Hacking Fundamentals',
        focus: 'Learn the basics of ethical hacking and set up your lab',
        tasks: [
          'Set up Kali Linux in a VM',
          'Learn Linux command line thoroughly',
          'Complete TryHackMe Complete Beginner path',
          'Study networking and common protocols',
          'Learn basic Python scripting',
        ],
        resources: [
          'TryHackMe - Complete Beginner Path',
          'Hack The Box Academy - Free Tier',
          'TCM Security - Practical Ethical Hacking',
        ],
      },
      month2: {
        title: 'Active Exploitation',
        focus: 'Practice attacking systems in controlled environments',
        tasks: [
          'Complete 20+ TryHackMe/HTB machines',
          'Master Burp Suite for web testing',
          'Learn Active Directory attack basics',
          'Practice privilege escalation techniques',
          'Document your methodology',
        ],
        resources: [
          'Hack The Box - Starting Point',
          'PortSwigger Web Security Academy',
          'IppSec YouTube walkthroughs',
        ],
      },
      month3: {
        title: 'Certification & Portfolio',
        focus: 'Get certified and build your professional presence',
        tasks: [
          'Prepare for and pass eJPT certification',
          'Complete 10+ CTF challenges',
          'Write detailed machine walkthroughs',
          'Build a pentesting portfolio on GitHub',
          'Network with the infosec community',
        ],
        resources: [
          'HackerOne - Bug Bounty Practice',
          'GitHub - Write-ups and tools',
          'Twitter/X - InfoSec community',
        ],
      },
    },
    salaryRange: '$70,000 - $120,000',
    demandLevel: 'high',
  },

  {
    id: 'cloud-security-engineer',
    title: 'Cloud Security Engineer',
    shortDescription: 'Secure cloud infrastructure and protect data in AWS, Azure, and GCP',
    overview:
      'Cloud Security Engineers design, implement, and maintain security controls for cloud environments. As organizations migrate to the cloud, these professionals ensure that infrastructure, applications, and data remain protected. This role combines cloud architecture knowledge with security expertise.',
    whyFits: [
      'You\'re interested in both cloud computing and security',
      'You enjoy building secure systems from the ground up',
      'You want to work with cutting-edge technology',
      'You\'re comfortable with automation and infrastructure as code',
    ],
    skills: [
      'Cloud platform expertise (AWS/Azure/GCP)',
      'Identity and Access Management (IAM)',
      'Security automation',
      'Container security (Docker, Kubernetes)',
      'Infrastructure as Code (Terraform)',
      'Compliance frameworks (SOC2, ISO 27001)',
      'Cloud networking and architecture',
    ],
    tools: [
      'AWS Security Hub / Azure Sentinel',
      'Terraform / CloudFormation',
      'Prowler / ScoutSuite',
      'Kubernetes',
      'Docker',
      'CloudTrail / Azure Monitor',
      'Vault by HashiCorp',
    ],
    certifications: [
      { name: 'AWS Cloud Practitioner', provider: 'AWS', level: 'beginner' },
      { name: 'AWS Security Specialty', provider: 'AWS', level: 'advanced' },
      { name: 'AZ-500', provider: 'Microsoft', level: 'intermediate' },
      { name: 'CCSK', provider: 'CSA', level: 'intermediate' },
    ],
    roadmap: {
      month1: {
        title: 'Cloud Foundations',
        focus: 'Build foundational knowledge in cloud computing',
        tasks: [
          'Complete AWS Cloud Practitioner training',
          'Set up AWS Free Tier account',
          'Learn core services (EC2, S3, IAM, VPC)',
          'Study shared responsibility model',
          'Complete basic Terraform tutorials',
        ],
        resources: [
          'AWS Skill Builder (Free)',
          'A Cloud Guru - Cloud Fundamentals',
          'Terraform tutorials by HashiCorp',
        ],
      },
      month2: {
        title: 'Cloud Security Practices',
        focus: 'Apply security principles to cloud environments',
        tasks: [
          'Study AWS Well-Architected Security Pillar',
          'Practice IAM policy writing',
          'Deploy secure VPC architectures',
          'Learn container security basics',
          'Set up CloudTrail and monitoring',
        ],
        resources: [
          'AWS Security Documentation',
          'CloudSecDocs.com',
          'Kubernetes Security Guide',
        ],
      },
      month3: {
        title: 'Advanced Projects & Certification',
        focus: 'Build portfolio projects and achieve certification',
        tasks: [
          'Pass AWS Cloud Practitioner exam',
          'Build a secure 3-tier architecture project',
          'Create security automation scripts',
          'Document cloud security assessments',
          'Begin AWS Security Specialty prep',
        ],
        resources: [
          'AWS Workshops (Free)',
          'GitHub - Cloud Security Projects',
          'LinkedIn Cloud Security groups',
        ],
      },
    },
    salaryRange: '$90,000 - $150,000',
    demandLevel: 'high',
  },

  {
    id: 'security-engineer',
    title: 'Security Engineer',
    shortDescription: 'Design and implement security solutions to protect organizations',
    overview:
      'Security Engineers build and maintain an organization\'s security infrastructure. They implement security tools, automate security processes, and ensure systems are hardened against attacks. This role is ideal for those who enjoy building things and want to work closely with both development and operations teams.',
    whyFits: [
      'You enjoy building and automating systems',
      'You want to work across multiple technology domains',
      'You like solving complex technical problems',
      'You\'re comfortable with coding and scripting',
    ],
    skills: [
      'Security architecture design',
      'Python/Go programming',
      'Vulnerability management',
      'SIEM implementation',
      'Security tool integration',
      'Firewall and network security',
      'DevSecOps practices',
    ],
    tools: [
      'Python / Go',
      'Ansible / Chef / Puppet',
      'Nessus / Qualys',
      'Snort / Suricata',
      'pfSense / Palo Alto',
      'Git / CI/CD tools',
      'ELK Stack',
    ],
    certifications: [
      { name: 'CompTIA Security+', provider: 'CompTIA', level: 'beginner' },
      { name: 'GSEC', provider: 'GIAC', level: 'intermediate' },
      { name: 'CISSP', provider: 'ISC2', level: 'advanced' },
      { name: 'CEH', provider: 'EC-Council', level: 'intermediate' },
    ],
    roadmap: {
      month1: {
        title: 'Security Fundamentals',
        focus: 'Build a strong foundation in security concepts and coding',
        tasks: [
          'Learn Python for security automation',
          'Study Security+ exam objectives',
          'Set up a comprehensive home lab',
          'Learn Linux system administration',
          'Understand network security fundamentals',
        ],
        resources: [
          'Automate the Boring Stuff with Python',
          'TryHackMe - Security Engineer Path',
          'Linux Academy / A Cloud Guru',
        ],
      },
      month2: {
        title: 'Security Implementation',
        focus: 'Practice implementing security tools and controls',
        tasks: [
          'Deploy and configure a SIEM',
          'Build vulnerability scanning automation',
          'Implement firewall rules and policies',
          'Create security monitoring dashboards',
          'Practice incident response procedures',
        ],
        resources: [
          'Elastic SIEM tutorials',
          'SANS Reading Room papers',
          'Security Onion documentation',
        ],
      },
      month3: {
        title: 'Projects & Career Prep',
        focus: 'Complete certification and build portfolio',
        tasks: [
          'Pass CompTIA Security+ exam',
          'Build 3 security automation projects',
          'Create a security engineering portfolio',
          'Contribute to open-source security tools',
          'Network and apply for positions',
        ],
        resources: [
          'GitHub - Security Tools repos',
          'InfoSec community Discord servers',
          'LinkedIn Security Engineering groups',
        ],
      },
    },
    salaryRange: '$85,000 - $140,000',
    demandLevel: 'high',
  },

  {
    id: 'network-engineer',
    title: 'Network Security Engineer',
    shortDescription: 'Protect network infrastructure and ensure secure communications',
    overview:
      'Network Security Engineers focus on securing an organization\'s network infrastructure. They design secure network architectures, configure firewalls and VPNs, and monitor network traffic for threats. This role is perfect for those who love networking and want to specialize in security.',
    whyFits: [
      'You\'re fascinated by how networks work',
      'You enjoy hands-on hardware and infrastructure work',
      'You want to specialize in network security',
      'You\'re analytical and detail-oriented',
    ],
    skills: [
      'Network architecture and design',
      'Firewall configuration and management',
      'VPN and encryption technologies',
      'Network monitoring and analysis',
      'Routing and switching security',
      'Wireless security',
      'Network segmentation',
    ],
    tools: [
      'Cisco / Juniper / Palo Alto firewalls',
      'Wireshark',
      'Zeek (formerly Bro)',
      'Nmap',
      'pfSense / OPNsense',
      'Cisco Packet Tracer / GNS3',
      'NetFlow analyzers',
    ],
    certifications: [
      { name: 'CompTIA Network+', provider: 'CompTIA', level: 'beginner' },
      { name: 'CompTIA Security+', provider: 'CompTIA', level: 'beginner' },
      { name: 'CCNA', provider: 'Cisco', level: 'intermediate' },
      { name: 'CCNP Security', provider: 'Cisco', level: 'advanced' },
    ],
    roadmap: {
      month1: {
        title: 'Networking Fundamentals',
        focus: 'Master networking concepts and protocols',
        tasks: [
          'Study CompTIA Network+ materials',
          'Set up GNS3 or Packet Tracer lab',
          'Practice subnetting and IP addressing',
          'Learn routing protocols (OSPF, BGP basics)',
          'Understand switching and VLANs',
        ],
        resources: [
          'Professor Messer Network+ Course',
          'Cisco Networking Academy (Free)',
          'Practical Networking YouTube channel',
        ],
      },
      month2: {
        title: 'Network Security Implementation',
        focus: 'Apply security to network infrastructure',
        tasks: [
          'Configure firewalls in your lab',
          'Set up VPN connections',
          'Practice network traffic analysis',
          'Implement network segmentation',
          'Learn IDS/IPS configuration',
        ],
        resources: [
          'pfSense documentation',
          'Palo Alto free training',
          'TryHackMe - Network Security module',
        ],
      },
      month3: {
        title: 'Certification & Specialization',
        focus: 'Achieve certification and build expertise',
        tasks: [
          'Pass CompTIA Network+ or Security+',
          'Begin CCNA preparation',
          'Build a network security home lab project',
          'Document your lab configurations',
          'Apply to network security roles',
        ],
        resources: [
          'Boson practice exams',
          'Reddit r/networking community',
          'Network Security Discord servers',
        ],
      },
    },
    salaryRange: '$70,000 - $110,000',
    demandLevel: 'high',
  },

  {
    id: 'devsecops-engineer',
    title: 'DevSecOps Engineer',
    shortDescription: 'Integrate security into software development and deployment pipelines',
    overview:
      'DevSecOps Engineers embed security practices into the software development lifecycle. They automate security testing, build secure CI/CD pipelines, and ensure code is secure from development through production. This role bridges the gap between development, security, and operations teams.',
    whyFits: [
      'You enjoy coding and automation',
      'You want to work at the intersection of development and security',
      'You like fast-paced, agile environments',
      'You\'re interested in modern software development practices',
    ],
    skills: [
      'CI/CD pipeline development',
      'Container security (Docker, Kubernetes)',
      'Infrastructure as Code',
      'Security scanning automation (SAST, DAST)',
      'Python / Go / Bash scripting',
      'Git and version control',
      'Secrets management',
    ],
    tools: [
      'Jenkins / GitLab CI / GitHub Actions',
      'Docker / Kubernetes',
      'Terraform / Ansible',
      'SonarQube / Snyk / Trivy',
      'Vault by HashiCorp',
      'OWASP ZAP',
      'Git',
    ],
    certifications: [
      { name: 'AWS Cloud Practitioner', provider: 'AWS', level: 'beginner' },
      { name: 'CKA', provider: 'CNCF', level: 'intermediate' },
      { name: 'AWS DevOps Professional', provider: 'AWS', level: 'advanced' },
      { name: 'GIAC GCSA', provider: 'GIAC', level: 'intermediate' },
    ],
    roadmap: {
      month1: {
        title: 'DevOps Fundamentals',
        focus: 'Build core DevOps skills and understanding',
        tasks: [
          'Learn Git and version control',
          'Set up Docker and practice containerization',
          'Build basic CI/CD pipelines',
          'Learn Linux system administration',
          'Study cloud basics (AWS/Azure)',
        ],
        resources: [
          'Docker official tutorials',
          'GitHub Actions documentation',
          'TechWorld with Nana YouTube',
        ],
      },
      month2: {
        title: 'Security Integration',
        focus: 'Add security to your DevOps workflows',
        tasks: [
          'Implement SAST tools in pipelines',
          'Add container scanning (Trivy)',
          'Set up secrets management with Vault',
          'Learn Kubernetes security basics',
          'Practice dependency scanning',
        ],
        resources: [
          'OWASP DevSecOps Guideline',
          'Snyk Learn (Free)',
          'Kubernetes Security documentation',
        ],
      },
      month3: {
        title: 'Advanced Projects & Career',
        focus: 'Build portfolio and prepare for roles',
        tasks: [
          'Build a complete secure CI/CD project',
          'Implement GitOps workflow',
          'Create infrastructure as code with Terraform',
          'Document your DevSecOps pipeline',
          'Apply to DevSecOps positions',
        ],
        resources: [
          'GitHub - DevSecOps resources',
          'DevSecOps community forums',
          'LinkedIn DevSecOps groups',
        ],
      },
    },
    salaryRange: '$95,000 - $160,000',
    demandLevel: 'growing',
  },
];

/**
 * Helper function to get a role by its ID
 */
export function getRoleById(roleId: string): CareerRole | undefined {
  return CAREER_ROLES.find((role) => role.id === roleId);
}

/**
 * Get all available roles
 */
export function getAllRoles(): CareerRole[] {
  return CAREER_ROLES;
}

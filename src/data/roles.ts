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

  {
    id: 'malware-analyst',
    title: 'Malware Analyst',
    shortDescription: 'Reverse engineer malicious software to understand and defend against threats',
    overview:
      'Malware Analysts dissect malicious software to understand how it works, what it does, and how to defend against it. They use reverse engineering techniques to analyze viruses, trojans, ransomware, and other threats. This role is ideal for those who love puzzles and want to understand attackers at a deep technical level.',
    whyFits: [
      'You enjoy solving complex puzzles and reverse engineering',
      'You\'re fascinated by how software works at a low level',
      'You want to understand attackers\' tools and techniques',
      'You\'re patient and detail-oriented in analysis work',
    ],
    skills: [
      'Static and dynamic malware analysis',
      'Assembly language and disassembly',
      'Reverse engineering techniques',
      'Sandbox analysis',
      'Behavioral analysis',
      'Programming (Python, C/C++)',
      'Operating system internals',
    ],
    tools: [
      'IDA Pro / Ghidra',
      'x64dbg / OllyDbg',
      'PE Studio / PEiD',
      'Cuckoo Sandbox',
      'Process Monitor / Process Hacker',
      'Wireshark',
      'YARA',
    ],
    certifications: [
      { name: 'GREM', provider: 'GIAC', level: 'advanced' },
      { name: 'eCMAP', provider: 'INE Security', level: 'intermediate' },
      { name: 'CompTIA CySA+', provider: 'CompTIA', level: 'intermediate' },
      { name: 'GCTI', provider: 'GIAC', level: 'intermediate' },
    ],
    roadmap: {
      month1: {
        title: 'Reverse Engineering Fundamentals',
        focus: 'Build foundation in assembly and RE basics',
        tasks: [
          'Learn x86/x64 assembly language basics',
          'Set up a malware analysis lab (isolated VM)',
          'Study Windows internals and PE file format',
          'Practice with Ghidra on benign executables',
          'Learn basic Python for automation',
        ],
        resources: [
          'Practical Malware Analysis book',
          'OpenSecurityTraining2 - Architecture',
          'Malware Unicorn RE101',
        ],
      },
      month2: {
        title: 'Hands-on Analysis',
        focus: 'Practice analyzing real malware samples',
        tasks: [
          'Analyze 10+ malware samples from MalwareBazaar',
          'Practice dynamic analysis in sandbox',
          'Learn to write YARA rules',
          'Study common malware families',
          'Document analysis methodology',
        ],
        resources: [
          'ANY.RUN - Interactive sandbox',
          'MalwareBazaar samples',
          'Malware Traffic Analysis exercises',
        ],
      },
      month3: {
        title: 'Advanced Techniques & Portfolio',
        focus: 'Build expertise and professional presence',
        tasks: [
          'Complete advanced RE challenges',
          'Write detailed malware analysis reports',
          'Contribute YARA rules to community',
          'Build a malware analysis blog/portfolio',
          'Apply to malware analyst positions',
        ],
        resources: [
          'Flare-On Challenge archives',
          'VX-Underground samples',
          'SANS DFIR Reading Room',
        ],
      },
    },
    salaryRange: '$80,000 - $140,000',
    demandLevel: 'high',
  },

  {
    id: 'threat-intel-analyst',
    title: 'Threat Intelligence Analyst',
    shortDescription: 'Research and analyze cyber threats to help organizations stay ahead of attackers',
    overview:
      'Threat Intelligence Analysts gather, analyze, and disseminate information about current and emerging cyber threats. They track threat actors, understand their tactics, and provide actionable intelligence to help organizations defend themselves. This role combines research skills with technical security knowledge.',
    whyFits: [
      'You enjoy research and connecting the dots',
      'You\'re curious about geopolitics and threat actors',
      'You like writing reports and communicating findings',
      'You want to understand the "why" behind attacks',
    ],
    skills: [
      'Threat research and analysis',
      'OSINT (Open Source Intelligence)',
      'MITRE ATT&CK framework',
      'Threat actor tracking',
      'Report writing and communication',
      'Indicator of Compromise (IOC) analysis',
      'Dark web monitoring',
    ],
    tools: [
      'MISP (Threat Intel Platform)',
      'Maltego',
      'Shodan / Censys',
      'VirusTotal',
      'ThreatConnect / Anomali',
      'Recorded Future',
      'SpiderFoot',
    ],
    certifications: [
      { name: 'GCTI', provider: 'GIAC', level: 'intermediate' },
      { name: 'CTIA', provider: 'EC-Council', level: 'intermediate' },
      { name: 'CompTIA CySA+', provider: 'CompTIA', level: 'intermediate' },
      { name: 'FOR578', provider: 'SANS', level: 'advanced' },
    ],
    roadmap: {
      month1: {
        title: 'Intelligence Fundamentals',
        focus: 'Learn threat intelligence concepts and frameworks',
        tasks: [
          'Study the Intelligence Cycle',
          'Master MITRE ATT&CK framework',
          'Learn OSINT techniques and tools',
          'Practice with Maltego and Shodan',
          'Study major threat actor groups',
        ],
        resources: [
          'MITRE ATT&CK Training',
          'SANS Cyber Threat Intelligence Summit talks',
          'Recorded Future University',
        ],
      },
      month2: {
        title: 'Practical Analysis',
        focus: 'Apply intelligence skills to real scenarios',
        tasks: [
          'Track a threat campaign end-to-end',
          'Write intelligence reports',
          'Set up threat intel feeds',
          'Practice IOC analysis and enrichment',
          'Build threat actor profiles',
        ],
        resources: [
          'APT Reports (Mandiant, CrowdStrike)',
          'OpenCTI platform',
          'MISP Project tutorials',
        ],
      },
      month3: {
        title: 'Specialization & Career',
        focus: 'Develop expertise and build portfolio',
        tasks: [
          'Publish threat intelligence blog posts',
          'Contribute to threat intel communities',
          'Build a portfolio of analysis reports',
          'Network with CTI professionals',
          'Apply to threat intelligence roles',
        ],
        resources: [
          'CTI League community',
          'Twitter/X - Threat Intel community',
          'LinkedIn Threat Intelligence groups',
        ],
      },
    },
    salaryRange: '$75,000 - $130,000',
    demandLevel: 'growing',
  },

  {
    id: 'forensics-analyst',
    title: 'Digital Forensics Analyst',
    shortDescription: 'Investigate cyber incidents and collect digital evidence for legal proceedings',
    overview:
      'Digital Forensics Analysts investigate security incidents, data breaches, and cybercrimes. They collect, preserve, and analyze digital evidence from computers, mobile devices, and networks. This role is perfect for those who enjoy investigation work and want to help bring cybercriminals to justice.',
    whyFits: [
      'You enjoy detective work and investigation',
      'You\'re meticulous and detail-oriented',
      'You want to help solve cybercrimes',
      'You\'re interested in legal and compliance aspects',
    ],
    skills: [
      'Evidence acquisition and preservation',
      'Disk and memory forensics',
      'File system analysis',
      'Timeline analysis',
      'Chain of custody procedures',
      'Mobile device forensics',
      'Report writing for legal proceedings',
    ],
    tools: [
      'EnCase / FTK',
      'Autopsy / Sleuth Kit',
      'Volatility (Memory forensics)',
      'KAPE',
      'Cellebrite (Mobile)',
      'X-Ways Forensics',
      'Eric Zimmerman\'s Tools',
    ],
    certifications: [
      { name: 'GCFE', provider: 'GIAC', level: 'intermediate' },
      { name: 'EnCE', provider: 'OpenText', level: 'intermediate' },
      { name: 'CHFI', provider: 'EC-Council', level: 'intermediate' },
      { name: 'GCFA', provider: 'GIAC', level: 'advanced' },
    ],
    roadmap: {
      month1: {
        title: 'Forensics Fundamentals',
        focus: 'Learn digital forensics principles and tools',
        tasks: [
          'Study digital forensics methodology',
          'Learn file systems (NTFS, ext4, APFS)',
          'Set up a forensics workstation',
          'Practice with Autopsy on sample images',
          'Understand chain of custody requirements',
        ],
        resources: [
          'SANS DFIR Poster',
          '13Cubed YouTube channel',
          'Digital Forensics with Kali Linux book',
        ],
      },
      month2: {
        title: 'Hands-on Investigation',
        focus: 'Practice forensic investigations',
        tasks: [
          'Complete forensic CTF challenges',
          'Practice memory forensics with Volatility',
          'Learn Windows artifact analysis',
          'Study timeline analysis techniques',
          'Write forensic investigation reports',
        ],
        resources: [
          'CyberDefenders DFIR challenges',
          'DFIR.Training resources',
          'AboutDFIR community',
        ],
      },
      month3: {
        title: 'Certification & Specialization',
        focus: 'Get certified and build expertise',
        tasks: [
          'Prepare for GCFE or CHFI certification',
          'Build a forensics portfolio',
          'Practice with real-world case studies',
          'Learn incident response integration',
          'Apply to forensics analyst positions',
        ],
        resources: [
          'SANS DFIR NetWars',
          'Magnet Virtual Summit',
          'DFIR Discord community',
        ],
      },
    },
    salaryRange: '$70,000 - $120,000',
    demandLevel: 'high',
  },

  {
    id: 'grc-analyst',
    title: 'GRC Analyst',
    shortDescription: 'Ensure organizations meet security compliance requirements and manage risk',
    overview:
      'GRC (Governance, Risk, and Compliance) Analysts help organizations meet regulatory requirements and manage security risks. They conduct audits, develop policies, and ensure compliance with frameworks like SOC2, ISO 27001, and GDPR. This role is great for those who enjoy policy work and want a less technical entry into cybersecurity.',
    whyFits: [
      'You prefer policy and process over deep technical work',
      'You enjoy documentation and organization',
      'You\'re interested in business and legal aspects of security',
      'You have strong communication and writing skills',
    ],
    skills: [
      'Risk assessment and management',
      'Compliance frameworks (SOC2, ISO 27001, GDPR)',
      'Policy and procedure development',
      'Audit preparation and support',
      'Security awareness training',
      'Vendor risk management',
      'Business communication',
    ],
    tools: [
      'GRC platforms (ServiceNow, Archer)',
      'Risk management tools',
      'Policy management systems',
      'Audit management software',
      'Microsoft Office / Google Workspace',
      'Compliance tracking tools',
      'Project management tools',
    ],
    certifications: [
      { name: 'CompTIA Security+', provider: 'CompTIA', level: 'beginner' },
      { name: 'CISA', provider: 'ISACA', level: 'intermediate' },
      { name: 'CRISC', provider: 'ISACA', level: 'intermediate' },
      { name: 'CGRC', provider: 'ISC2', level: 'intermediate' },
    ],
    roadmap: {
      month1: {
        title: 'GRC Fundamentals',
        focus: 'Learn governance, risk, and compliance basics',
        tasks: [
          'Study major compliance frameworks (SOC2, ISO 27001)',
          'Learn risk assessment methodologies',
          'Understand regulatory requirements (GDPR, HIPAA)',
          'Study security policy development',
          'Complete Security+ materials',
        ],
        resources: [
          'NIST Cybersecurity Framework',
          'ISO 27001 overview courses',
          'ISACA resources and webinars',
        ],
      },
      month2: {
        title: 'Practical Application',
        focus: 'Apply GRC concepts to real scenarios',
        tasks: [
          'Conduct practice risk assessments',
          'Write sample security policies',
          'Create compliance checklists',
          'Practice audit documentation',
          'Study vendor risk management',
        ],
        resources: [
          'SANS Security Policy Project',
          'CIS Controls documentation',
          'GRC community forums',
        ],
      },
      month3: {
        title: 'Certification & Career',
        focus: 'Get certified and enter the field',
        tasks: [
          'Pass CompTIA Security+ exam',
          'Begin CISA or CRISC preparation',
          'Build a portfolio of policy templates',
          'Network with GRC professionals',
          'Apply to GRC analyst positions',
        ],
        resources: [
          'ISACA certification prep',
          'LinkedIn GRC groups',
          'Local ISACA chapter events',
        ],
      },
    },
    salaryRange: '$65,000 - $110,000',
    demandLevel: 'high',
  },

  {
    id: 'appsec-engineer',
    title: 'Application Security Engineer',
    shortDescription: 'Secure software applications throughout the development lifecycle',
    overview:
      'Application Security Engineers ensure that software applications are designed and built securely. They perform code reviews, security testing, and work with developers to fix vulnerabilities. This role is ideal for those with a development background who want to specialize in security.',
    whyFits: [
      'You have programming experience and enjoy coding',
      'You want to combine development and security skills',
      'You enjoy finding and fixing bugs in code',
      'You like working closely with development teams',
    ],
    skills: [
      'Secure coding practices',
      'Code review and SAST',
      'Web application security (OWASP Top 10)',
      'API security testing',
      'Threat modeling',
      'Programming (Python, Java, JavaScript)',
      'CI/CD security integration',
    ],
    tools: [
      'Burp Suite',
      'SonarQube / Checkmarx',
      'OWASP ZAP',
      'Snyk / Dependabot',
      'Semgrep',
      'Git / GitHub',
      'IDE security plugins',
    ],
    certifications: [
      { name: 'GWEB', provider: 'GIAC', level: 'intermediate' },
      { name: 'CSSLP', provider: 'ISC2', level: 'advanced' },
      { name: 'CASE', provider: 'EC-Council', level: 'intermediate' },
      { name: 'OSWE', provider: 'OffSec', level: 'advanced' },
    ],
    roadmap: {
      month1: {
        title: 'AppSec Fundamentals',
        focus: 'Learn application security basics',
        tasks: [
          'Master OWASP Top 10 vulnerabilities',
          'Complete PortSwigger Web Security Academy',
          'Learn secure coding principles',
          'Set up vulnerable apps (DVWA, Juice Shop)',
          'Study threat modeling basics',
        ],
        resources: [
          'PortSwigger Web Security Academy',
          'OWASP Cheat Sheet Series',
          'Secure Code Warrior',
        ],
      },
      month2: {
        title: 'Security Testing',
        focus: 'Practice finding vulnerabilities',
        tasks: [
          'Master Burp Suite for web testing',
          'Learn SAST and DAST tools',
          'Practice code review techniques',
          'Study API security testing',
          'Complete bug bounty challenges',
        ],
        resources: [
          'PentesterLab',
          'HackTheBox Web challenges',
          'OWASP Testing Guide',
        ],
      },
      month3: {
        title: 'Advanced Skills & Career',
        focus: 'Build expertise and portfolio',
        tasks: [
          'Contribute to bug bounty programs',
          'Build secure coding examples',
          'Create AppSec automation scripts',
          'Document security findings professionally',
          'Apply to AppSec positions',
        ],
        resources: [
          'HackerOne / Bugcrowd',
          'OWASP local chapter meetings',
          'AppSec community conferences',
        ],
      },
    },
    salaryRange: '$90,000 - $160,000',
    demandLevel: 'high',
  },

  {
    id: 'incident-responder',
    title: 'Incident Response Analyst',
    shortDescription: 'Respond to and contain security incidents when breaches occur',
    overview:
      'Incident Response Analysts are the first responders when security incidents occur. They investigate breaches, contain threats, and help organizations recover from attacks. This role combines technical skills with the ability to stay calm under pressure and make quick decisions.',
    whyFits: [
      'You thrive in high-pressure, fast-paced situations',
      'You enjoy problem-solving under time constraints',
      'You want to be on the front lines of cyber defense',
      'You\'re a good communicator who can explain technical issues',
    ],
    skills: [
      'Incident handling and triage',
      'Log analysis and correlation',
      'Memory and disk forensics',
      'Malware analysis basics',
      'Network traffic analysis',
      'Documentation and reporting',
      'Crisis communication',
    ],
    tools: [
      'SIEM platforms (Splunk, Sentinel)',
      'EDR tools (CrowdStrike, Carbon Black)',
      'Volatility / Velociraptor',
      'Wireshark',
      'TheHive / Cortex',
      'KAPE / Eric Zimmerman tools',
      'Ticketing systems',
    ],
    certifications: [
      { name: 'GCIH', provider: 'GIAC', level: 'intermediate' },
      { name: 'ECIH', provider: 'EC-Council', level: 'intermediate' },
      { name: 'CompTIA CySA+', provider: 'CompTIA', level: 'intermediate' },
      { name: 'GCFA', provider: 'GIAC', level: 'advanced' },
    ],
    roadmap: {
      month1: {
        title: 'IR Fundamentals',
        focus: 'Learn incident response process and basics',
        tasks: [
          'Study NIST Incident Response lifecycle',
          'Learn log analysis techniques',
          'Practice with SIEM platforms',
          'Study common attack patterns',
          'Understand containment strategies',
        ],
        resources: [
          'NIST SP 800-61 IR Guide',
          'TryHackMe - SOC Level 1',
          'Blue Team Labs Online',
        ],
      },
      month2: {
        title: 'Hands-on Response',
        focus: 'Practice incident handling scenarios',
        tasks: [
          'Complete IR simulation exercises',
          'Practice triage and prioritization',
          'Learn EDR investigation techniques',
          'Study memory forensics basics',
          'Write incident reports',
        ],
        resources: [
          'CyberDefenders IR challenges',
          'LetsDefend - SOC Analyst Path',
          'SANS IR case studies',
        ],
      },
      month3: {
        title: 'Certification & Expertise',
        focus: 'Get certified and build expertise',
        tasks: [
          'Prepare for GCIH or CySA+ certification',
          'Practice with realistic IR scenarios',
          'Build incident response runbooks',
          'Participate in IR competitions',
          'Apply to IR analyst positions',
        ],
        resources: [
          'SANS NetWars',
          'IR Discord communities',
          'DFIR Report case studies',
        ],
      },
    },
    salaryRange: '$75,000 - $130,000',
    demandLevel: 'high',
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

/**
 * Roadmap Component
 *
 * Displays the 90-day learning roadmap for a career role.
 * Organized into 3 months with tasks and resources for each.
 * Features:
 * - Interactive checkboxes with localStorage persistence
 * - Clickable resource links
 * - Progress tracking
 */

import { useState, useEffect, useCallback } from 'react';
import type { CareerRole, RoadmapMonth } from '../types';
import styles from './Roadmap.module.css';

// Resource URL mapping for clickable links
const RESOURCE_URLS: Record<string, string> = {
  // Learning Platforms - TryHackMe
  'TryHackMe': 'https://tryhackme.com',
  'TryHackMe - Complete Beginner Path': 'https://tryhackme.com/path/outline/beginner',
  'TryHackMe - Pre Security Path': 'https://tryhackme.com/path/outline/presecurity',
  'TryHackMe - SOC Level 1': 'https://tryhackme.com/path/outline/soclevel1',
  'TryHackMe - Offensive Pentesting': 'https://tryhackme.com/path/outline/pentesting',
  'TryHackMe - Jr Penetration Tester': 'https://tryhackme.com/path/outline/jrpenetrationtester',
  'TryHackMe - Network Security module': 'https://tryhackme.com/module/network-security',
  'TryHackMe - Security Engineer Path': 'https://tryhackme.com/path/outline/security-engineer-training',

  // Learning Platforms - Hack The Box
  'Hack The Box': 'https://hackthebox.com',
  'Hack The Box Academy': 'https://academy.hackthebox.com',
  'Hack The Box Academy - Free Tier': 'https://academy.hackthebox.com',
  'Hack The Box - Starting Point': 'https://app.hackthebox.com/starting-point',

  // Learning Platforms - Other
  'Blue Team Labs Online': 'https://blueteamlabs.online',
  'CyberDefenders': 'https://cyberdefenders.org',
  'CyberDefenders - Free Challenges': 'https://cyberdefenders.org/blueteam-ctf-challenges/',
  'PortSwigger Web Security Academy': 'https://portswigger.net/web-security',
  'LetsDefend': 'https://letsdefend.io',
  'LetsDefend - SOC Analyst Path': 'https://letsdefend.io/training/soc-analyst-learning-path',
  'PentesterLab': 'https://pentesterlab.com',
  'Cybrary - SOC Analyst Path': 'https://www.cybrary.it/career-path/soc-analyst',
  'HackerOne - Bug Bounty Practice': 'https://www.hackerone.com/hackers',

  // Courses & Training
  'TCM Security': 'https://tcm-sec.com',
  'TCM Security - Practical Ethical Hacking': 'https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course',
  'Coursera - Google Cybersecurity Certificate': 'https://www.coursera.org/professional-certificates/google-cybersecurity',
  'LinkedIn Learning': 'https://www.linkedin.com/learning',
  'LinkedIn Learning - Interview Prep': 'https://www.linkedin.com/learning/topics/interview-preparation',
  'Udemy - Network Security': 'https://www.udemy.com/courses/search/?q=network+security',
  'Professor Messer - Security+': 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/',
  'Professor Messer Security+ Course (Free)': 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/',
  'Professor Messer Network+ Course': 'https://www.professormesser.com/network-plus/n10-008/n10-008-video/n10-008-training-course/',
  'A Cloud Guru - Cloud Fundamentals': 'https://www.pluralsight.com/cloud-guru',
  'Linux Academy / A Cloud Guru': 'https://www.pluralsight.com/cloud-guru',
  'Boson practice exams': 'https://www.boson.com',
  'Automate the Boring Stuff with Python': 'https://automatetheboringstuff.com',

  // Cloud & DevSecOps - AWS
  'AWS Free Tier': 'https://aws.amazon.com/free',
  'AWS Skill Builder': 'https://explore.skillbuilder.aws',
  'AWS Skill Builder (Free)': 'https://explore.skillbuilder.aws',
  'AWS Security Specialty Learning Path': 'https://explore.skillbuilder.aws/learn/public/learning_plan/view/91/security-learning-plan',
  'AWS Workshops (Free)': 'https://workshops.aws',
  'AWS Security Documentation': 'https://docs.aws.amazon.com/security/',

  // Cloud & DevSecOps - Azure
  'Azure Learn': 'https://learn.microsoft.com/en-us/training/azure/',
  'Azure Security Path': 'https://learn.microsoft.com/en-us/training/paths/secure-your-cloud-data/',

  // Cloud & DevSecOps - GCP
  'GCP Security': 'https://cloud.google.com/security',
  'GCP Skills Boost': 'https://www.cloudskillsboost.google',

  // DevSecOps & Kubernetes
  'KodeKloud - DevOps Learning Path': 'https://kodekloud.com/learning-path-devops/',
  'Kubernetes Security': 'https://kubernetes.io/docs/concepts/security/',
  'Kubernetes Security Guide': 'https://kubernetes.io/docs/concepts/security/',
  'Kubernetes Security documentation': 'https://kubernetes.io/docs/concepts/security/',
  'Docker official tutorials': 'https://docs.docker.com/get-started/',
  'Terraform tutorials by HashiCorp': 'https://developer.hashicorp.com/terraform/tutorials',
  'GitHub Actions documentation': 'https://docs.github.com/en/actions',
  'OWASP': 'https://owasp.org',
  'OWASP Top 10': 'https://owasp.org/www-project-top-ten/',
  'OWASP DevSecOps Guideline': 'https://owasp.org/www-project-devsecops-guideline/',
  'Snyk Learn': 'https://learn.snyk.io',
  'Snyk Learn (Free)': 'https://learn.snyk.io',
  'CloudSecDocs.com': 'https://cloudsecdocs.com',

  // YouTube Channels
  'IppSec YouTube walkthroughs': 'https://www.youtube.com/c/ippsec',
  'John Hammond YouTube': 'https://www.youtube.com/c/JohnHammond010',
  'NetworkChuck': 'https://www.youtube.com/c/NetworkChuck',
  'David Bombal': 'https://www.youtube.com/c/DavidBombal',
  'Practical Networking YouTube channel': 'https://www.youtube.com/c/PracticalNetworking',
  'TechWorld with Nana YouTube': 'https://www.youtube.com/c/TechWorldwithNana',

  // Tools & Practice
  'Splunk Boss of the SOC datasets': 'https://github.com/splunk/botsv1',
  'Splunk Fundamentals': 'https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html',
  'Security Onion documentation': 'https://docs.securityonion.net',
  'Elastic SIEM tutorials': 'https://www.elastic.co/security',
  'VulnHub': 'https://www.vulnhub.com',
  'DVWA': 'https://github.com/digininja/DVWA',
  'Damn Vulnerable Web Application': 'https://github.com/digininja/DVWA',
  'SANS Cyber Ranges': 'https://www.sans.org/cyber-ranges/',
  'SANS Reading Room papers': 'https://www.sans.org/white-papers/',
  'Palo Alto free training': 'https://www.paloaltonetworks.com/services/education/digital-learning',
  'pfSense documentation': 'https://docs.netgate.com/pfsense/en/latest/',

  // Communities & Resources - GitHub
  'GitHub - Awesome SOC resources': 'https://github.com/cyb3rxp/awesome-soc',
  'GitHub - Awesome Penetration Testing': 'https://github.com/enaqx/awesome-pentest',
  'GitHub - Awesome DevSecOps': 'https://github.com/devsecops/awesome-devsecops',
  'GitHub - Awesome Cloud Security': 'https://github.com/4ndersonLin/awesome-cloud-security',
  'GitHub - DevSecOps resources': 'https://github.com/devsecops/awesome-devsecops',
  'GitHub - Cloud Security Projects': 'https://github.com/4ndersonLin/awesome-cloud-security',
  'GitHub - Security Tools repos': 'https://github.com/sbilly/awesome-security',
  'GitHub - Write-ups and tools': 'https://github.com/Hack-with-Github/Awesome-Hacking',

  // Communities - Discord, Reddit, LinkedIn
  'Discord - InfoSec community servers': 'https://discord.gg/infosec',
  'InfoSec community Discord servers': 'https://discord.gg/infosec',
  'Network Security Discord servers': 'https://discord.gg/networking',
  'DevSecOps community forums': 'https://community.devsecops.org',
  'Reddit - r/cybersecurity': 'https://www.reddit.com/r/cybersecurity/',
  'Reddit - r/netsec': 'https://www.reddit.com/r/netsec/',
  'Reddit r/networking community': 'https://www.reddit.com/r/networking/',
  'LinkedIn Cloud Security groups': 'https://www.linkedin.com/groups/4335469/',
  'LinkedIn DevSecOps groups': 'https://www.linkedin.com/groups/6585254/',
  'LinkedIn Security Engineering groups': 'https://www.linkedin.com/groups/36708/',
  'Twitter/X - InfoSec community': 'https://twitter.com/search?q=%23infosec',

  // Certifications
  'CompTIA': 'https://www.comptia.org',
  'CompTIA Security+': 'https://www.comptia.org/certifications/security',
  'CompTIA CySA+': 'https://www.comptia.org/certifications/cybersecurity-analyst',
  'CompTIA Network+': 'https://www.comptia.org/certifications/network',
  'eJPT': 'https://ine.com/learning/certifications/internal/elearnsecurity-junior-penetration-tester-cert',
  'OSCP': 'https://www.offsec.com/courses/pen-200/',
  'PNPT': 'https://certifications.tcm-sec.com/pnpt/',
  'Cisco CCNA': 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html',
  'AWS Certified Security': 'https://aws.amazon.com/certification/certified-security-specialty/',
  'Azure Security Engineer': 'https://learn.microsoft.com/en-us/certifications/azure-security-engineer/',

  // Networking
  'Cisco Packet Tracer': 'https://www.netacad.com/courses/packet-tracer',
  'GNS3': 'https://www.gns3.com',
  'Cisco Networking Academy': 'https://www.netacad.com',
  'Cisco Networking Academy (Free)': 'https://www.netacad.com',
  'CBT Nuggets - Networking': 'https://www.cbtnuggets.com/it-training/networking',

  // Malware Analysis
  'Practical Malware Analysis book': 'https://nostarch.com/malware',
  'OpenSecurityTraining2 - Architecture': 'https://opensecuritytraining.info/IntroX86.html',
  'Malware Unicorn RE101': 'https://malwareunicorn.org/workshops/re101.html',
  'ANY.RUN - Interactive sandbox': 'https://any.run',
  'MalwareBazaar samples': 'https://bazaar.abuse.ch',
  'Malware Traffic Analysis exercises': 'https://www.malware-traffic-analysis.net',
  'Flare-On Challenge archives': 'https://flare-on.com',
  'VX-Underground samples': 'https://vx-underground.org',
  'SANS DFIR Reading Room': 'https://www.sans.org/white-papers/?focus-area=digital-forensics',
  'Ghidra': 'https://ghidra-sre.org',

  // Threat Intelligence
  'MITRE ATT&CK Training': 'https://attack.mitre.org/resources/training/',
  'SANS Cyber Threat Intelligence Summit talks': 'https://www.sans.org/cyber-security-summit/',
  'Recorded Future University': 'https://www.recordedfuture.com/university',
  'APT Reports (Mandiant, CrowdStrike)': 'https://www.mandiant.com/resources/reports',
  'OpenCTI platform': 'https://www.opencti.io',
  'MISP Project tutorials': 'https://www.misp-project.org/documentation/',
  'CTI League community': 'https://cti-league.com',
  'Twitter/X - Threat Intel community': 'https://twitter.com/search?q=%23threatintel',
  'LinkedIn Threat Intelligence groups': 'https://www.linkedin.com/groups/4573505/',
  'Shodan': 'https://www.shodan.io',
  'Maltego': 'https://www.maltego.com',

  // Digital Forensics
  'SANS DFIR Poster': 'https://www.sans.org/posters/',
  '13Cubed YouTube channel': 'https://www.youtube.com/c/13Cubed',
  'Digital Forensics with Kali Linux book': 'https://www.packtpub.com/product/digital-forensics-with-kali-linux',
  'CyberDefenders DFIR challenges': 'https://cyberdefenders.org/blueteam-ctf-challenges/',
  'DFIR.Training resources': 'https://www.dfir.training',
  'AboutDFIR community': 'https://aboutdfir.com',
  'SANS DFIR NetWars': 'https://www.sans.org/cyber-ranges/',
  'Magnet Virtual Summit': 'https://www.magnetforensics.com/magnet-virtual-summit/',
  'DFIR Discord community': 'https://discord.gg/digitalforensics',
  'Autopsy': 'https://www.autopsy.com',
  'Volatility': 'https://www.volatilityfoundation.org',

  // GRC (Governance, Risk, Compliance)
  'NIST Cybersecurity Framework': 'https://www.nist.gov/cyberframework',
  'ISO 27001 overview courses': 'https://www.iso.org/isoiec-27001-information-security.html',
  'ISACA resources and webinars': 'https://www.isaca.org/resources',
  'SANS Security Policy Project': 'https://www.sans.org/information-security-policy/',
  'CIS Controls documentation': 'https://www.cisecurity.org/controls',
  'GRC community forums': 'https://www.isaca.org/resources/isaca-community',
  'ISACA certification prep': 'https://www.isaca.org/credentialing/certifications',
  'LinkedIn GRC groups': 'https://www.linkedin.com/groups/2399939/',
  'Local ISACA chapter events': 'https://www.isaca.org/membership/chapters',

  // Application Security
  'OWASP Cheat Sheet Series': 'https://cheatsheetseries.owasp.org',
  'Secure Code Warrior': 'https://www.securecodewarrior.com',
  'HackTheBox Web challenges': 'https://app.hackthebox.com/challenges',
  'OWASP Testing Guide': 'https://owasp.org/www-project-web-security-testing-guide/',
  'HackerOne / Bugcrowd': 'https://www.hackerone.com',
  'OWASP local chapter meetings': 'https://owasp.org/chapters/',
  'AppSec community conferences': 'https://owasp.org/events/',
  'OWASP Juice Shop': 'https://owasp.org/www-project-juice-shop/',
  'Semgrep': 'https://semgrep.dev',

  // Incident Response
  'NIST SP 800-61 IR Guide': 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final',
  'CyberDefenders IR challenges': 'https://cyberdefenders.org/blueteam-ctf-challenges/',
  'SANS IR case studies': 'https://www.sans.org/white-papers/',
  'SANS NetWars': 'https://www.sans.org/cyber-ranges/',
  'IR Discord communities': 'https://discord.gg/cybersecurity',
  'DFIR Report case studies': 'https://thedfirreport.com',
  'Velociraptor': 'https://docs.velociraptor.app',
  'TheHive': 'https://thehive-project.org',
};

interface RoadmapProps {
  role: CareerRole;
  onBack: () => void;
  onReset: () => void;
}

interface MonthCardProps {
  month: RoadmapMonth;
  monthNumber: number;
  roleId: string;
  completedTasks: Set<string>;
  onTaskToggle: (taskId: string) => void;
}

function getResourceUrl(resource: string): string | null {
  // Direct match
  if (RESOURCE_URLS[resource]) {
    return RESOURCE_URLS[resource];
  }

  // Partial match - find if resource contains a known key
  for (const [key, url] of Object.entries(RESOURCE_URLS)) {
    if (resource.toLowerCase().includes(key.toLowerCase())) {
      return url;
    }
  }

  // Try to match common patterns
  const lowerResource = resource.toLowerCase();
  if (lowerResource.includes('tryhackme')) return 'https://tryhackme.com';
  if (lowerResource.includes('hack the box') || lowerResource.includes('htb')) return 'https://hackthebox.com';
  if (lowerResource.includes('linkedin')) return 'https://www.linkedin.com/learning';
  if (lowerResource.includes('aws')) return 'https://aws.amazon.com/training/';
  if (lowerResource.includes('azure')) return 'https://learn.microsoft.com/en-us/training/azure/';
  if (lowerResource.includes('gcp') || lowerResource.includes('google cloud')) return 'https://cloud.google.com/training';
  if (lowerResource.includes('github')) return 'https://github.com';
  if (lowerResource.includes('youtube')) return 'https://youtube.com';
  if (lowerResource.includes('udemy')) return 'https://www.udemy.com';
  if (lowerResource.includes('coursera')) return 'https://www.coursera.org';
  if (lowerResource.includes('splunk')) return 'https://www.splunk.com/en_us/training.html';
  if (lowerResource.includes('cisco')) return 'https://www.cisco.com/c/en/us/training-events/training-certifications.html';
  if (lowerResource.includes('comptia')) return 'https://www.comptia.org';
  if (lowerResource.includes('owasp')) return 'https://owasp.org';
  if (lowerResource.includes('discord')) return 'https://discord.com';
  if (lowerResource.includes('reddit')) return 'https://reddit.com';

  return null;
}

function MonthCard({ month, monthNumber, roleId, completedTasks, onTaskToggle }: MonthCardProps) {
  const monthLabels = ['Month 1', 'Month 2', 'Month 3'];
  const monthColors = ['#22c55e', '#eab308', '#6366f1'];

  const getTaskId = (taskIndex: number) => `${roleId}-month${monthNumber}-task${taskIndex}`;

  const completedCount = month.tasks.filter((_, idx) =>
    completedTasks.has(getTaskId(idx))
  ).length;

  const progress = Math.round((completedCount / month.tasks.length) * 100);

  return (
    <div
      className={styles.monthCard}
      style={{ '--month-color': monthColors[monthNumber - 1] } as React.CSSProperties}
    >
      <div className={styles.monthHeader}>
        <div className={styles.monthHeaderTop}>
          <span
            className={styles.monthLabel}
            style={{ color: monthColors[monthNumber - 1] }}
          >
            {monthLabels[monthNumber - 1]}
          </span>
          <span className={styles.progressBadge}>
            {completedCount}/{month.tasks.length} tasks
          </span>
        </div>
        <h3 className={styles.monthTitle}>{month.title}</h3>
        <p className={styles.monthFocus}>{month.focus}</p>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${progress}%`,
              backgroundColor: monthColors[monthNumber - 1]
            }}
          />
        </div>
      </div>

      <div className={styles.monthContent}>
        {/* Tasks */}
        <div className={styles.taskSection}>
          <h4 className={styles.sectionLabel}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11L12 14L22 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Tasks to Complete
          </h4>
          <ul className={styles.taskList}>
            {month.tasks.map((task, index) => {
              const taskId = getTaskId(index);
              const isCompleted = completedTasks.has(taskId);

              return (
                <li
                  key={index}
                  className={`${styles.taskItem} ${isCompleted ? styles.taskCompleted : ''}`}
                  onClick={() => onTaskToggle(taskId)}
                >
                  <button
                    className={`${styles.taskCheckbox} ${isCompleted ? styles.checked : ''}`}
                    aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                    type="button"
                  >
                    {isCompleted && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                  <span className={styles.taskText}>{task}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Resources */}
        <div className={styles.resourceSection}>
          <h4 className={styles.sectionLabel}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Recommended Resources
          </h4>
          <ul className={styles.resourceList}>
            {month.resources.map((resource, index) => {
              const url = getResourceUrl(resource);

              return (
                <li key={index} className={styles.resourceItem}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resourceLink}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 3H21V9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 14L21 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {resource}
                    </a>
                  ) : (
                    <span className={styles.resourceText}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 3H21V9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 14L21 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {resource}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Roadmap({ role, onBack, onReset }: RoadmapProps) {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  // Load completed tasks from localStorage on mount
  useEffect(() => {
    const storageKey = `pathforge-progress-${role.id}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedTasks(new Set(parsed));
      } catch {
        // Invalid data, start fresh
      }
    }
  }, [role.id]);

  // Save to localStorage when tasks change
  const saveProgress = useCallback((tasks: Set<string>) => {
    const storageKey = `pathforge-progress-${role.id}`;
    localStorage.setItem(storageKey, JSON.stringify([...tasks]));
  }, [role.id]);

  const handleTaskToggle = useCallback((taskId: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      saveProgress(newSet);
      return newSet;
    });
  }, [saveProgress]);

  // Calculate total progress
  const totalTasks =
    role.roadmap.month1.tasks.length +
    role.roadmap.month2.tasks.length +
    role.roadmap.month3.tasks.length;
  const completedCount = completedTasks.size;
  const overallProgress = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className={styles.roadmap}>
      {/* Header */}
      <header className={styles.header}>
        <button className="btn btn-ghost" onClick={onBack}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Results
        </button>
        <div className={styles.headerRight}>
          <span className={styles.overallProgress}>
            {overallProgress}% Complete
          </span>
          <button className="btn btn-ghost" onClick={onReset}>
            Start Over
          </button>
        </div>
      </header>

      {/* Content */}
      <main className={styles.content}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 2V8H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 13H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 9H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Your Personal Roadmap
          </div>
          <h1 className={styles.heroTitle}>
            90-Day Path to <span className={styles.roleHighlight}>{role.title}</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Follow this structured plan to build the skills and knowledge needed
            to start your career as a {role.title}. Click tasks to mark them complete.
          </p>

          {/* Overall Progress Bar */}
          <div className={styles.overallProgressBar}>
            <div className={styles.overallProgressHeader}>
              <span>Overall Progress</span>
              <span>{completedCount}/{totalTasks} tasks completed</span>
            </div>
            <div className={styles.overallProgressTrack}>
              <div
                className={styles.overallProgressFill}
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className={styles.timeline}>
          <div className={styles.timelineLine} />

          <MonthCard
            month={role.roadmap.month1}
            monthNumber={1}
            roleId={role.id}
            completedTasks={completedTasks}
            onTaskToggle={handleTaskToggle}
          />
          <MonthCard
            month={role.roadmap.month2}
            monthNumber={2}
            roleId={role.id}
            completedTasks={completedTasks}
            onTaskToggle={handleTaskToggle}
          />
          <MonthCard
            month={role.roadmap.month3}
            monthNumber={3}
            roleId={role.id}
            completedTasks={completedTasks}
            onTaskToggle={handleTaskToggle}
          />
        </section>

        {/* Tips */}
        <section className={styles.tipsSection}>
          <h3 className={styles.tipsTitle}>Tips for Success</h3>
          <div className={styles.tipsList}>
            <div className={styles.tip}>
              <div className={styles.tipIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h4>Dedicate 1-2 hours daily</h4>
                <p>Consistency beats intensity. Small daily progress adds up.</p>
              </div>
            </div>
            <div className={styles.tip}>
              <div className={styles.tipIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4>Join the community</h4>
                <p>Connect with others on Discord, Reddit, and Twitter/X.</p>
              </div>
            </div>
            <div className={styles.tip}>
              <div className={styles.tipIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 20H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 3.50001C16.8978 3.10219 17.4374 2.87869 18 2.87869C18.2786 2.87869 18.5544 2.93356 18.8118 3.04017C19.0692 3.14677 19.303 3.30303 19.5 3.50001C19.697 3.697 19.8532 3.93085 19.9598 4.18822C20.0665 4.44559 20.1213 4.72144 20.1213 5.00001C20.1213 5.27859 20.0665 5.55444 19.9598 5.81181C19.8532 6.06918 19.697 6.30303 19.5 6.50001L7 19L3 20L4 16L16.5 3.50001Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h4>Document everything</h4>
                <p>Build your portfolio as you learn. Write about your journey.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={styles.finalCta}>
          <p>Ready to begin? Start with Month 1 and build momentum!</p>
          <button className="btn btn-secondary" onClick={onReset}>
            Take the Quiz Again
          </button>
        </section>
      </main>
    </div>
  );
}

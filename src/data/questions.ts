/**
 * Questionnaire Data
 *
 * This file defines all questions for the career pathway questionnaire.
 * Each answer includes weighted scores that contribute to different roles.
 *
 * Scoring Strategy:
 * - Weights range from -2 to +3
 * - Positive weights indicate alignment with a role
 * - Negative weights indicate misalignment
 * - Higher weights indicate stronger signals
 *
 * To adjust scoring:
 * - Modify weights in the 'weights' array of each answer
 * - Add new questions by following the Question interface
 */

import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  // ============================================
  // Question 1: Current Status
  // ============================================
  {
    id: 'q1-status',
    category: 'status',
    text: 'What best describes your current situation?',
    helperText: 'This helps us tailor recommendations to your experience level',
    answers: [
      {
        id: 'q1-student',
        text: 'Currently a student (college/bootcamp)',
        weights: [
          { roleId: 'soc-analyst', weight: 2 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 1 },
        ],
      },
      {
        id: 'q1-fresher',
        text: 'Fresh graduate looking for first IT role',
        weights: [
          { roleId: 'soc-analyst', weight: 3 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 1 },
        ],
      },
      {
        id: 'q1-switcher',
        text: 'Career switcher from another field',
        weights: [
          { roleId: 'soc-analyst', weight: 2 },
          { roleId: 'penetration-tester', weight: 0 },
          { roleId: 'cloud-security-engineer', weight: 2 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 1 },
          { roleId: 'devsecops-engineer', weight: 2 },
        ],
      },
      {
        id: 'q1-it-pro',
        text: 'IT professional wanting to specialize in security',
        weights: [
          { roleId: 'soc-analyst', weight: 1 },
          { roleId: 'penetration-tester', weight: 2 },
          { roleId: 'cloud-security-engineer', weight: 3 },
          { roleId: 'security-engineer', weight: 3 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 3 },
        ],
      },
    ],
  },

  // ============================================
  // Question 2: Primary Interest
  // ============================================
  {
    id: 'q2-interests',
    category: 'interests',
    text: 'Which area excites you the most?',
    helperText: 'Choose the one that sparks your curiosity',
    answers: [
      {
        id: 'q2-security',
        text: 'Defending against hackers and cyber threats',
        weights: [
          { roleId: 'soc-analyst', weight: 3 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 2 },
          { roleId: 'security-engineer', weight: 3 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 1 },
        ],
      },
      {
        id: 'q2-hacking',
        text: 'Finding vulnerabilities and breaking into systems',
        weights: [
          { roleId: 'soc-analyst', weight: 0 },
          { roleId: 'penetration-tester', weight: 3 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 2 },
          { roleId: 'network-engineer', weight: 0 },
          { roleId: 'devsecops-engineer', weight: 1 },
        ],
      },
      {
        id: 'q2-cloud',
        text: 'Cloud computing and modern infrastructure',
        weights: [
          { roleId: 'soc-analyst', weight: 0 },
          { roleId: 'penetration-tester', weight: 0 },
          { roleId: 'cloud-security-engineer', weight: 3 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 1 },
          { roleId: 'devsecops-engineer', weight: 3 },
        ],
      },
      {
        id: 'q2-coding',
        text: 'Building tools and automating security',
        weights: [
          { roleId: 'soc-analyst', weight: 0 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 2 },
          { roleId: 'security-engineer', weight: 3 },
          { roleId: 'network-engineer', weight: 0 },
          { roleId: 'devsecops-engineer', weight: 3 },
        ],
      },
      {
        id: 'q2-networking',
        text: 'Networks, routers, and infrastructure',
        weights: [
          { roleId: 'soc-analyst', weight: 1 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 3 },
          { roleId: 'devsecops-engineer', weight: 0 },
        ],
      },
    ],
  },

  // ============================================
  // Question 3: Work Style
  // ============================================
  {
    id: 'q3-workstyle',
    category: 'workstyle',
    text: 'How do you prefer to work?',
    helperText: 'There are no wrong answers—just be honest',
    answers: [
      {
        id: 'q3-analytical',
        text: 'Analyzing data, logs, and patterns',
        weights: [
          { roleId: 'soc-analyst', weight: 3 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 2 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 1 },
        ],
      },
      {
        id: 'q3-hands-on',
        text: 'Hands-on testing and experimentation',
        weights: [
          { roleId: 'soc-analyst', weight: 1 },
          { roleId: 'penetration-tester', weight: 3 },
          { roleId: 'cloud-security-engineer', weight: 2 },
          { roleId: 'security-engineer', weight: 2 },
          { roleId: 'network-engineer', weight: 3 },
          { roleId: 'devsecops-engineer', weight: 2 },
        ],
      },
      {
        id: 'q3-pressure',
        text: 'Fast-paced, high-pressure environments',
        weights: [
          { roleId: 'soc-analyst', weight: 3 },
          { roleId: 'penetration-tester', weight: 2 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 1 },
          { roleId: 'devsecops-engineer', weight: 2 },
        ],
      },
      {
        id: 'q3-building',
        text: 'Building and improving systems',
        weights: [
          { roleId: 'soc-analyst', weight: 0 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 3 },
          { roleId: 'security-engineer', weight: 3 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 3 },
        ],
      },
    ],
  },

  // ============================================
  // Question 4: Skill Comfort
  // ============================================
  {
    id: 'q4-skills',
    category: 'skills',
    text: 'Which skill are you most comfortable with?',
    helperText: "It's okay if you're still learning—pick what feels most natural",
    answers: [
      {
        id: 'q4-networking',
        text: 'Networking (TCP/IP, subnetting, protocols)',
        weights: [
          { roleId: 'soc-analyst', weight: 2 },
          { roleId: 'penetration-tester', weight: 2 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 3 },
          { roleId: 'devsecops-engineer', weight: 0 },
        ],
      },
      {
        id: 'q4-linux',
        text: 'Linux and command line',
        weights: [
          { roleId: 'soc-analyst', weight: 2 },
          { roleId: 'penetration-tester', weight: 3 },
          { roleId: 'cloud-security-engineer', weight: 2 },
          { roleId: 'security-engineer', weight: 2 },
          { roleId: 'network-engineer', weight: 1 },
          { roleId: 'devsecops-engineer', weight: 2 },
        ],
      },
      {
        id: 'q4-coding',
        text: 'Programming (Python, JavaScript, etc.)',
        weights: [
          { roleId: 'soc-analyst', weight: 1 },
          { roleId: 'penetration-tester', weight: 2 },
          { roleId: 'cloud-security-engineer', weight: 2 },
          { roleId: 'security-engineer', weight: 3 },
          { roleId: 'network-engineer', weight: 0 },
          { roleId: 'devsecops-engineer', weight: 3 },
        ],
      },
      {
        id: 'q4-cloud',
        text: 'Cloud platforms (AWS, Azure, GCP)',
        weights: [
          { roleId: 'soc-analyst', weight: 1 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 3 },
          { roleId: 'security-engineer', weight: 2 },
          { roleId: 'network-engineer', weight: 1 },
          { roleId: 'devsecops-engineer', weight: 3 },
        ],
      },
      {
        id: 'q4-none',
        text: "I'm just getting started with all of these",
        weights: [
          { roleId: 'soc-analyst', weight: 2 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 1 },
        ],
      },
    ],
  },

  // ============================================
  // Question 5: Learning Style
  // ============================================
  {
    id: 'q5-learning',
    category: 'workstyle',
    text: 'How do you prefer to learn new skills?',
    helperText: 'Your learning style affects which roles might suit you best',
    answers: [
      {
        id: 'q5-structured',
        text: 'Structured courses and certifications',
        weights: [
          { roleId: 'soc-analyst', weight: 2 },
          { roleId: 'penetration-tester', weight: 0 },
          { roleId: 'cloud-security-engineer', weight: 2 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 1 },
        ],
      },
      {
        id: 'q5-hands-on',
        text: 'Hands-on labs and CTF challenges',
        weights: [
          { roleId: 'soc-analyst', weight: 1 },
          { roleId: 'penetration-tester', weight: 3 },
          { roleId: 'cloud-security-engineer', weight: 2 },
          { roleId: 'security-engineer', weight: 2 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 2 },
        ],
      },
      {
        id: 'q5-projects',
        text: 'Building projects and real-world practice',
        weights: [
          { roleId: 'soc-analyst', weight: 1 },
          { roleId: 'penetration-tester', weight: 2 },
          { roleId: 'cloud-security-engineer', weight: 3 },
          { roleId: 'security-engineer', weight: 3 },
          { roleId: 'network-engineer', weight: 1 },
          { roleId: 'devsecops-engineer', weight: 3 },
        ],
      },
      {
        id: 'q5-reading',
        text: 'Reading documentation and research papers',
        weights: [
          { roleId: 'soc-analyst', weight: 2 },
          { roleId: 'penetration-tester', weight: 1 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 2 },
          { roleId: 'network-engineer', weight: 1 },
          { roleId: 'devsecops-engineer', weight: 1 },
        ],
      },
    ],
  },

  // ============================================
  // Question 6: Career Goal
  // ============================================
  {
    id: 'q6-goal',
    category: 'interests',
    text: "What's your primary career goal?",
    helperText: 'This helps us align recommendations with your aspirations',
    answers: [
      {
        id: 'q6-entry',
        text: 'Get my first cybersecurity job quickly',
        weights: [
          { roleId: 'soc-analyst', weight: 3 },
          { roleId: 'penetration-tester', weight: 0 },
          { roleId: 'cloud-security-engineer', weight: 1 },
          { roleId: 'security-engineer', weight: 1 },
          { roleId: 'network-engineer', weight: 2 },
          { roleId: 'devsecops-engineer', weight: 1 },
        ],
      },
      {
        id: 'q6-specialize',
        text: 'Become a specialist in a specific area',
        weights: [
          { roleId: 'soc-analyst', weight: 1 },
          { roleId: 'penetration-tester', weight: 3 },
          { roleId: 'cloud-security-engineer', weight: 3 },
          { roleId: 'security-engineer', weight: 2 },
          { roleId: 'network-engineer', weight: 3 },
          { roleId: 'devsecops-engineer', weight: 2 },
        ],
      },
      {
        id: 'q6-salary',
        text: 'Maximize earning potential',
        weights: [
          { roleId: 'soc-analyst', weight: 0 },
          { roleId: 'penetration-tester', weight: 2 },
          { roleId: 'cloud-security-engineer', weight: 3 },
          { roleId: 'security-engineer', weight: 2 },
          { roleId: 'network-engineer', weight: 1 },
          { roleId: 'devsecops-engineer', weight: 3 },
        ],
      },
      {
        id: 'q6-variety',
        text: 'Work on diverse, interesting problems',
        weights: [
          { roleId: 'soc-analyst', weight: 1 },
          { roleId: 'penetration-tester', weight: 2 },
          { roleId: 'cloud-security-engineer', weight: 2 },
          { roleId: 'security-engineer', weight: 3 },
          { roleId: 'network-engineer', weight: 1 },
          { roleId: 'devsecops-engineer', weight: 2 },
        ],
      },
    ],
  },
];

/**
 * Get all questions
 */
export function getAllQuestions(): Question[] {
  return QUESTIONS;
}

/**
 * Get a question by its ID
 */
export function getQuestionById(questionId: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === questionId);
}

/**
 * Get the total number of questions
 */
export function getTotalQuestions(): number {
  return QUESTIONS.length;
}

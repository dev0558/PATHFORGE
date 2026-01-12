/**
 * PathForge Type Definitions
 *
 * Core types for the career pathway platform.
 * All types are designed to be easily extensible for future roles and features.
 */

// ============================================
// Career Role Types
// ============================================

export type RoleId =
  | 'soc-analyst'
  | 'penetration-tester'
  | 'cloud-security-engineer'
  | 'security-engineer'
  | 'network-engineer'
  | 'devsecops-engineer'
  | 'malware-analyst'
  | 'threat-intel-analyst'
  | 'forensics-analyst'
  | 'grc-analyst'
  | 'appsec-engineer'
  | 'incident-responder';

export interface Certification {
  name: string;
  provider: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface RoadmapMonth {
  title: string;
  focus: string;
  tasks: string[];
  resources: string[];
}

export interface Roadmap {
  month1: RoadmapMonth;
  month2: RoadmapMonth;
  month3: RoadmapMonth;
}

export interface CareerRole {
  id: RoleId;
  title: string;
  shortDescription: string;
  overview: string;
  whyFits: string[];           // Reasons why this role fits the user
  skills: string[];
  tools: string[];
  certifications: Certification[];
  roadmap: Roadmap;
  salaryRange: string;         // e.g., "$60,000 - $90,000"
  demandLevel: 'high' | 'medium' | 'growing';
}

// ============================================
// Question & Answer Types
// ============================================

export type QuestionCategory =
  | 'status'
  | 'interests'
  | 'workstyle'
  | 'skills';

export interface AnswerWeight {
  roleId: RoleId;
  weight: number;  // Positive or negative weight
}

export interface Answer {
  id: string;
  text: string;
  weights: AnswerWeight[];
}

export interface Question {
  id: string;
  category: QuestionCategory;
  text: string;
  helperText?: string;
  answers: Answer[];
}

// ============================================
// User Session Types
// ============================================

export interface UserAnswer {
  questionId: string;
  answerId: string;
}

export interface RoleScore {
  roleId: RoleId;
  score: number;
}

export interface QuizResult {
  primaryRole: CareerRole;
  secondaryRole: CareerRole;
  scores: RoleScore[];
  answers: UserAnswer[];
}

// ============================================
// Location Types
// ============================================

export type LocationId =
  | 'uae'
  | 'usa'
  | 'uk'
  | 'india'
  | 'singapore'
  | 'australia'
  | 'canada'
  | 'germany'
  | 'saudi-arabia';

export interface Location {
  id: LocationId;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
}

export interface LocationInsights {
  salaryRange: string;
  demandLevel: 'high' | 'medium' | 'low' | 'growing';
  topEmployers: string[];
  jobMarketTrends: string;
  localCertifications: string[];
  visaInfo?: string;
  tips: string[];
}

// ============================================
// App State Types
// ============================================

export type AppScreen = 'landing' | 'location' | 'quiz' | 'results';

export interface AppState {
  currentScreen: AppScreen;
  currentQuestionIndex: number;
  answers: UserAnswer[];
  result: QuizResult | null;
  selectedLocation: Location | null;
}

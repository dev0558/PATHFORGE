/**
 * Decision Engine - Scoring System
 *
 * This module calculates role scores based on user answers.
 * The scoring algorithm is transparent and easily adjustable.
 *
 * Scoring Logic:
 * 1. Start with base score of 0 for each role
 * 2. For each user answer, add the weighted scores to corresponding roles
 * 3. Normalize scores to handle any edge cases
 * 4. Sort and return top 2 roles
 */

import type { UserAnswer, RoleScore, QuizResult, RoleId, CareerRole } from '../types';
import { getQuestionById, getRoleById } from '../data';

/**
 * All available role IDs for score initialization
 */
const ALL_ROLE_IDS: RoleId[] = [
  'soc-analyst',
  'penetration-tester',
  'cloud-security-engineer',
  'security-engineer',
  'network-engineer',
  'devsecops-engineer',
];

/**
 * Initialize empty scores for all roles
 */
function initializeScores(): Map<RoleId, number> {
  const scores = new Map<RoleId, number>();
  ALL_ROLE_IDS.forEach((roleId) => {
    scores.set(roleId, 0);
  });
  return scores;
}

/**
 * Calculate scores based on user answers
 *
 * @param answers - Array of user answers
 * @returns Array of role scores sorted by score (highest first)
 */
export function calculateScores(answers: UserAnswer[]): RoleScore[] {
  const scores = initializeScores();

  // Process each answer and accumulate weights
  answers.forEach((userAnswer) => {
    const question = getQuestionById(userAnswer.questionId);
    if (!question) return;

    const selectedAnswer = question.answers.find(
      (a) => a.id === userAnswer.answerId
    );
    if (!selectedAnswer) return;

    // Add weights from this answer to role scores
    selectedAnswer.weights.forEach((weight) => {
      const currentScore = scores.get(weight.roleId) || 0;
      scores.set(weight.roleId, currentScore + weight.weight);
    });
  });

  // Convert map to sorted array
  const scoreArray: RoleScore[] = Array.from(scores.entries())
    .map(([roleId, score]) => ({ roleId, score }))
    .sort((a, b) => b.score - a.score);

  return scoreArray;
}

/**
 * Get the top N roles based on scores
 *
 * @param scores - Sorted array of role scores
 * @param n - Number of top roles to return
 * @returns Array of top N CareerRole objects
 */
export function getTopRoles(scores: RoleScore[], n: number = 2): CareerRole[] {
  return scores
    .slice(0, n)
    .map((score) => getRoleById(score.roleId))
    .filter((role): role is CareerRole => role !== undefined);
}

/**
 * Generate the complete quiz result
 *
 * @param answers - Array of user answers
 * @returns Complete quiz result with primary/secondary roles and all scores
 */
export function generateResult(answers: UserAnswer[]): QuizResult | null {
  if (answers.length === 0) return null;

  const scores = calculateScores(answers);
  const topRoles = getTopRoles(scores, 2);

  if (topRoles.length < 2) return null;

  return {
    primaryRole: topRoles[0],
    secondaryRole: topRoles[1],
    scores,
    answers,
  };
}

/**
 * Calculate the match percentage for a role
 * Useful for displaying confidence levels
 *
 * @param roleScore - Score for a specific role
 * @param maxPossibleScore - Maximum possible score (optional, calculated if not provided)
 * @returns Percentage match (0-100)
 */
export function calculateMatchPercentage(
  roleScore: number,
  maxPossibleScore?: number
): number {
  // If no max provided, estimate based on average max weight (3) * 6 questions
  const max = maxPossibleScore || 18;
  const percentage = Math.min(Math.round((roleScore / max) * 100), 100);
  return Math.max(percentage, 0);
}

/**
 * Get role scores with match percentages
 *
 * @param answers - Array of user answers
 * @returns Array of roles with scores and percentages
 */
export function getScoresWithPercentages(answers: UserAnswer[]): Array<{
  role: CareerRole;
  score: number;
  percentage: number;
}> {
  const scores = calculateScores(answers);

  return scores
    .map((scoreItem) => {
      const role = getRoleById(scoreItem.roleId);
      if (!role) return null;

      return {
        role,
        score: scoreItem.score,
        percentage: calculateMatchPercentage(scoreItem.score),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

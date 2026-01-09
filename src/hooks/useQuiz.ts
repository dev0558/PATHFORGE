/**
 * useQuiz Hook
 *
 * Custom hook for managing the quiz state and navigation.
 * Provides a clean API for components to interact with the quiz flow.
 */

import { useState, useCallback, useMemo } from 'react';
import type { AppScreen, UserAnswer, QuizResult } from '../types';
import { getAllQuestions } from '../data';
import { generateResult } from '../engine';

interface UseQuizReturn {
  // State
  currentScreen: AppScreen;
  currentQuestionIndex: number;
  answers: UserAnswer[];
  result: QuizResult | null;

  // Derived state
  currentQuestion: ReturnType<typeof getAllQuestions>[0] | null;
  totalQuestions: number;
  progress: number;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;

  // Actions
  startQuiz: () => void;
  answerQuestion: (answerId: string) => void;
  goBack: () => void;
  resetQuiz: () => void;
}

export function useQuiz(): UseQuizReturn {
  const questions = useMemo(() => getAllQuestions(), []);

  // Core state
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Derived state
  const currentQuestion = questions[currentQuestionIndex] || null;
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Start the quiz from landing page
  const startQuiz = useCallback(() => {
    setCurrentScreen('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  }, []);

  // Handle answering a question and advance
  const answerQuestion = useCallback(
    (answerId: string) => {
      if (!currentQuestion) return;

      // Record the answer
      const newAnswers: UserAnswer[] = [
        ...answers,
        {
          questionId: currentQuestion.id,
          answerId,
        },
      ];
      setAnswers(newAnswers);

      // Check if this was the last question
      if (isLastQuestion) {
        // Calculate results and show results screen
        const quizResult = generateResult(newAnswers);
        setResult(quizResult);
        setCurrentScreen('results');
      } else {
        // Move to next question
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    },
    [currentQuestion, answers, isLastQuestion]
  );

  // Go back to previous question
  const goBack = useCallback(() => {
    if (currentScreen === 'results') {
      // Go back to last question
      setCurrentScreen('quiz');
      setCurrentQuestionIndex(totalQuestions - 1);
      // Remove the last answer
      setAnswers((prev) => prev.slice(0, -1));
      setResult(null);
    } else if (currentScreen === 'quiz' && !isFirstQuestion) {
      // Go to previous question
      setCurrentQuestionIndex((prev) => prev - 1);
      // Remove the last answer
      setAnswers((prev) => prev.slice(0, -1));
    } else if (currentScreen === 'quiz' && isFirstQuestion) {
      // Go back to landing
      setCurrentScreen('landing');
      setAnswers([]);
    }
  }, [currentScreen, isFirstQuestion, totalQuestions]);

  // Reset the entire quiz
  const resetQuiz = useCallback(() => {
    setCurrentScreen('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  }, []);

  return {
    // State
    currentScreen,
    currentQuestionIndex,
    answers,
    result,

    // Derived state
    currentQuestion,
    totalQuestions,
    progress,
    isFirstQuestion,
    isLastQuestion,

    // Actions
    startQuiz,
    answerQuestion,
    goBack,
    resetQuiz,
  };
}

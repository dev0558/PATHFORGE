/**
 * Quiz Page Component
 *
 * Displays one question at a time with progress indicator.
 * Handles answer selection and navigation between questions.
 */

import type { Question } from '../types';
import styles from './Quiz.module.css';

interface QuizProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  isFirstQuestion: boolean;
  onAnswer: (answerId: string) => void;
  onBack: () => void;
}

export function Quiz({
  question,
  currentIndex,
  totalQuestions,
  progress,
  isFirstQuestion,
  onAnswer,
  onBack,
}: QuizProps) {
  return (
    <div className={styles.quiz}>
      {/* Header with progress */}
      <header className={styles.header}>
        <button
          className={`btn btn-ghost ${styles.backButton}`}
          onClick={onBack}
          aria-label="Go back"
        >
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
          {isFirstQuestion ? 'Home' : 'Back'}
        </button>

        <div className={styles.progressInfo}>
          <span className={styles.questionCount}>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question content */}
      <main className={styles.content}>
        <div className={styles.questionCard} key={question.id}>
          <h2 className={styles.questionText}>{question.text}</h2>
          {question.helperText && (
            <p className={styles.helperText}>{question.helperText}</p>
          )}

          {/* Answer options */}
          <div className={styles.answers}>
            {question.answers.map((answer, index) => (
              <button
                key={answer.id}
                className={styles.answerButton}
                onClick={() => onAnswer(answer.id)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className={styles.answerIndicator}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={styles.answerText}>{answer.text}</span>
                <svg
                  className={styles.answerArrow}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className={styles.footer}>
        <p>Select the option that best describes you</p>
      </footer>
    </div>
  );
}

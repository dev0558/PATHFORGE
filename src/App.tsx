/**
 * PathForge - Main App Component
 *
 * Root component that orchestrates the application flow:
 * Landing -> Quiz -> Results
 *
 * Uses the useQuiz hook for state management.
 */

import { useQuiz } from './hooks';
import { Landing, Quiz, Results } from './pages';
import './styles/global.css';

function App() {
  const {
    currentScreen,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    isFirstQuestion,
    result,
    startQuiz,
    answerQuestion,
    goBack,
    resetQuiz,
  } = useQuiz();

  // Render the appropriate screen based on current state
  switch (currentScreen) {
    case 'landing':
      return <Landing onStart={startQuiz} />;

    case 'quiz':
      if (!currentQuestion) {
        return null;
      }
      return (
        <Quiz
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          progress={progress}
          isFirstQuestion={isFirstQuestion}
          onAnswer={answerQuestion}
          onBack={goBack}
        />
      );

    case 'results':
      if (!result) {
        return null;
      }
      return <Results result={result} onReset={resetQuiz} />;

    default:
      return <Landing onStart={startQuiz} />;
  }
}

export default App;

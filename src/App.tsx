/**
 * PathForge - Main App Component
 *
 * Root component that orchestrates the application flow:
 * Landing -> Location Selection -> Quiz -> Results
 *
 * Uses the useQuiz hook for state management.
 */

import { useQuiz } from './hooks';
import { Landing, LocationSelector, Quiz, Results } from './pages';
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
    selectedLocation,
    startQuiz,
    selectLocation,
    answerQuestion,
    goBack,
    resetQuiz,
  } = useQuiz();

  // Render the appropriate screen based on current state
  switch (currentScreen) {
    case 'landing':
      return <Landing onStart={startQuiz} />;

    case 'location':
      return <LocationSelector onSelect={selectLocation} onBack={goBack} />;

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
      if (!result || !selectedLocation) {
        return null;
      }
      return (
        <Results
          result={result}
          location={selectedLocation}
          onReset={resetQuiz}
        />
      );

    default:
      return <Landing onStart={startQuiz} />;
  }
}

export default App;

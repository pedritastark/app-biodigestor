import React, { useState } from 'react';
import { questions } from './data/questions.js';
import { calculateViability } from './services/viabilityCalculator.js';
import Layout from './components/Layout';
import WelcomeScreen from './screens/WelcomeScreen';
import ExplanationScreen1 from './screens/ExplanationScreen1';
import ExplanationScreen2 from './screens/ExplanationScreen2';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultsScreen from './screens/ResultsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState(null);

  const handleStart = () => setCurrentScreen('explanation1');
  
  const handleNextExplanation = () => setCurrentScreen('explanation2');
  
  const handleStartQuestionnaire = () => setCurrentScreen('questionnaire');

  const handlePrev = () => {
    if (currentScreen === 'explanation1') setCurrentScreen('welcome');
    else if (currentScreen === 'explanation2') setCurrentScreen('explanation1');
    else if (currentScreen === 'questionnaire' && currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else if (currentScreen === 'questionnaire' && currentQuestion === 0) {
      setCurrentScreen('explanation2');
    }
  };

  const handleAnswer = (questionId, value) => {
    // Esta es una versión simplificada, tendrás que pegar tu lógica más compleja
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setCurrentScreen('loading');
    setTimeout(() => {
      const calculatedResults = calculateViability(answers);
      setResults(calculatedResults);
      setCurrentScreen('results');
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setAnswers({});
    setResults(null);
    setCurrentQuestion(0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'explanation1':
        return <ExplanationScreen1 onNext={handleNextExplanation} onPrev={handlePrev} />;
      case 'explanation2':
        return <ExplanationScreen2 onNext={handleStartQuestionnaire} onPrev={handlePrev} />;
      case 'questionnaire':
        return <QuestionnaireScreen 
                 question={questions[currentQuestion]} 
                 onAnswer={handleAnswer} 
                 onNext={handleNextQuestion}
                 onPrev={handlePrev}
               />;
      case 'loading':
        return <LoadingScreen />;
      case 'results':
        return <ResultsScreen results={results} onRestart={handleRestart} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <Layout>
      <div className="bg-purple-500">
	{renderScreen()}
      </div> 
  </Layout>
  );
}

export default App;

// src/App.jsx

import React, { useState, useMemo } from 'react';
import { allQuestions } from './data/questions.js'; 
import { calculateViability, analyzeViability } from './services/viabilityCalculator.js';
import Layout from './components/Layout.jsx';
import WelcomeScreen from './screens/WelcomeScreen.jsx';
import ExplanationScreen1 from './screens/ExplanationScreen1.jsx';
import ExplanationScreen2 from './screens/ExplanationScreen2.jsx';
import QuestionnaireScreen from './screens/QuestionnaireScreen.jsx';
import LoadingScreen from './screens/LoadingScreen.jsx';
import ResultsScreen from './screens/ResultsScreen.jsx';
import IdInputScreen from './screens/IdInputScreen.jsx';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [answers, setAnswers] = useState({});
  const [questionHistory, setQuestionHistory] = useState([]);
  const [technicalResults, setTechnicalResults] = useState(null);
  const [userAnalysis, setUserAnalysis] = useState(null);

  const currentQuestionId = useMemo(() => {
    if (questionHistory.length === 0 && currentScreen === 'questionnaire') {
      return 'primary_activity';
    }
    return questionHistory[questionHistory.length - 1];
  }, [questionHistory, currentScreen]);

  // --- LÓGICA DE NAVEGACIÓN ---
  const handleStart = () => setCurrentScreen('id_input');
  const handleIdContinue = () => setCurrentScreen('explanation1');
  const handleNextExplanation = () => setCurrentScreen('explanation2');
  const handleStartQuestionnaire = () => {
    setAnswers(prev => ({ user_id: prev.user_id })); // Mantiene el user_id pero limpia otras respuestas
    setQuestionHistory(['primary_activity']);
    setCurrentScreen('questionnaire');
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    const currentQuestion = allQuestions[currentQuestionId];
    if (!currentQuestion) return; // Guarda de seguridad

    const nextQuestionId = currentQuestion.next(answers);

    if (nextQuestionId) {
      if (!questionHistory.includes(nextQuestionId)) {
        setQuestionHistory(prev => [...prev, nextQuestionId]);
      } else {
        const existingHistory = questionHistory.slice(0, questionHistory.indexOf(nextQuestionId) + 1);
        setQuestionHistory(existingHistory);
      }
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentScreen === 'questionnaire' && questionHistory.length > 1) {
      setQuestionHistory(prev => prev.slice(0, -1));
    } else if (currentScreen === 'questionnaire') {
        setCurrentScreen('explanation2');
    } else if (currentScreen === 'explanation2') {
        setCurrentScreen('explanation1');
    } else if (currentScreen === 'explanation1') {
        setCurrentScreen('id_input');
    } else if (currentScreen === 'id_input') {
        setCurrentScreen('welcome');
    }
  };
  
  const handleFinish = () => {
    setCurrentScreen('loading');
    
    setTimeout(() => {
      const techResults = calculateViability(answers);
      const analysis = analyzeViability(techResults);
      
      setTechnicalResults(techResults);
      setUserAnalysis(analysis);
      setCurrentScreen('results');
    }, 1500);
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setAnswers({});
    setTechnicalResults(null);
    setUserAnalysis(null);
    setQuestionHistory([]);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'id_input':
        return (
          <IdInputScreen 
            currentId={answers.user_id || ''} 
            onAnswer={handleAnswer}
            onContinue={handleIdContinue}
            onPrev={handlePrev}
            // 👇 AQUÍ CONECTAMOS EL BOTÓN OMITIR 👇
            onSkip={handleIdContinue} 
          />
        );
      case 'explanation1':
        return <ExplanationScreen1 onNext={handleNextExplanation} onPrev={handlePrev} />;
      case 'explanation2':
        return <ExplanationScreen2 onNext={handleStartQuestionnaire} onPrev={handlePrev} />;
      case 'questionnaire':
        // Nos aseguramos de que no intente renderizar si no hay una pregunta actual
        if (!currentQuestionId) return <LoadingScreen />;
        return (
          <QuestionnaireScreen 
            question={allQuestions[currentQuestionId]}
            answers={answers}
            onAnswer={handleAnswer} 
            onNext={handleNext}
            onPrev={handlePrev}
            questionHistory={questionHistory}
            totalQuestions={10} // Un número aproximado para la barra de progreso
          />
        );
      case 'loading':
        return <LoadingScreen />;
      case 'results':
        return <ResultsScreen 
                 results={technicalResults} 
                 analysis={userAnalysis} 
                 onRestart={handleRestart} 
               />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <Layout>
      {renderScreen()}
    </Layout>
  );
}

export default App;
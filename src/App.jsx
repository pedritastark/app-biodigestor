// src/App.jsx
import React, { useState } from 'react';
import { allQuestions } from './data/questions.js'; // Importamos el nuevo objeto de preguntas
import { calculateViability } from './services/viabilityCalculator.js';
import Layout from './components/Layout';
import WelcomeScreen from './screens/WelcomeScreen';
import ExplanationScreen1 from './screens/ExplanationScreen1';
import ExplanationScreen2 from './screens/ExplanationScreen2';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultsScreen from './screens/ResultsScreen';
import IdInputScreen from './screens/IdInputScreen';

function App() {
  // --- ESTADO CENTRAL DE LA APLICACIÓN ---
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [answers, setAnswers] = useState({});
  // El estado ahora guarda el ID de la pregunta actual, no un índice numérico
  const [currentQuestionId, setCurrentQuestionId] = useState('primary_activity');
  const [results, setResults] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]); // Para poder retroceder

  // --- LÓGICA DE NAVEGACIÓN ---

  // Funciones para el flujo inicial
  const handleStart = () => setCurrentScreen('id_input');
  const handleIdContinue = () => setCurrentScreen('explanation1');
  const handleNextExplanation = () => setCurrentScreen('explanation2');
  const handleStartQuestionnaire = () => {
    setCurrentScreen('questionnaire');
    setCurrentQuestionId('primary_activity'); // Empezamos en la primera pregunta
    setQuestionHistory([]); // Limpiamos el historial
  };

  // Función para manejar las respuestas
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Función para retroceder (ahora usa el historial)
  const handlePrev = () => {
    const lastQuestionId = questionHistory.pop();
    if (lastQuestionId) {
      setCurrentQuestionId(lastQuestionId);
      setQuestionHistory([...questionHistory]);
    } else {
      // Si no hay historial, volvemos al flujo anterior
      if (currentScreen === 'questionnaire') setCurrentScreen('explanation2');
      else if (currentScreen === 'explanation2') setCurrentScreen('explanation1');
      else if (currentScreen === 'explanation1') setCurrentScreen('id_input');
      else if (currentScreen === 'id_input') setCurrentScreen('welcome');
    }
  };

  // ¡LA NUEVA LÓGICA INTELIGENTE PARA "SIGUIENTE"!
  const handleNextQuestion = () => {
    setQuestionHistory(prev => [...prev, currentQuestionId]); // Guardamos la pregunta actual en el historial

    switch (currentQuestionId) {
      case 'primary_activity':
        if (answers.primary_activity === 'ganaderia') {
          setCurrentQuestionId('livestock_type');
        } else { // 'agricultura'
          setCurrentQuestionId('crop_residue_type');
        }
        break;
      
      case 'livestock_type':
        setCurrentQuestionId('animal_count');
        break;
      
      case 'animal_count':
        // Después de preguntar por ganadería, preguntamos si también tiene agricultura
        setCurrentQuestionId('has_secondary_residue');
        break;

      case 'crop_residue_type':
        setCurrentQuestionId('crop_residue_amount');
        break;

      case 'crop_residue_amount':
        // Después de preguntar por agricultura, preguntamos si también tiene ganadería
        setCurrentQuestionId('has_secondary_residue');
        break;
      
      case 'has_secondary_residue':
        if (answers.has_secondary_residue === 'si') {
          // Si dijo que sí, le hacemos las preguntas del otro bloque
          if (answers.primary_activity === 'ganaderia') {
            setCurrentQuestionId('crop_residue_type');
          } else { // 'agricultura'
            setCurrentQuestionId('livestock_type');
          }
        } else {
          // Si dijo que no, saltamos a las preguntas comunes
          setCurrentQuestionId('water_access');
        }
        break;
      
      case 'water_access':
        setCurrentQuestionId('space_available');
        break;
      
      case 'space_available':
        setCurrentQuestionId('investment_capacity');
        break;

      case 'investment_capacity':
        // Es la última pregunta, finalizamos
        handleFinish();
        break;

      default:
        // Por si acaso, volvemos al inicio
        handleRestart();
    }
  };

  const handleFinish = () => {
    setCurrentScreen('loading');
    setTimeout(() => {
      // Aquí iría el nuevo algoritmo que calcula para ambos modelos y recomienda el mejor
      const calculatedResults = { isViable: true, score: 95, gasProduction: 5000, reasons: ["Datos de ejemplo"] }; //calculateViability(answers);
      setResults(calculatedResults);
      setCurrentScreen('results');
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setAnswers({});
    setResults(null);
    setCurrentQuestionId('primary_activity');
    setQuestionHistory([]);
  };

  // --- RENDERIZADO ---
  const renderScreen = () => {
    let questionObject = allQuestions[currentQuestionId];

    // Lógica para el título dinámico de la pregunta de co-digestión
    if (currentQuestionId === 'has_secondary_residue') {
      const title = answers.primary_activity === 'ganaderia'
        ? "¿Además de su ganado, genera también residuos de cosecha que quisiera aprovechar?"
        : "¿Además de sus cosechas, tiene también animales cuyo estiércol quisiera aprovechar?";
      questionObject = { ...questionObject, title };
    }


    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'id_input':
        return <IdInputScreen currentId={answers.user_id || ''} onAnswer={handleAnswer} onContinue={handleIdContinue} onPrev={handlePrev} />;
      case 'explanation1':
        return <ExplanationScreen1 onNext={handleNextExplanation} onPrev={handlePrev} />;
      case 'explanation2':
        return <ExplanationScreen2 onNext={handleStartQuestionnaire} onPrev={handlePrev} />;
      case 'questionnaire':
        return <QuestionnaireScreen 
                 question={questionObject}
                 answers={answers}
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
      {renderScreen()}
    </Layout>
  );
}

export default App;
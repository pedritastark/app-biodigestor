import React, { useState } from 'react';
// IMPORTANTE: Asegúrate de que las rutas a tus archivos sean correctas
import { allQuestions } from './data/questions.js'; 
import { calculateViability, analyzeViability } from './services/viabilityCalculator.js'; // Importamos AMBAS funciones
import Layout from './components/Layout';
import WelcomeScreen from './screens/WelcomeScreen';
import ExplanationScreen1 from './screens/ExplanationScreen1';
import ExplanationScreen2 from './screens/ExplanationScreen2';
import QuestionnaireScreen from './screens/QuestionnaireScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultsScreen from './screens/ResultsScreen';
import IdInputScreen from './screens/IdInputScreen';

function App() {
  // --- El estado se mantiene igual ---
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [answers, setAnswers] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState('primary_activity');
  const [results, setResults] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]);

  // --- LÓGICA DE NAVEGACIÓN (Sin cambios) ---
  const handleStart = () => setCurrentScreen('id_input');
  const handleIdContinue = () => setCurrentScreen('explanation1');
  const handleNextExplanation = () => setCurrentScreen('explanation2');
  const handleStartQuestionnaire = () => {
    setCurrentScreen('questionnaire');
    setCurrentQuestionId('primary_activity');
    setQuestionHistory([]);
  };
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  const handlePrev = () => {
    const lastQuestionId = questionHistory.pop();
    if (lastQuestionId) {
      setCurrentQuestionId(lastQuestionId);
      setQuestionHistory([...questionHistory]);
    } else {
      if (currentScreen === 'questionnaire') setCurrentScreen('explanation2');
      else if (currentScreen === 'explanation2') setCurrentScreen('explanation1');
      else if (currentScreen === 'explanation1') setCurrentScreen('id_input');
      else if (currentScreen === 'id_input') setCurrentScreen('welcome');
    }
  };
  const handleNextQuestion = () => {
    setQuestionHistory(prev => [...prev, currentQuestionId]);
    switch (currentQuestionId) {
      case 'primary_activity':
        answers.primary_activity === 'ganaderia' ? setCurrentQuestionId('livestock_type') : setCurrentQuestionId('crop_residue_type');
        break;
      case 'livestock_type':
        setCurrentQuestionId('animal_count');
        break;
      case 'animal_count':
        setCurrentQuestionId('has_secondary_residue');
        break;
      case 'crop_residue_type':
        setCurrentQuestionId('crop_residue_amount');
        break;
      case 'crop_residue_amount':
        setCurrentQuestionId('has_secondary_residue');
        break;
      case 'has_secondary_residue':
        if (answers.has_secondary_residue === 'si') {
          answers.primary_activity === 'ganaderia' ? setCurrentQuestionId('crop_residue_type') : setCurrentQuestionId('livestock_type');
        } else {
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
        handleFinish();
        break;
      default:
        handleRestart();
    }
  };

  // --- LÓGICA DE FINALIZACIÓN Y CÁLCULO (¡AQUÍ ESTÁ EL CAMBIO!) ---
  const handleFinish = () => {
    setCurrentScreen('loading');
    
    setTimeout(() => {
      // 1. Llama a la función que calcula los datos técnicos (el puntaje, etc.)
      const technicalResults = calculateViability(answers);
      
      // 2. Llama a la función que analiza el puntaje y genera los comentarios
      const userAnalysis = analyzeViability(technicalResults.score);
      
      // 3. ¡Combina AMBOS resultados en un solo objeto!
      const finalResults = {
        ...technicalResults, // Contiene: isViable, score, gasProduction, reasons
        ...userAnalysis     // Contiene: level, recommendation, emoji
      };

      console.log("DATOS FINALES QUE SE ENVIARÁN A RESULTS SCREEN:", finalResults);

      // 4. Guarda el objeto combinado en el estado
      setResults(finalResults);
      setCurrentScreen('results');
    }, 2000); // Mantenemos el loading para una mejor experiencia de usuario
  };

  const handleRestart = () => {
    setCurrentScreen('welcome');
    setAnswers({});
    setResults(null);
    setCurrentQuestionId('primary_activity');
    setQuestionHistory([]);
  };

  // --- RENDERIZADO (Con el pequeño ajuste final) ---
  const renderScreen = () => {
    let questionObject = allQuestions[currentQuestionId];
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
        // ¡AJUSTE FINAL! Pasamos el objeto 'results' (que ahora lo tiene todo)
        // tanto a la prop 'results' como a la prop 'analysis'
        return <ResultsScreen 
                 results={results} 
                 analysis={results} 
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
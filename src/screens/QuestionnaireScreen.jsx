// src/screens/QuestionnaireScreen.jsx
import React from 'react';
// Importamos más íconos que usaremos en las opciones.
import { ChevronRight, ChevronLeft, Info, CheckCircle } from 'lucide-react';

const QuestionnaireScreen = ({ question, answers, onAnswer, onNext, onPrev, questionHistory, totalQuestions }) => {
  // --- Barra de Progreso ---
  const progressPercentage = Math.round((questionHistory.length / totalQuestions) * 100);

  // --- Lógica para saber si el botón "Siguiente" debe estar activo (sin cambios) ---
  const isAnswered = () => {
    const answer = answers[question.id];
    if (question.type === 'dynamic_number_input') {
      const livestockAnswer = answers['livestock_type'];
      const selectedTypes = livestockAnswer ? [livestockAnswer] : [];
      if (selectedTypes.length === 0) return false;
      return selectedTypes.every(type => answers.animal_counts && answers.animal_counts[type] && answers.animal_counts[type] !== '');
    }
    return answer !== undefined && answer !== '' && answer !== null;
  };

  // --- Renderizado de tipos de pregunta ---

  const renderRadioOptions = (q) => (
    <div className="space-y-3">
      {q.options.map((option) => {
        const isSelected = answers[q.id] === option.value;
        return (
          <label key={option.value} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${isSelected ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}>
            
            {/* MEJORA 1: Ícono opcional en las respuestas */}
            {option.icon && <div className="mr-4 text-blue-600">{option.icon}</div>}
            
            <span className="flex-grow text-base sm:text-lg text-gray-700">{option.label}</span>
            <input type="radio" name={q.id} value={option.value} checked={isSelected} onChange={(e) => onAnswer(q.id, e.target.value)} className="sr-only"/>
            
            {/* MEJORA 2: Checkmark visible al seleccionar */}
            {isSelected && <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />}
          </label>
        );
      })}
    </div>
  );
  
  // (La función para renderizar checkboxes no la estamos usando, pero se puede mejorar de la misma forma)
  
  const renderNumberInput = (q, placeholder = "Digite un valor numérico") => (
    <div className="flex items-center justify-center">
      {/* MEJORA 3: Input de número más grande y prominente */}
      <input type="number" id={q.id} min="0" placeholder={placeholder} value={answers[q.id] || ''} onChange={(e) => onAnswer(q.id, e.target.value)} className="p-4 text-center text-2xl border-2 border-gray-200 rounded-xl w-full max-w-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
    </div>
  );

  const renderDynamicNumberInput = (q) => {
    const livestockAnswer = answers['livestock_type'];
    const selectedTypes = livestockAnswer ? [livestockAnswer] : []; 
    if (selectedTypes.length === 0) {
      return <p className="text-center text-gray-500">Por favor, seleccione primero un tipo de ganado.</p>;
    }
    return (
      <div className="space-y-4">
        {selectedTypes.map(type => (
          <div key={type} className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="text-lg font-semibold text-gray-700 capitalize">{type}:</label>
            <input type="number" min="0" placeholder={`# de animales`} value={answers.animal_counts?.[type] || ''} onChange={(e) => {
              const newCounts = { ...(answers.animal_counts || {}), [type]: e.target.value };
              onAnswer('animal_counts', newCounts);
            }} className="p-3 text-center text-xl border-2 border-gray-200 rounded-xl w-full sm:w-48 focus:border-blue-500 focus:outline-none"/>
          </div>
        ))}
      </div>
    );
  }

  const renderQuestionContent = () => {
    // ... (el switch no cambia)
    switch (question.type) {
      case 'radio': return renderRadioOptions(question);
      case 'checkbox': return renderRadioOptions(question); // Reutilizamos el estilo de radio mejorado
      case 'number_input': return renderNumberInput(question);
      case 'dynamic_number_input': return renderDynamicNumberInput(question);
      default: return <p>Tipo de pregunta no soportado: {question.type}</p>;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      {/* MEJORA 4: La tarjeta ahora usa flexbox para mejor distribución del espacio */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl animate-fade-in flex flex-col overflow-hidden">
        
        <div className="w-full bg-gray-200 rounded-t-2xl">
          <div className="bg-green-500 text-xs font-bold leading-none py-1.5 text-center text-white rounded-t-2xl transition-all duration-500" style={{ width: `${progressPercentage}%` }}>
            {progressPercentage}%
          </div>
        </div>

        <div className="p-6 sm:p-8 flex-grow">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">{question.title}</h2>
          {question.helpText && (
            <p className="flex items-center justify-center text-center text-sm sm:text-base text-gray-500 mb-8 bg-gray-100 p-3 rounded-lg">
              <Info className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0" />
              <span>{question.helpText}</span>
            </p>
          )}
          
          <div className="mb-8">
              {renderQuestionContent()}
          </div>
        </div>

        {/* La navegación ahora tiene su propio contenedor para un mejor espaciado */}
        <div className="bg-gray-50 p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <button onClick={onPrev} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center w-full sm:w-auto">
              <ChevronLeft className="w-5 h-5 mr-2" /> Atrás
            </button>
            <button onClick={onNext} disabled={!isAnswered()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:scale-105">
                Siguiente <ChevronRight className="w-5 h-5 ml-2" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireScreen;
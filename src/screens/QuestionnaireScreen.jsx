// src/screens/QuestionnaireScreen.jsx

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
// IMPORTANTE: Importamos el objeto completo de preguntas para usarlo internamente
import { allQuestions } from '../data/questions.js'; 

const QuestionnaireScreen = ({ question, answers, onAnswer, onNext, onPrev }) => {
  // Función para renderizar los inputs de radio
  const renderRadioOptions = () => (
    <div className="space-y-3">
      {question.options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
            answers[question.id] === option.value
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <input
            type="radio"
            name={question.id}
            value={option.value}
            checked={answers[question.id] === option.value}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="ml-3 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );

  // Función para renderizar los inputs de número (para cantidad de animales o de cosecha)
  const renderNumberInput = () => (
     <div className="flex items-center justify-center">
        <input
          type="number"
          id={question.id}
          min="0"
          placeholder="Digite un valor"
          value={answers[question.id] || ''}
          onChange={(e) => onAnswer(question.id, e.target.value)}
          className="p-3 text-center text-xl border-2 border-gray-200 rounded-xl w-48 focus:border-blue-500 focus:outline-none"
        />
      </div>
  );
  
  // Renderizado condicional principal
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'radio':
        return renderRadioOptions();
      case 'number_input':
        return renderNumberInput();
      // Aquí podrías añadir más tipos de pregunta en el futuro
      default:
        return <p>Tipo de pregunta no soportado: {question.type}</p>;
    }
  };

  // El componente retorna el layout general de la pantalla de pregunta
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{question.title}</h2>
        
        <div className="mb-8">
            {renderQuestionContent()}
        </div>

        <div className="flex justify-between mt-8">
            <button onClick={onPrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors flex items-center">
              <ChevronLeft className="w-5 h-5 mr-2" /> Atrás
            </button>
            <button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center">
              Siguiente <ChevronRight className="w-5 h-5 ml-2" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireScreen;
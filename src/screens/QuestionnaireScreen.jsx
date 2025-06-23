// src/screens/QuestionnaireScreen.jsx

import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { questions as allQuestions } from '../data/questions.js';

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

  // Función para renderizar los inputs de checkbox
  const renderCheckboxOptions = () => (
    <div className="space-y-3">
      {question.options.map((option) => {
        const currentAnswers = answers[question.id] || [];
        return (
          <label
            key={option.value}
            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
              currentAnswers.includes(option.value)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <input
              type="checkbox"
              name={question.id}
              value={option.value}
              checked={currentAnswers.includes(option.value)}
              onChange={(e) => {
                // Lógica para añadir o quitar del array de respuestas
                const newAnswers = currentAnswers.includes(e.target.value)
                  ? currentAnswers.filter(item => item !== e.target.value)
                  : [...currentAnswers, e.target.value];
                onAnswer(question.id, newAnswers);
              }}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="ml-3 text-gray-700">{option.label}</span>
          </label>
        );
      })}
    </div>
  );

  // Función para renderizar los inputs de número dinámicos
  const renderDynamicNumberInputs = () => {
    const selectedTypes = answers['selected_livestock_types'] || [];
    
    const livestockOptions = allQuestions[0].options;

    if (selectedTypes.length === 0) {
      return <p className="text-gray-600 italic">Por favor, seleccione al menos un tipo de ganado en la pregunta anterior para continuar.</p>;
    }

    return (
      <div className="space-y-4">
        {selectedTypes.map((type) => (
          <div key={type} className="flex items-center justify-between">
            <label htmlFor={type} className="text-gray-700 capitalize">
              {livestockOptions.find(opt => opt.value === type)?.label || type}:
            </label>
            <input
              type="number"
              id={type}
              min="0"
              placeholder="Cantidad"
              value={answers.animal_counts?.[type] || ''}
              onChange={(e) => {
                // La respuesta es un objeto que se fusiona con el estado existente
                const newAnimalCounts = { ...answers.animal_counts, [type]: e.target.value };
                onAnswer('animal_counts', newAnimalCounts);
              }}
              className="p-2 border-2 border-gray-200 rounded-xl w-32 focus:border-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
    );
  };
  
  // Renderizado condicional principal
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'radio':
        return renderRadioOptions();
      case 'checkbox_group':
        return renderCheckboxOptions();
      case 'dynamic_number_input':
        return renderDynamicNumberInputs();
      default:
        return <p>Tipo de pregunta no soportado: {question.type}</p>;
    }
  };

  // El componente retorna el layout general de la pantalla de pregunta
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fade-in">
        {/* Barra de Progreso */}
        {/* (Aquí podrías añadir un componente de barra de progreso si quieres) */}

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{question.title}</h2>
        
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

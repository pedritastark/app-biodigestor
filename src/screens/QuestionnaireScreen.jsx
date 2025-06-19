import React from 'react';

const QuestionnaireScreen = ({ question, onAnswer, onNext, onPrev }) => {
  // Este es un esqueleto. La lógica de renderizado de cada tipo de pregunta irá aquí.
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.title}</h2>
        
        {/* Aquí renderizarías las opciones basadas en question.type */}
        <p className="text-gray-500">Renderizado de pregunta tipo '{question.type}' irá aquí.</p>

        <div className="flex justify-between mt-8">
            <button onClick={onPrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-xl transition-colors">Atrás</button>
            <button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl">Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireScreen;

import React from 'react';
import { CheckCircle } from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fade-in">
        <div className="text-6xl mb-4">🌱</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Evaluador de Viabilidad de Biodigestor
        </h1>
        <p className="text-lg text-gray-600">
          Descubra si su finca es ideal para implementar un biodigestor y conozca su potencial energético.
        </p>
        <button
          onClick={onStart}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Comenzar Evaluación
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;

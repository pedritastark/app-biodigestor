// src/screens/WelcomeScreen.jsx
import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    // 👇 ESTAS CLASES FUERZAN AL DIV A OCUPAR EL 100% DE SU PADRE RELATIVO 👇
    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-4">

      {/* El contenido de la tarjeta no cambia */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center animate-fade-in">

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Potencial Energético y de Fertilizantes para su Finca
        </h1>

        <p className="text-lg text-gray-600 mt-6">
          Responda unas pocas preguntas para conocer el potencial energético y de fertilizantes de su finca.
        </p>

        <button
          onClick={onStart}
          className="mt-10 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl ..."
        >
          Comenzar Evaluación
        </button>

      </div>
    </div>
  );
};

export default WelcomeScreen;
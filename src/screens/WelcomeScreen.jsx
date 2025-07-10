// src/screens/WelcomeScreen.jsx
import React from 'react';
// Importamos un ícono de la librería que ya usas para darle un toque visual.
import { Leaf } from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
  return (
    // CAMBIO TÉCNICO: Usamos min-h-screen para que ocupe toda la pantalla de forma más robusta.
    <div className="w-full min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center p-4">
      
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 text-center animate-fade-in flex flex-col items-center">

        {/* MEJORA 1: Icono visual para hacerlo más amigable */}
        <div className="bg-green-100 p-4 rounded-full mb-4">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>

        {/* MEJORA 2: Título más directo y local. Fuentes responsivas. */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Evalúe su Finca en Choachí
        </h1>
        <p className="text-lg text-green-700 font-semibold">Potencial para Biogás y Fertilizante</p>

        {/* MEJORA 3: Texto más conversacional y gestiona expectativas */}
        <p className="text-base text-gray-600 mt-6">
          Responda unas pocas preguntas (le tomará menos de 3 minutos) y descubra el potencial real de los residuos de su finca.
        </p>

        {/* MEJORA 4: Botón con mejores efectos visuales y de interacción */}
        <button
          onClick={onStart}
          className="mt-10 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Comenzar Evaluación
        </button>

      </div>
    </div>
  );
};

export default WelcomeScreen;
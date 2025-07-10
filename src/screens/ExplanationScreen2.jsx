// src/screens/ExplanationScreen2.jsx
import React from 'react';
import { ChevronRight, ChevronLeft, Flame, Sprout } from 'lucide-react';

const ExplanationScreen2 = ({ onNext, onPrev }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 flex flex-col animate-fade-in">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4">
          ¿Qué se Obtiene del Biodigestor?
        </h2>
        <p className="text-center text-gray-600 mb-6 sm:mb-8">
            Dentro del biodigestor, unas bacterias especiales convierten los desechos en dos productos de gran valor para su finca:
        </p>

        {/* MEJORA 1: Beneficios separados en tarjetas para mayor impacto visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Tarjeta para Biogás */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center flex flex-col items-center">
                <Flame className="h-10 w-10 text-orange-500 mb-2"/>
                <h3 className="text-xl font-bold text-gray-800">1. Biogás</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    Un gas combustible para **cocinar o calentar agua**, reduciendo la compra de pipetas o el uso de leña.
                </p>
            </div>

            {/* Tarjeta para Biol */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center flex flex-col items-center">
                <Sprout className="h-10 w-10 text-green-600 mb-2"/>
                <h3 className="text-xl font-bold text-gray-800">2. Biol</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    Un **fertilizante líquido de alta calidad** que nutre sus cultivos y mejora la salud de la tierra.
                </p>
            </div>

        </div>

        {/* MEJORA 2: Navegación consistente con progreso visual */}
        <div className="flex justify-between items-center mt-8">
            <button onClick={onPrev} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full transition-colors flex items-center">
              <ChevronLeft className="w-5 h-5 mr-1" /> Atrás
            </button>
            
            {/* Indicador de progreso visual (Paso 2 de 2) */}
            <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="w-4 h-4 rounded-full bg-blue-600"></div>
            </div>

            <button onClick={onNext} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg">
              ¡Entendido! Iniciar
            </button>
        </div>

      </div>
    </div>
  );
};

export default ExplanationScreen2;
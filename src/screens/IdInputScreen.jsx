// src/screens/IdInputScreen.jsx

import React from 'react';
// Añadimos ChevronLeft a los íconos importados
import { ArrowRight, Delete, ChevronLeft } from 'lucide-react';

// Recibimos la nueva prop 'onPrev'
const IdInputScreen = ({ currentId, onAnswer, onContinue, onPrev }) => {
  const keypad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'borrar', 0, 'continuar'];

  const handleKeyPress = (key) => {
    if (typeof key === 'number') {
      onAnswer('user_id', currentId + key.toString());
    } else if (key === 'borrar') {
      onAnswer('user_id', currentId.slice(0, -1));
    } else if (key === 'continuar' && currentId.length > 0) {
      onContinue();
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Añadimos 'relative' para posicionar el botón de atrás correctamente */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-fade-in">
        
        {/* 👇 BOTÓN DE "ATRÁS" AÑADIDO AQUÍ 👇 */}
        <button 
          onClick={onPrev} 
          className="absolute top-6 left-4 p-2 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Volver atrás"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800">Identificación</h2>
        <p className="text-gray-500 mt-2 mb-6">Por favor, digite su número de identificación para continuar.</p>

        <div className="bg-gray-100 rounded-lg h-16 w-full flex items-center justify-center text-4xl font-mono tracking-widest mb-6">
          {currentId || <span className="text-gray-400 text-2xl">...</span>}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* El resto del teclado no cambia */}
          {keypad.map((key) => {
            if (key === 'borrar') {
              return (
                <button key={key} onClick={() => handleKeyPress(key)} className="p-4 rounded-2xl bg-gray-200 active:bg-gray-300 flex items-center justify-center">
                  <Delete className="h-8 w-8 text-gray-700" />
                </button>
              );
            }
            if (key === 'continuar') {
              return (
                <button key={key} onClick={() => handleKeyPress(key)} disabled={currentId.length === 0} className="p-4 rounded-2xl bg-green-500 text-white active:bg-green-600 flex items-center justify-center disabled:bg-gray-300">
                  <ArrowRight className="h-8 w-8" />
                </button>
              );
            }
            return (
              <button key={key} onClick={() => handleKeyPress(key)} className="p-4 rounded-2xl bg-gray-200 active:bg-gray-300 text-3xl font-semibold text-gray-800">
                {key}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IdInputScreen;
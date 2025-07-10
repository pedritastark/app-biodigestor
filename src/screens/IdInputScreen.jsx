// src/screens/IdInputScreen.jsx
import React from 'react';
import { ArrowRight, Delete, ChevronLeft, Lock } from 'lucide-react';

// Se añade una nueva prop 'onSkip' para la funcionalidad de omitir.
const IdInputScreen = ({ currentId, onAnswer, onContinue, onPrev, onSkip }) => {

  const keypad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'borrar', 0, 'continuar'];

  const handleKeyPress = (key) => {
    // Limitar la longitud del ID para que no se desborde visualmente.
    if (typeof key === 'number' && currentId.length < 12) {
      onAnswer('user_id', currentId + key.toString());
    } else if (key === 'borrar') {
      onAnswer('user_id', currentId.slice(0, -1));
    } else if (key === 'continuar' && currentId.length > 0) {
      onContinue();
    }
  };

  return (
    // Layout más robusto con min-h-screen
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 sm:p-8 text-center animate-fade-in">
        
        <button 
          onClick={onPrev} 
          className="absolute top-4 left-4 p-2 text-gray-500 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Volver atrás"
        >
          <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" />
        </button>

        {/* MEJORA 1: Claridad en el propósito */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Guardar Evaluación (Opcional)</h2>
        <p className="text-gray-500 mt-2 mb-6 text-base">
          Digite un número (ej. su cédula) para guardar esta evaluación y poder consultarla después.
        </p>

        <div className="bg-gray-100 border-2 border-gray-200 rounded-lg h-16 w-full flex items-center justify-center text-3xl sm:text-4xl font-mono tracking-widest mb-6">
          {currentId || <span className="text-gray-400 text-2xl">...</span>}
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {keypad.map((key) => {
            // MEJORA 2: Mejoras visuales en los botones del teclado
            const baseClasses = "h-16 rounded-2xl flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
            
            if (key === 'borrar') {
              return <button key={key} onClick={() => handleKeyPress(key)} className={`${baseClasses} bg-gray-200 hover:bg-gray-300 focus:ring-gray-400`}><Delete className="h-7 w-7 text-gray-700" /></button>;
            }
            if (key === 'continuar') {
              return <button key={key} onClick={() => handleKeyPress(key)} disabled={currentId.length === 0} className={`${baseClasses} bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed focus:ring-green-400`}><ArrowRight className="h-7 w-7" /></button>;
            }
            return <button key={key} onClick={() => handleKeyPress(key)} className={`${baseClasses} bg-gray-200 hover:bg-gray-300 text-3xl font-semibold text-gray-800 focus:ring-gray-400`}>{key}</button>;
          })}
        </div>

        {/* MEJORA 3: Opción para omitir y nota de privacidad */}
        <div className="mt-6 text-center">
            <button onClick={onSkip} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">
                Omitir por ahora
            </button>
            <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
                <Lock className="h-3 w-3"/> Su información es privada y no se comparte.
            </p>
        </div>

      </div>
    </div>
  );
};

export default IdInputScreen;
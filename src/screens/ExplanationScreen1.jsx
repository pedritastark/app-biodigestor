import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ExplanationScreen1 = ({ onNext, onPrev }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Qué es un Biodigestor? (1/2)</h2>
        <p className="text-lg text-gray-700 mb-6 text-justify leading-relaxed">
          Imagine un <b>"estómago artificial"</b> para su finca. Es un contenedor sellado donde se deposita el estiércol de sus animales y otros desechos orgánicos.
        </p>
        <div className="flex justify-between mt-8">
            <button onClick={onPrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-xl transition-colors flex items-center"><ChevronLeft className="w-5 h-5 mr-2" /> Atrás</button>
            <button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-colors flex items-center">Siguiente <ChevronRight className="w-5 h-5 ml-2" /></button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationScreen1;

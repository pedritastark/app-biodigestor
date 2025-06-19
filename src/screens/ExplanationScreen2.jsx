import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const ExplanationScreen2 = ({ onNext, onPrev }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Qué produce? (2/2)</h2>
        <p className="text-lg text-gray-700 mb-6 text-justify leading-relaxed">
           Dentro del biodigestor, bacterias especiales descomponen la materia y producen dos cosas muy valiosas:
           <ul className="list-disc list-inside text-left mt-4 space-y-2">
            <li><b>Biogás:</b> Un gas combustible que puede usar para cocinar, calentar agua o generar electricidad.</li>
            <li><b>Biol:</b> Un fertilizante líquido de alta calidad para sus cultivos, que mejora la tierra y reduce la necesidad de químicos.</li>
           </ul>
        </p>
        <div className="flex justify-between mt-8">
            <button onClick={onPrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-xl transition-colors flex items-center"><ChevronLeft className="w-5 h-5 mr-2" /> Atrás</button>
            <button onClick={onNext} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition-colors flex items-center">¡Entendido! Iniciar Cuestionario</button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationScreen2;

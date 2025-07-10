// src/screens/ExplanationScreen1.jsx
import React from 'react';
import { ChevronRight, ChevronLeft, Package } from 'lucide-react';

// 👇 PASO 1: Importa tu nueva imagen aquí.
// Asegúrate de que la ruta '../assets/' sea correcta desde tu carpeta 'screens'.
import biodigestorEsquema from '../assets/biodigestor.png';

const ExplanationScreen1 = ({ onNext, onPrev }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 flex flex-col animate-fade-in">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4">
          ¿Qué es un Biodigestor?
        </h2>

        {/* 👇 PASO 2: Reemplaza el texto del diagrama con la etiqueta <img>. */}
        <div className="bg-gray-100 rounded-lg w-full h-48 sm:h-56 my-4 p-2">
            <img 
              src={biodigestorEsquema} 
              alt="Esquema de un biodigestor" 
              className="w-full h-full object-contain"
            />
        </div>
        
        <div className="text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Piense en él como un <strong className="text-blue-600">"estómago artificial"</strong> para su finca.
          </p>
          <p className="text-base text-gray-600 mt-4">
            Es un sistema cerrado y seguro donde se aprovechan los desechos orgánicos para convertirlos en recursos valiosos.
          </p>
        </div>
        
        <div className="text-left mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-700 flex items-center mb-2"><Package className="w-5 h-5 mr-2 text-blue-500"/>¿Qué entra al sistema?</h3>
            <ul className="list-disc list-inside text-gray-600">
                <li>Estiércol de animales (ganado, cerdos, gallinas).</li>
                <li>Residuos de sus cosechas (hojas, tallos, etc.).</li>
                <li>Un poco de agua para facilitar el proceso.</li>
            </ul>
        </div>

        <div className="flex justify-between items-center mt-8">
            <button onClick={onPrev} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full transition-colors flex items-center">
              <ChevronLeft className="w-5 h-5 mr-1" /> Atrás
            </button>
            
            <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
            </div>

            <button onClick={onNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center">
              Siguiente <ChevronRight className="w-5 h-5 ml-1" />
            </button>
        </div>

      </div>
    </div>
  );
};

export default ExplanationScreen1;
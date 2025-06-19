import React from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const ResultsScreen = ({ results, onRestart }) => {
  if (!results) return null; // No mostrar nada si no hay resultados

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fade-in">
        <div className="text-center">
            {results.isViable ? <CheckCircle className="w-20 h-20 text-green-500 mx-auto" /> : <XCircle className="w-20 h-20 text-red-500 mx-auto" />}
            <h2 className={`text-4xl font-bold mt-4 ${results.isViable ? 'text-green-600' : 'text-red-600'}`}>
                {results.isViable ? 'PROYECTO VIABLE' : 'PROYECTO NO VIABLE'}
            </h2>
            <p className="mt-4 text-lg">Puntuación de viabilidad: {results.score} / 100</p>
            {results.isViable && <p className="text-lg">Producción de Biogás: {results.gasProduction} m³/año</p>}
            <div className="mt-6 text-left border-t pt-4">
                <h3 className="font-bold mb-2">Análisis:</h3>
                <ul className="list-disc list-inside space-y-1">
                    {results.reasons.map((reason, index) => <li key={index}>{reason}</li>)}
                </ul>
            </div>
            <button onClick={onRestart} className="mt-8 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center mx-auto">
                <RotateCcw className="w-5 h-5 mr-2" /> Realizar Nueva Evaluación
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;

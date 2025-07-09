import React from 'react';
import { CheckCircle, XCircle, RotateCcw, Award, MessageSquareText, Wind } from 'lucide-react';

// Hemos añadido "analysis" a las props.
// 'results' tendrá los datos técnicos (score, reasons, etc.)
// 'analysis' tendrá los datos cualitativos (level, recommendation, emoji)
const ResultsScreen = ({ results, analysis, onRestart }) => {
  if (!results || !analysis) return null; // Espera a que ambos estén listos

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fade-in">
        <div className="text-center">
            {/* Usamos el emoji del análisis para un impacto visual inmediato */}
            <div className={`text-6xl mx-auto w-20 h-20 flex items-center justify-center`}>{analysis.emoji}</div>
            
            <h2 className={`text-4xl font-bold mt-4 ${results.isViable ? 'text-green-600' : 'text-red-600'}`}>
                {results.isViable ? `PROYECTO VIABLE (${analysis.level})` : `PROYECTO NO VIABLE (${analysis.level})`}
            </h2>
            
            {/* ---- NUEVA SECCIÓN DE ANÁLISIS CUALITATIVO ---- */}
            <div className="mt-6 text-center bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 flex items-center justify-center"><MessageSquareText className="w-5 h-5 mr-2"/>Nuestra Recomendación</h3>
              <p className="text-gray-600 mt-2">{analysis.recommendation}</p>
            </div>
            
            {/* ---- DATOS TÉCNICOS (como ya los tenías) ---- */}
            <div className="mt-6 text-left border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-bold flex items-center justify-center"><Award className="w-5 h-5 mr-2"/>Puntuación Final</h4>
                    <p className="text-2xl font-mono">{results.score} / 100</p>
                  </div>
                  {results.isViable && (
                    <div className="bg-green-50 p-3 rounded-lg">
                       <h4 className="font-bold flex items-center justify-center"><Wind className="w-5 h-5 mr-2"/>Producción de Biogás</h4>
                       <p className="text-2xl font-mono">{results.gasProduction} <span className="text-base">m³/año</span></p>
                    </div>
                  )}
              </div>
            </div>

            <div className="mt-6 text-left border-t pt-4">
                <h3 className="font-bold mb-2">Justificación Técnica:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
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
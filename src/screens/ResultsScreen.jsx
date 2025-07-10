// src/screens/ResultsScreen.jsx
import React from 'react';
import { RotateCcw, PiggyBank, CalendarClock, Leaf, Award, BarChart4, MessageSquareText, ShieldCheck, CheckCircle, Flame, Download, AlertTriangle } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportePDF from '../components/ReportePDF';


const ResultsScreen = ({ results, analysis, onRestart }) => {
  if (!results || !analysis) return null;

  const { evaluationType, isViable, score, gasProduction, reasons, financials } = results;
  const { estimatedInvestment, annualSavings, roiMonths } = financials;
  const { level, recommendation, emoji } = analysis;

  const biodigestorTitle = evaluationType === 'ganaderia' ? 'para Ganadería' : 'para Agricultura';

  // --- MEJORA 1: MÉTRICAS TANGIBLES ---
  // Convertimos m³ de gas a un valor que el agricultor entiende: pipetas de gas.
  const M3_GAS_PER_CYLINDER = 10; // m³ aprox. en una pipeta de 40lb.
  const annualCylindersSaved = isViable ? Math.round(gasProduction / M3_GAS_PER_CYLINDER) : 0;
  
  const formatCOP = (value) => new Intl.NumberFormat('es-CO', { 
    style: 'currency', currency: 'COP', minimumFractionDigits: 0 
  }).format(value);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-4 sm:p-6 md:p-8 animate-fade-in">

        <div className="text-center mb-6">
            <div className={`text-7xl mx-auto w-24 h-24 flex items-center justify-center`}>{emoji}</div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mt-4">
              <span className={`${isViable ? 'text-green-600' : 'text-orange-600'}`}>Viabilidad: {level}</span>
              <span className="block text-xl lg:text-2xl text-gray-600 font-semibold mt-1">para su Biodigestor {biodigestorTitle}</span>
            </h1>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="font-bold text-blue-800 text-lg flex items-center"><MessageSquareText className="w-6 h-6 mr-2 flex-shrink-0"/>Nuestra Recomendación</h2>
          <p className="text-blue-700 mt-2 text-base">{recommendation}</p>
        </div>
        
        {/* --- La pantalla ahora muestra contenido diferente si es viable o no --- */}
        {isViable ? (
          <>
            {/* --- ANÁLISIS FINANCIERO (SI ES VIABLE) --- */}
            <div className="mb-6">
              <h2 className="font-bold text-gray-800 text-xl mb-3 flex items-center"><PiggyBank className="w-6 h-6 mr-2"/>Análisis Financiero Estimado</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg text-center"><p className="text-sm text-gray-600">Inversión Aprox.</p><p className="text-2xl font-bold text-gray-800">{formatCOP(estimatedInvestment)}</p></div>
                <div className="bg-green-100 p-4 rounded-lg text-center"><p className="text-sm text-green-800">Ahorro Anual</p><p className="text-2xl font-bold text-green-700">{formatCOP(annualSavings)}</p></div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center"><p className="text-sm text-yellow-800">Recupera Inversión en</p><p className="text-2xl font-bold text-yellow-700">{roiMonths > 0 ? `${roiMonths} meses` : 'N/A'}</p></div>
              </div>
            </div>

            {/* --- RESUMEN TÉCNICO (SI ES VIABLE) --- */}
            <div className="mb-6">
              <h2 className="font-bold text-gray-800 text-xl mb-3 flex items-center"><BarChart4 className="w-6 h-6 mr-2"/>Resumen de Producción</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg text-center"><p className="text-sm text-gray-600">Puntaje Viabilidad</p><p className="text-2xl font-bold text-gray-800">{score} / 100</p></div>
                  <div className="bg-teal-50 p-4 rounded-lg text-center"><p className="text-sm text-teal-800">Producción de Biogás</p><p className="text-2xl font-bold text-teal-700">{gasProduction} m³/año</p></div>
                  <div className="bg-cyan-50 p-4 rounded-lg text-center"><p className="text-sm text-cyan-800">Equivale a</p><p className="text-2xl font-bold text-cyan-700">~{annualCylindersSaved} pipetas/año</p></div>
              </div>
            </div>
          </>
        ) : (
          /* --- MEJORA 2: ANÁLISIS PARA PROYECTOS NO VIABLES --- */
          <div className="mb-6">
            <h2 className="font-bold text-red-800 text-xl mb-3 flex items-center"><AlertTriangle className="w-6 h-6 mr-2"/>Puntos Críticos a Mejorar</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 mb-2">Para que su proyecto sea viable, le recomendamos enfocarse en los siguientes aspectos:</p>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                {/* Mostramos las razones del bajo puntaje */}
                {reasons.filter(r => r.includes('limitado') || r.includes('obstáculo') || r.includes('escaso') || r.includes('no alcanza')).map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h2 className="font-bold text-indigo-800 text-lg flex items-center"><CheckCircle className="w-6 h-6 mr-2"/>Próximos Pasos</h2>
            <ul className="list-disc list-inside mt-2 text-indigo-700 space-y-1">
                <li>Contacte a un técnico de la **UMATA de Choachí** para una visita y asesoría profesional.</li>
                <li>Pregunte en el **Banco Agrario** o cooperativas locales por líneas de crédito para proyectos de energía limpia.</li>
                <li className="text-sm italic">Recuerde: esta evaluación es una estimación para guiarlo. Los valores finales pueden variar.</li>
            </ul>
        </div>

        {/* --- MEJORA 3: BOTONES DE ACCIÓN FINAL --- */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={onRestart} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105">
                <RotateCcw className="w-5 h-5 mr-3" /> Realizar Nueva Evaluación
            </button>
            <PDFDownloadLink
              document={<ReportePDF results={results} analysis={analysis} />}
              fileName={`Reporte_Biodigestor_${results.evaluationType}_${new Date().toISOString().slice(0,10)}.pdf`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-transform transform hover:scale-105">
              {({ blob, url, loading, error }) => 
                loading ? 'Generando PDF...' : (
                  <>
                    <Download className="w-5 h-5 mr-3" /> Descargar Reporte
                  </>
                )
              }
            </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
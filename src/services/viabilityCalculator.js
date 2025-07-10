// src/services/viabilityCalculator.js

/**
 * ===================================================================================
 * FUNCIÓN 1: CALCULA LA VIABILIDAD TÉCNICA Y FINANCIERA
 * Realiza todos los cálculos numéricos del proyecto.
 * @param {object} answers - Objeto con las respuestas del usuario.
 * @returns {object} - Un objeto con todos los resultados numéricos.
 * ===================================================================================
 */
export const calculateViability = (answers) => {
  // --- 1. Valores de configuración ---
  const VIABILITY_THRESHOLD = 65; // Umbral de viabilidad: 65 de 100 puntos.
  const investmentMap = { alta: 8000000, media: 5500000, baja: 3000000 };
  // Factor de eficiencia fijo para el clima templado-frío de Choachí.
  const CLIMATE_EFFICIENCY_CHOACHI = 0.75; 

  // --- 2. Inicialización de variables ---
  let score = 0;
  let gasProduction = 0; // en m³ por año
  let reasons = [];
  let biomassScore = 0;
  const evaluationType = answers.primary_activity;

  // --- 3. Cálculo de Biomasa (RUTAS SEPARADAS) ---
  // La lógica se divide aquí dependiendo de la elección del usuario.
  if (evaluationType === 'ganaderia') {
      reasons.push('Análisis para un biodigestor de flujo continuo (Ganadería).');
      if (answers.livestock_type && answers.animal_counts) {
          const livestockData = {
            bovino: { biomassTonnes: 5.5, gasM3PerTon: 30, score: 8 },
            porcino: { biomassTonnes: 0.7, gasM3PerTon: 55, score: 6 },
            aviar: { biomassTonnes: 0.015, gasM3PerTon: 70, score: 3 },
            otro_ganado: { biomassTonnes: 0.5, gasM3PerTon: 40, score: 4 }
          };
          const selectedType = answers.livestock_type; // Ahora es un solo string
          const count = parseInt(answers.animal_counts?.[selectedType]) || 0;
          if (count > 0 && livestockData[selectedType]) {
              const data = livestockData[selectedType];
              gasProduction += (data.biomassTonnes * count) * data.gasM3PerTon;
              biomassScore += data.score * Math.min(count, 5);
              reasons.push('Se consideró el aporte de estiércol de su ganado.');
          }
      }

  } else if (evaluationType === 'agricultura') {
      reasons.push('Análisis para un biodigestor por lotes (Agricultura).');
      const cropAmount = parseInt(answers.crop_residue_amount) || 0;
      const cropFrequency = parseFloat(answers.frecuencia_cosecha) || 0;
      if (cropAmount > 0 && cropFrequency > 0) {
          const annualBags = cropAmount * cropFrequency;
          gasProduction += (annualBags * 0.05) * 45; // 0.05 Ton/bulto * 45 m3/Ton
          
          if (annualBags >= 30) biomassScore += 40;
          else if (annualBags >= 10) biomassScore += 25;
          else biomassScore += 15;
          reasons.push(`Se consideró el aporte de ${annualBags.toFixed(0)} bultos de cosecha al año.`);
      }
  }

  // --- 4. Ajustes y Puntuaciones Generales ---
  gasProduction *= CLIMATE_EFFICIENCY_CHOACHI;
  reasons.push(`Cálculo ajustado para el clima de Choachí (eficiencia del ${CLIMATE_EFFICIENCY_CHOACHI * 100}%).`);
  
  score += Math.min(biomassScore, 50);
  if (answers.water_access === 'abundante') score += 15; else if (answers.water_access === 'suficiente') score += 8;
  if (answers.space_available === 'amplio') score += 15; else if (answers.space_available === 'moderado') score += 8;
  if (answers.investment_capacity === 'alta') score += 20; else if (answers.investment_capacity === 'media') score += 12; else score += 5;

  // --- 5. Resultado Final y Cálculos Financieros ---
  const isViable = score >= VIABILITY_THRESHOLD;
  if (!isViable) {
    gasProduction = 0;
    reasons.push('El puntaje total no alcanza el mínimo de viabilidad técnica.');
  }
  
  // Aquí nos aseguramos de que monthlySavings sea 0 si no hay respuesta.
  const monthlySavings = parseInt(answers.gasto_gas_mensual) || 0;
  const estimatedInvestment = investmentMap[answers.investment_capacity] || 0;
  const roiMonths = (monthlySavings > 0 && estimatedInvestment > 0) ? Math.ceil(estimatedInvestment / monthlySavings) : 0;

  // --- 6. Objeto de Retorno (SIEMPRE con la misma estructura) ---
  // La clave es que este return siempre construye el objeto 'financials'.
  return {
    evaluationType,
    isViable,
    score: Math.min(score, 100),
    gasProduction: Math.round(gasProduction),
    reasons,
    financials: {
      estimatedInvestment,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      roiMonths
    }
  };
};

/**
* ===================================================================================
* FUNCIÓN 2: INTERPRETA EL RESULTADO PARA EL AGRICULTOR
* Genera el análisis cualitativo (el "consejo") para el usuario final.
* @param {object} results - El objeto completo de resultados de calculateViability.
* @returns {{level: string, recommendation: string, emoji: string}}
* ===================================================================================
*/
export const analyzeViability = (results) => {
  const { score, isViable, financials, evaluationType } = results;
  const { roiMonths } = financials;

  let recommendation = "";
  if (isViable) {
      if (roiMonths > 0 && roiMonths <= 24) {
          recommendation = `Con un retorno de inversión estimado en solo ${roiMonths} meses, este proyecto es financieramente muy atractivo.`;
      } else if (roiMonths > 24) {
          recommendation = `Aunque el proyecto es técnicamente viable, el retorno de la inversión tomará más de dos años. Asegúrese de tener un plan financiero sólido.`;
      } else {
          recommendation = `El proyecto es técnicamente viable. Para entender el beneficio económico, sería necesario conocer su gasto actual en gas.`;
      }
      
      if (evaluationType === 'ganaderia') {
          recommendation += " Para este tipo de biodigestor de 'flujo continuo', es clave la recolección diaria del estiércol.";
      } else {
          recommendation += " Para este biodigestor 'por lotes', es importante planificar bien la carga masiva de residuos después de cada cosecha.";
      }

  } else {
      recommendation = "Actualmente, el proyecto no cumple las condiciones mínimas de viabilidad.";
      if (score >= 40) {
          recommendation += " Sin embargo, tiene potencial. Revise los factores con menor puntaje y considere cómo mejorarlos.";
      }
  }
  
  if (isViable) {
      return { level: score >= 85 ? "EXCELENTE" : "VIABLE", recommendation, emoji: score >= 85 ? "🚀" : "👍" };
  } else {
      return { level: score >= 40 ? "POTENCIAL A MEJORAR" : "NO RECOMENDADO", recommendation, emoji: score >= 40 ? "🤔" : "❌" };
  }
};
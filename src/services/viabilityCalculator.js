// src/services/viabilityCalculator.js

/**
 * ===================================================================================
 * FUNCIÓN 1: CALCULA LA VIABILIDAD (VERSIÓN ACTUALIZADA)
 * Ahora no solo calcula el puntaje total, sino que genera un desglose detallado.
 * @param {object} answers - Objeto con las respuestas del usuario.
 * @returns {object} - Un objeto con todos los resultados, incluyendo el nuevo array `detailedScores`.
 * ===================================================================================
 */
export const calculateViability = (answers) => {
    // --- 1. Valores de configuración ---
    const VIABILITY_THRESHOLD = 65;
    const investmentMap = { alta: 8000000, media: 5500000, baja: 3000000 };
    const CLIMATE_EFFICIENCY_CHOACHI = 0.75;
  
    // --- 2. Inicialización de variables ---
    let totalScore = 0;
    let gasProduction = 0;
    
    // Novedad: Array para almacenar los puntajes detallados
    const detailedScores = [];
  
    const evaluationType = answers.primary_activity;
  
    // --- 3. Cálculo de Biomasa (con puntaje detallado) ---
    let biomassScore = 0;
    const biomassMaxScore = 50;
    
    if (evaluationType === 'ganaderia') {
      if (answers.livestock_type && answers.animal_counts) {
        const livestockData = {
          bovino: { biomassTonnes: 5.5, gasM3PerTon: 30, score: 8 },
          porcino: { biomassTonnes: 0.7, gasM3PerTon: 55, score: 6 },
          aviar: { biomassTonnes: 0.015, gasM3PerTon: 70, score: 3 },
          otro_ganado: { biomassTonnes: 0.5, gasM3PerTon: 40, score: 4 }
        };
        const selectedType = answers.livestock_type;
        const count = parseInt(answers.animal_counts?.[selectedType]) || 0;
        if (count > 0 && livestockData[selectedType]) {
          const data = livestockData[selectedType];
          gasProduction += (data.biomassTonnes * count) * data.gasM3PerTon;
          biomassScore += data.score * Math.min(count, 5);
        }
      }
    } else if (evaluationType === 'agricultura') {
      const cropAmount = parseInt(answers.crop_residue_amount) || 0;
      const cropFrequency = parseFloat(answers.frecuencia_cosecha) || 0;
      if (cropAmount > 0 && cropFrequency > 0) {
        const annualBags = cropAmount * cropFrequency;
        gasProduction += (annualBags * 0.05) * 45;
        if (annualBags >= 30) biomassScore += 40;
        else if (annualBags >= 10) biomassScore += 25;
        else biomassScore += 15;
      }
    }
    
    gasProduction *= CLIMATE_EFFICIENCY_CHOACHI;
    biomassScore = Math.min(biomassScore, biomassMaxScore);
    totalScore += biomassScore;
    
    detailedScores.push({
      id: 'biomasa',
      label: 'Disponibilidad de Biomasa',
      score: biomassScore,
      maxScore: biomassMaxScore,
      importance: 'La biomasa (estiércol o residuos de cosecha) es el "combustible" del biodigestor. Una cantidad suficiente es el factor más crítico para asegurar una producción de gas rentable.'
    });
  
    // --- 4. Puntuaciones Generales (con desglose) ---
    let waterScore = 0;
    const waterMaxScore = 15;
    if (answers.water_access === 'abundante') waterScore = 15;
    else if (answers.water_access === 'suficiente') waterScore = 8;
    totalScore += waterScore;
    detailedScores.push({
      id: 'agua',
      label: 'Acceso a Agua',
      score: waterScore,
      maxScore: waterMaxScore,
      importance: 'El agua es vital para diluir la biomasa y mantener la humedad adecuada dentro del biodigestor, lo que facilita la actividad de las bacterias que producen el biogás.'
    });
  
    let spaceScore = 0;
    const spaceMaxScore = 15;
    if (answers.space_available === 'amplio') spaceScore = 15;
    else if (answers.space_available === 'moderado') spaceScore = 8;
    totalScore += spaceScore;
    detailedScores.push({
      id: 'espacio',
      label: 'Espacio Disponible',
      score: spaceScore,
      maxScore: spaceMaxScore,
      importance: 'Se requiere un área adecuada y segura, alejada de viviendas y fuentes de agua, para la construcción del biodigestor y el manejo de sus subproductos.'
    });
  
    let investmentScore = 0;
    const investmentMaxScore = 20;
    if (answers.investment_capacity === 'alta') investmentScore = 20;
    else if (answers.investment_capacity === 'media') investmentScore = 12;
    else investmentScore = 5;
    totalScore += investmentScore;
    detailedScores.push({
      id: 'inversion',
      label: 'Capacidad de Inversión',
      score: investmentScore,
      maxScore: investmentMaxScore,
      importance: 'La capacidad de inversión determina el tamaño y la calidad del biodigestor que se puede construir, afectando directamente su eficiencia y durabilidad.'
    });
  
    // --- 5. Resultado Final y Cálculos Financieros ---
    const isViable = totalScore >= VIABILITY_THRESHOLD;
    if (!isViable) {
      gasProduction = 0;
    }
    
    const monthlySavings = parseInt(answers.gasto_gas_mensual) || 0;
    const estimatedInvestment = investmentMap[answers.investment_capacity] || 0;
    const roiMonths = (monthlySavings > 0 && estimatedInvestment > 0) ? Math.ceil(estimatedInvestment / monthlySavings) : 0;
  
    // --- 6. Objeto de Retorno (con la nueva estructura) ---
    return {
      isViable,
      totalScore: Math.min(totalScore, 100),
      gasProduction: Math.round(gasProduction),
      financials: {
        estimatedInvestment,
        monthlySavings,
        annualSavings: monthlySavings * 12,
        roiMonths
      },
      detailedScores,
      reasons: [] // Se mantiene para compatibilidad con otros componentes
    };
  };
  
  /**
  * ===================================================================================
  * FUNCIÓN 2: INTERPRETA EL RESULTADO
  * ===================================================================================
  */
  export const analyzeViability = (results) => {
    const { totalScore, isViable, financials, evaluationType } = results;
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
        if (totalScore >= 40) {
            recommendation += " Sin embargo, tiene potencial. Revise los factores con menor puntaje y considere cómo mejorarlos.";
        }
    }
    
    if (isViable) {
        return { level: totalScore >= 85 ? "EXCELENTE" : "VIABLE", recommendation, emoji: totalScore >= 85 ? "🚀" : "👍" };
    } else {
        return { level: totalScore >= 40 ? "POTENCIAL A MEJORAR" : "NO RECOMENDADO", recommendation, emoji: totalScore >= 40 ? "🤔" : "❌" };
    }
  };
  
  
  /**
  * ===================================================================================
  * FUNCIÓN 3: ORQUESTADOR DE DATOS PARA EL REPORTE
  * ===================================================================================
  */
  export const generateReportData = (answers) => {
      const viabilityResults = calculateViability(answers);
      const analysisResults = analyzeViability(viabilityResults);
  
      const reportData = {
          ...viabilityResults,
          ...analysisResults
      };
  
      return reportData;
  }
  
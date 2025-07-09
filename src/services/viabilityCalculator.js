// src/services/viabilityCalculator.js

/**
 * 1. CALCULA LA VIABILIDAD TÉCNICA
 * Toma las respuestas de un formulario y calcula el puntaje, la producción de gas
 * y las razones técnicas de la viabilidad.
 * @param {object} answers - Objeto con las respuestas del usuario.
 * @returns {{isViable: boolean, score: number, gasProduction: number, reasons: string[]}}
 */
export const calculateViability = (answers) => {
    let viabilityScore = 0;
    let gasProduction = 0;
    let reasons = [];
    const VIABILITY_THRESHOLD = 70; // Umbral de viabilidad
  
    // --- Lógica de Ganadería ---
    const livestockData = {
      bovino: { biomassPerAnimalTonnes: 5, gasM3PerTonBiomass: 31.9, scoreThresholds: { high: 10, medium: 5, low: 1 }, scores: { high: 25, medium: 15, low: 5 } },
      porcino: { biomassPerAnimalTonnes: 0.7, gasM3PerTonBiomass: 55.7, scoreThresholds: { high: 20, medium: 10, low: 1 }, scores: { high: 25, medium: 15, low: 8 } },
      aviar: { biomassPerAnimalTonnes: 0.01, gasM3PerTonBiomass: 31.3, scoreThresholds: { high: 100, medium: 50, low: 10 }, scores: { high: 20, medium: 12, low: 5 } },
      otro_ganado: { biomassPerAnimalTonnes: 1, gasM3PerTonBiomass: 40, scoreThresholds: { high: 10, medium: 3, low: 1 }, scores: { high: 15, medium: 8, low: 3 } }
    };
  
    const selectedLivestockTypes = answers.selected_livestock_types || [];
    const animalCounts = answers.animal_counts || {};
    let totalBiomassFromAnimals = 0;
  
    selectedLivestockTypes.forEach(type => {
      const count = parseInt(animalCounts[type]) || 0;
      if (count > 0 && livestockData[type]) {
        const data = livestockData[type];
        const biomassForType = data.biomassPerAnimalTonnes * count;
        totalBiomassFromAnimals += biomassForType;
        gasProduction += biomassForType * data.gasM3PerTonBiomass;
  
        if (count >= data.scoreThresholds.high) {
          viabilityScore += data.scores.high;
          reasons.push(`Excelente cantidad de ganado ${type}.`);
        } else if (count >= data.scoreThresholds.medium) {
          viabilityScore += data.scores.medium;
          reasons.push(`Cantidad moderada de ganado ${type}.`);
        } else if (count >= data.scoreThresholds.low) {
          viabilityScore += data.scores.low;
          reasons.push(`Cantidad básica de ganado ${type}.`);
        }
      }
    });
  
    if (totalBiomassFromAnimals === 0) {
      reasons.push('No se ingresó biomasa de ganado.');
    }
  
    // --- Lógica de otros factores (Agua, Espacio, etc.) ---
    if (answers.water_access === 'abundante') {
      viabilityScore += 20;
      reasons.push('Acceso ideal al agua.');
    } else if (answers.water_access === 'limitado') {
      viabilityScore += 5;
      reasons.push('El acceso al agua es un factor a optimizar.');
    }
  
    if (answers.space_available === 'amplio') {
      viabilityScore += 10;
      reasons.push('Espacio ideal para la instalación.');
    }
  
    // --- Resultado Final ---
    const isViable = viabilityScore >= VIABILITY_THRESHOLD;
  
    // Si no es viable, la producción no se considera.
    if (!isViable) {
      gasProduction = 0;
      reasons.push('El puntaje no alcanza el umbral de viabilidad.');
    }
  
    // Se retorna el objeto con los resultados técnicos
    return {
      isViable,
      score: viabilityScore,
      gasProduction: Math.round(gasProduction),
      reasons
    };
  };
  
  
  /**
   * 2. INTERPRETA EL RESULTADO DEL CÁLCULO
   * Toma el puntaje generado por `calculateViability` y devuelve un análisis
   * cualitativo para el usuario final.
   * @param {number} score - El puntaje del proyecto.
   * @returns {{level: string, recommendation: string, emoji: string}}
   */
  export const analyzeViability = (score) => {
    if (score >= 80) {
      return {
        level: "EXCELENTE",
        recommendation: "El proyecto es altamente prometedor. Se sugiere proceder con estudios técnicos detallados y la planificación financiera.",
        emoji: "✅"
      };
    } else if (score >= 70) { // Ajustado al umbral de viabilidad
      return {
        level: "BUENA",
        recommendation: "El proyecto es viable. Se deben revisar los factores con menor puntaje para optimizar el diseño y asegurar la rentabilidad.",
        emoji: "👍"
      };
    } else if (score >= 40) {
      return {
        level: "CUESTIONABLE",
        recommendation: "Proceder con cautela. El proyecto tiene obstáculos importantes y no cumple el umbral de viabilidad.",
        emoji: "⚠️"
      };
    } else {
      return {
        level: "BAJA o NULA",
        recommendation: "No continuar con el proyecto en su forma actual. Las condiciones no son favorables.",
        emoji: "❌"
      };
    }
  };
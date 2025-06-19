// Esta es una función "pura". Recibe datos y devuelve un resultado, sin efectos secundarios.
export const calculateViability = (answers) => {
    let viabilityScore = 0;
    let gasProduction = 0;
    let reasons = [];
    const VIABILITY_THRESHOLD = 70;

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
            if (count >= data.scoreThresholds.high) { viabilityScore += data.scores.high; reasons.push(`Cantidad adecuada de ${type}.`); }
            else if (count >= data.scoreThresholds.medium) { viabilityScore += data.scores.medium; reasons.push(`Cantidad moderada de ${type}.`); }
            else if (count >= data.scoreThresholds.low) { viabilityScore += data.scores.low; reasons.push(`Cantidad básica de ${type}.`); }
        }
    });

    if (totalBiomassFromAnimals === 0) { reasons.push('No se detectó biomasa suficiente de ganado.'); }

    // Aquí iría el resto de la lógica de puntuación (agua, espacio, etc.)
    // Por ejemplo:
    if (answers.water_access === 'abundante') { viabilityScore += 20; reasons.push('Acceso ideal al agua.'); }
    if (answers.space_available === 'amplio') { viabilityScore += 10; reasons.push('Espacio ideal para la instalación.'); }


    const isViable = viabilityScore >= VIABILITY_THRESHOLD;

    if (!isViable) {
        gasProduction = 0;
    }

    // Al final, la función devuelve el objeto de resultados
    return {
        isViable,
        score: viabilityScore,
        gasProduction: Math.round(gasProduction),
        reasons
    };
};

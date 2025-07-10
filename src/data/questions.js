// src/data/questions.js

export const allQuestions = {
  // --- PREGUNTA INICIAL: SELECCIÓN DE TIPO DE BIODIGESTOR ---
  primary_activity: {
    id: 'primary_activity',
    title: 'Bienvenido. ¿Qué tipo de biodigestor desea evaluar hoy?',
    helpText: 'Evaluaremos cada tipo de desecho por separado para un resultado más preciso.',
    type: 'radio',
    options: [
      { value: 'ganaderia', label: 'Un biodigestor para Ganadería (estiércol)' },
      { value: 'agricultura', label: 'Un biodigestor para Agricultura (residuos de cosecha)' },
    ],
    // La navegación ahora es más simple: o vas por la ruta de ganadería o por la de agricultura.
    next: (answers) => {
      if (answers.primary_activity === 'ganaderia') return 'livestock_type';
      if (answers.primary_activity === 'agricultura') return 'crop_residue_type';
      return null;
    }
  },

  // --- RUTA 1: PREGUNTAS DE GANADERÍA ---
  livestock_type: {
    id: 'livestock_type',
    title: '¿Qué tipo de ganado tiene?',
    helpText: 'Puede seleccionar varios si tiene más de un tipo de animal.',
    type: 'radio',
    options: [
      { value: 'bovino', label: 'Bovino (vacas, toros)' },
      { value: 'porcino', label: 'Porcino (cerdos)' },
      { value: 'aviar', label: 'Aviar (gallinas, pollos)' },
      { value: 'otro_ganado', label: 'Otro (ovejas, cabras, etc.)' }
    ],
    next: () => 'animal_count'
  },
  animal_count: {
    id: 'animal_count',
    type: 'dynamic_number_input',
    helpText: 'Ingrese el número aproximado de animales de cada tipo que seleccionó.',
    // Después de esta pregunta, salta directamente a las preguntas generales.
    next: () => 'water_access'
  },

  // --- RUTA 2: PREGUNTAS DE AGRICULTURA ---
  crop_residue_type: {
    id: 'crop_residue_type',
    title: '¿Qué tipo de residuo de cosecha genera en mayor volumen?',
    helpText: 'Esto nos ayuda a calcular el potencial de gas de sus residuos vegetales.',
    type: 'radio',
    options: [
      { value: 'maiz', label: 'Residuos de Maíz (tusa, amero, rastrojo)' },
      { value: 'papa', label: 'Residuos de Papa (tallos, hojas)' },
      { value: 'hortalizas', label: 'Residuos de Hortalizas Varias' },
      { value: 'frutales', label: 'Residuos de Frutales (ej. curuba, mora)'}
    ],
    next: () => 'crop_residue_amount'
  },
  crop_residue_amount: {
    id: 'crop_residue_amount',
    title: '¿Cuántos bultos (de 50kg aprox.) de este residuo genera en CADA COSECHA?',
    helpText: 'Un cálculo aproximado es suficiente. Piense en una sola cosecha o ciclo.',
    type: 'number_input',
    next: () => 'frecuencia_cosecha'
  },
  frecuencia_cosecha: {
    id: 'frecuencia_cosecha',
    title: '¿Cuántas cosechas de este tipo tiene AL AÑO?',
    helpText: 'Esto es clave para calcular la cantidad total de residuos que genera anualmente.',
    type: 'radio',
    options: [
        // 👇 ESTOS VALORES AHORA SON TEXTO 👇
        { value: '1', label: 'Una cosecha al año' },
        { value: '2', label: 'Dos cosechas al año' },
        { value: '3', label: 'Tres o más cosechas al año' },
        { value: '0.5', label: 'Es un cultivo que dura más de un año' }
    ],
    next: () => 'water_access'
  },
  
  // --- BLOQUE DE PREGUNTAS GENERALES Y FINANCIERAS (COMÚN A AMBAS RUTAS) ---
  water_access: {
    id: 'water_access',
    title: '¿Cómo es el acceso a agua en su finca para mezclar los residuos?',
    type: 'radio',
    options: [
      { value: 'abundante', label: 'Abundante y constante (ej. acueducto veredal, nacedero)' },
      { value: 'suficiente', label: 'Suficiente pero a veces escasa (ej. agua lluvia)' },
      { value: 'limitada', label: 'Limitada o de difícil acceso' }
    ],
    next: () => 'space_available'
  },
  space_available: {
    id: 'space_available',
    title: '¿Cuenta con un espacio despejado para instalar el biodigestor?',
    type: 'radio',
    options: [
      { value: 'amplio', label: 'Sí, un espacio amplio y accesible (más de 30m²)' },
      { value: 'moderado', label: 'Sí, un espacio moderado (entre 15m² y 30m²)' },
      { value: 'limitado', label: 'No, el espacio es muy pequeño o de difícil acceso' }
    ],
    next: () => 'estrato'
  },
  estrato: {
    id: 'estrato',
    title: '¿A qué estrato socioeconómico pertenece su vivienda?',
    type: 'radio',
    options: [
        { value: '1', label: 'Estrato 1' },
        { value: '2', label: 'Estrato 2' },
        { value: '3', label: 'Estrato 3' },
        { value: 'otro', label: 'Otro o prefiero no decir' }
    ],
    next: () => 'tipo_gas_actual'
  },
  tipo_gas_actual: {
    id: 'tipo_gas_actual',
    title: 'Actualmente, ¿qué tipo de gas usa principalmente para cocinar?',
    type: 'radio',
    options: [
        { value: 'pipeta', label: 'Gas en Pipeta / Cilindro (GLP)' },
        { value: 'natural', label: 'Gas Natural (por tubería)' },
        { value: 'lena', label: 'Leña o Carbón' },
        { value: 'no_uso', label: 'No uso gas / Otro' }
    ],
    next: (answers) => {
        if(answers.tipo_gas_actual === 'natural' || answers.tipo_gas_actual === 'no_uso') {
            return 'investment_capacity';
        }
        return 'gasto_gas_mensual';
    }
  },
  gasto_gas_mensual: {
    id: 'gasto_gas_mensual',
    title: 'Aproximadamente, ¿cuánto dinero gasta AL MES en gas (pipetas) o leña?',
    type: 'number_input',
    next: () => 'investment_capacity'
  },
  investment_capacity: {
    id: 'investment_capacity',
    title: 'Finalmente, ¿cuál sería su capacidad de inversión para este proyecto?',
    type: 'radio',
    options: [
      { value: 'baja', label: 'Baja (Menos de $3.000.000 COP)' },
      { value: 'media', label: 'Media ($3.000.000 - $8.000.000 COP)' },
      { value: 'alta', label: 'Alta (Más de $8.000.000 COP)' }
    ],
    next: () => null // Fin del cuestionario.
  }
};
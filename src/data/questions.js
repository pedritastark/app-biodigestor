// src/data/questions.js

export const allQuestions = {
  'primary_activity': {
    id: 'primary_activity',
    title: 'Para empezar, ¿cuál es la actividad principal de su finca que genera la mayor cantidad de residuos?',
    type: 'radio',
    options: [
      { value: 'ganaderia', label: 'Ganadería (Estiércol)' },
      { value: 'agricultura', label: 'Agricultura (Residuos de Cosecha)' }
    ]
  },
  'livestock_type': {
    id: 'livestock_type',
    title: '¿Qué tipo de ganado tiene principalmente en su finca?',
    type: 'radio',
    options: [
      { value: 'bovino', label: 'Ganado Bovino (vacas, toros)' },
      { value: 'porcino', label: 'Ganado Porcino (cerdos)' },
      { value: 'aviar', label: 'Ganado Aviar (gallinas, pollos)' }
    ]
  },
  'animal_count': {
    id: 'animal_count',
    title: 'Por favor, ingrese la cantidad aproximada de animales:',
    type: 'number_input'
  },
  'crop_residue_type': {
    id: 'crop_residue_type',
    title: '¿Qué tipo de residuo de cosecha genera en mayor volumen?',
    type: 'radio',
    options: [
      { value: 'maiz', label: 'Residuos de Maíz (tusa, rastrojo)' },
      { value: 'papa', label: 'Residuos de Papa (rastrojo, etc.)' },
      { value: 'hortalizas', label: 'Residuos de Hortalizas (hojas, tallos)' }
    ]
  },
  'crop_residue_amount': {
    id: 'crop_residue_amount',
    title: 'Aproximadamente, ¿cuántos kilogramos de este residuo genera al final de un ciclo de cosecha?',
    type: 'number_input'
  },
  'has_secondary_residue': {
    id: 'has_secondary_residue',
    // El título de esta pregunta será dinámico, lo definiremos en App.jsx
    type: 'radio',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'no', label: 'No' }
    ]
  },
  'water_access': {
    id: 'water_access',
    title: '¿Tiene acceso constante a una fuente de agua en su finca?',
    type: 'radio',
    options: [
      { value: 'abundante', label: 'Sí, agua abundante todo el año' },
      { value: 'suficiente', label: 'Sí, agua suficiente la mayor parte del año' },
      { value: 'limitada', label: 'El acceso al agua es limitado o estacional' }
    ]
  },
  'space_available': {
    id: 'space_available',
    title: '¿Cuenta con un espacio despejado y cercano a la fuente de residuos para la instalación?',
    type: 'radio',
    options: [
      { value: 'amplio', label: 'Sí, un espacio amplio y accesible (más de 50m²)' },
      { value: 'moderado', label: 'Sí, un espacio moderado (entre 20-50m²)' },
      { value: 'limitado', label: 'El espacio es muy limitado o de difícil acceso (< 20m²)' }
    ]
  },
  'investment_capacity': {
    id: 'investment_capacity',
    title: '¿Cuál es su capacidad de inversión inicial aproximada para este proyecto?',
    type: 'radio',
    options: [
        { value: 'baja', label: 'Baja (Menos de $3,000,000 COP)' },
        { value: 'media', label: 'Media ($3,000,000 - $8,000,000 COP)' },
        { value: 'alta', label: 'Alta (Más de $8,000,000 COP)' }
    ]
  }
};
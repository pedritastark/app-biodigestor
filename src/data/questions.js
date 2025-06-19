export const questions = [
  {
    id: 'selected_livestock_types',
    title: '¿Qué tipo de ganado tiene en su finca?',
    type: 'checkbox_group',
    options: [
      { value: 'bovino', label: 'Ganado Bovino (Vacas, Toros)' },
      { value: 'porcino', label: 'Ganado Porcino (Cerdos)' },
      { value: 'aviar', label: 'Ganado Aviar (Pollos, Gallinas)' },
      { value: 'otro_ganado', label: 'Otro tipo de ganado' }
    ]
  },
  {
    id: 'animal_counts',
    title: 'Por favor, ingrese la cantidad aproximada de cada tipo de ganado seleccionado:',
    type: 'dynamic_number_input',
    min: 0
  },
  {
    id: 'water_access',
    title: '¿Tiene acceso constante a agua en su finca?',
    type: 'radio',
    options: [
      { value: 'abundante', label: 'Sí, agua abundante todo el año' },
      { value: 'suficiente', label: 'Sí, agua suficiente la mayor parte del año' },
      { value: 'limitada', label: 'Agua limitada o estacional' },
      { value: 'escasa', label: 'Muy poca agua disponible' }
    ]
  },
  {
    id: 'manure_freshness',
    title: '¿Con qué frecuencia recoge el estiércol de sus animales?',
    type: 'radio',
    options: [
      { value: 'diario', label: 'Diariamente (muy fresco)' },
      { value: 'semanal', label: 'Semanalmente' },
      { value: 'mensual', label: 'Mensualmente' },
      { value: 'ocasional', label: 'Ocasionalmente o cuando es necesario' }
    ]
  },
  {
    id: 'location_type',
    title: '¿Dónde está ubicada su finca?',
    type: 'radio',
    options: [
      { value: 'rural_aislada', label: 'Zona rural aislada (sin acceso a gas/electricidad)' },
      { value: 'rural_conectada', label: 'Zona rural con servicios básicos' },
      { value: 'periurbana', label: 'Zona periurbana (cerca de centros poblados)' },
      { value: 'urbana', label: 'Zona urbana' }
    ]
  },
  {
    id: 'space_available',
    title: '¿Tiene espacio disponible para instalar un biodigestor?',
    type: 'radio',
    options: [
      { value: 'amplio', label: 'Sí, espacio amplio (más de 50m²)' },
      { value: 'moderado', label: 'Espacio moderado (20-50m²)' },
      { value: 'limitado', label: 'Espacio limitado (menos de 20m²)' },
      { value: 'ninguno', label: 'No tengo espacio disponible' }
    ]
  },
  {
    id: 'investment_capacity',
    title: '¿Cuál es su capacidad de inversión inicial?',
    type: 'radio',
    options: [
      { value: 'alta', label: 'Alta (más de $2,000 USD)' },
      { value: 'media', label: 'Media ($500 - $2,000 USD)' },
      { value: 'baja', label: 'Baja (menos de $500 USD)' },
      { value: 'sin_inversion', label: 'No puedo invertir actualmente' }
    ]
  }
];

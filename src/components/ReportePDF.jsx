// src/components/ReportePDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// --- Estilos para el PDF (similar a CSS pero con algunas diferencias) ---
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 11,
    color: '#333'
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8', // Un azul corporativo
  },
  subtitle: {
    fontSize: 14,
    color: '#5f6368'
  },
  section: {
    marginBottom: 15,
    border: '1px solid #e0e0e0',
    borderRadius: 5,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f3f4f6',
    padding: 5,
    marginBottom: 8,
    color: '#1f2937'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  label: {
    fontWeight: 'bold'
  },
  value: {
    textAlign: 'right'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 9,
    color: 'grey'
  }
});

// --- Componente que define la estructura del PDF ---
const ReportePDF = ({ results, analysis }) => {
  const { evaluationType, isViable, score, gasProduction, financials } = results;
  const { estimatedInvestment, annualSavings, roiMonths } = financials;
  const { level } = analysis;
  
  const biodigestorTitle = evaluationType === 'ganaderia' ? 'Ganadería' : 'Agricultura';
  const formatCOP = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* --- Encabezado --- */}
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de Viabilidad de Biodigestor</Text>
          <Text style={styles.subtitle}>Evaluación para Finca en Choachí</Text>
        </View>

        {/* --- Sección de Veredicto --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Veredicto de la Evaluación</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tipo de Biodigestor Evaluado:</Text>
            <Text style={styles.value}>{biodigestorTitle}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nivel de Viabilidad:</Text>
            <Text style={{ ...styles.value, fontWeight: 'bold', color: isViable ? '#16a34a' : '#dc2626' }}>{level}</Text>
          </View>
        </View>

        {/* --- Sección Financiera (si es viable) --- */}
        {isViable && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Análisis Financiero Estimado</Text>
            <View style={styles.row}><Text style={styles.label}>Inversión Aproximada:</Text><Text style={styles.value}>{formatCOP(estimatedInvestment)}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Ahorro Anual en Gas/Leña:</Text><Text style={styles.value}>{formatCOP(annualSavings)}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Recuperación de Inversión:</Text><Text style={styles.value}>{roiMonths > 0 ? `${roiMonths} meses` : 'No Calculado'}</Text></View>
          </View>
        )}

        {/* --- Sección Técnica --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen Técnico</Text>
          <View style={styles.row}><Text style={styles.label}>Puntaje Final de Viabilidad:</Text><Text style={styles.value}>{score} / 100</Text></View>
          <View style={styles.row}><Text style={styles.label}>Producción Anual de Biogás:</Text><Text style={styles.value}>{gasProduction > 0 ? `${gasProduction} m³` : 'No Viable'}</Text></View>
        </View>

        {/* --- Pie de página --- */}
        <Text style={styles.footer}>
          Este es un reporte autogenerado por el Evaluador de Biodigestores de Choachí. Los valores son una estimación. 
          Fecha: {new Date().toLocaleDateString('es-CO')}
        </Text>
      </Page>
    </Document>
  );
};

export default ReportePDF;
// src/components/ReportePDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF (sin cambios)
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333'
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1a73e8',
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  subtitle: {
    fontSize: 12,
    color: '#5f6368'
  },
  section: {
    marginBottom: 15,
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#ffffff'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#f3f4f6',
    padding: 8,
    marginBottom: 10,
    color: '#1f2937',
    borderRadius: 5,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    textAlign: 'right',
    flex: 1,
  },
  detailSection: {
    marginBottom: 12,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
  },
  detailScore: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  scoreBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    marginTop: 4,
    marginBottom: 8,
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  importanceBox: {
    backgroundColor: '#f9fafb',
    borderLeftWidth: 3,
    borderLeftColor: '#60a5fa',
    padding: 8,
    marginTop: 5,
    borderRadius: 4,
  },
  importanceText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: 'grey'
  },
  // Estilo para el estado de carga
  loading: {
    textAlign: 'center',
    margin: 'auto',
    fontSize: 14,
    color: '#5f6368',
  }
});

// Componente que define la estructura del PDF
const ReportePDF = ({ reportData }) => {

  // --- CORRECCIÓN: Guarda de Seguridad ---
  // Si `reportDataa` no está definido, muestra un estado de carga en el PDF.
  // Esto evita el error de "destructuring undefined".
  if (!reportData) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.loading}>Generando reporte, por favor espere...</Text>
        </Page>
      </Document>
    );
  }

  // La lógica del componente ahora puede asumir que `reportData` existe.
  const { isViable, level, totalScore, financials, detailedScores } = reportData;
  const { estimatedInvestment, annualSavings, roiMonths } = financials;
  
  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 75) return '#16a34a'; // Verde
    if (percentage >= 40) return '#facc15'; // Amarillo
    return '#dc2626'; // Rojo
  };
  
  const formatCOP = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Reporte de Viabilidad de Biodigestor</Text>
          <Text style={styles.subtitle}>Análisis para la Secretaría de Agricultura</Text>
        </View>

        {/* Sección de Veredicto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Veredicto General</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nivel de Viabilidad:</Text>
            <Text style={{ ...styles.value, fontWeight: 'bold', fontSize: 14, color: isViable ? '#16a34a' : '#dc2626' }}>{level}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Puntaje Total de Viabilidad:</Text>
            <Text style={styles.value}>{totalScore} / 100</Text>
          </View>
        </View>

        {/* Sección de Análisis Detallado por Factor */}
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Análisis Detallado por Factor</Text>
            {detailedScores.map(item => (
                <View key={item.id} style={styles.detailSection}>
                    <View style={styles.detailHeader}>
                        <Text style={styles.detailLabel}>{item.label}</Text>
                        <Text style={styles.detailScore}>{`${item.score} / ${item.maxScore}`}</Text>
                    </View>
                    <View style={styles.scoreBarContainer}>
                        <View style={{
                            ...styles.scoreBarFill,
                            width: `${(item.score / item.maxScore) * 100}%`,
                            backgroundColor: getScoreColor(item.score, item.maxScore)
                        }} />
                    </View>
                    <View style={styles.importanceBox}>
                        <Text style={styles.importanceText}>{item.importance}</Text>
                    </View>
                </View>
            ))}
        </View>

        {/* Sección Financiera (si es viable) */}
        {isViable && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Análisis Financiero Estimado</Text>
            <View style={styles.row}><Text style={styles.label}>Inversión Aproximada:</Text><Text style={styles.value}>{formatCOP(estimatedInvestment)}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Ahorro Anual en Gas/Leña:</Text><Text style={styles.value}>{formatCOP(annualSavings)}</Text></View>
            <View style={styles.row}><Text style={styles.label}>Recuperación de Inversión:</Text><Text style={styles.value}>{roiMonths > 0 ? `${roiMonths} meses` : 'No Calculado'}</Text></View>
          </View>
        )}

        {/* Pie de página */}
        <Text style={styles.footer}>
          Este es un reporte autogenerado por el Sistema de Evaluación de Viabilidad de Biodigestores. Los valores son una estimación. 
          Fecha de generación: {new Date().toLocaleDateString('es-CO')}
        </Text>
      </Page>
    </Document>
  );
};

export default ReportePDF;

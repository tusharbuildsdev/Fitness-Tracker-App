import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Surface, Text } from 'react-native-paper';

import type { WeightEntry } from '../types';

interface MonthlyWeightChartProps { entries: WeightEntry[]; }

const chartConfig = { backgroundGradientFrom: '#FFFFFF', backgroundGradientTo: '#FFFFFF', backgroundGradientFromOpacity: 0, backgroundGradientToOpacity: 0, color: (opacity = 1) => `rgba(45, 155, 112, ${opacity})`, labelColor: (opacity = 1) => `rgba(119, 114, 126, ${opacity})`, propsForBackgroundLines: { stroke: '#DDECE5', strokeDasharray: '0' }, decimalPlaces: 1 };

export function MonthlyWeightChart({ entries }: MonthlyWeightChartProps) {
  const { width } = useWindowDimensions();
  const data = [...entries].slice(0, 30).reverse();
  const values = data.map((entry) => entry.weightKg);
  const minimum = Math.min(...values, 50) - 1;
  const maximum = Math.max(...values, 80) + 1;
  return <Surface elevation={1} style={styles.card}><View style={styles.header}><Text variant="titleMedium" style={styles.title}>Monthly progress</Text><Text variant="labelSmall" style={styles.range}>{data.length ? `${minimum.toFixed(0)}–${maximum.toFixed(0)} kg` : ''}</Text></View>{data.length ? <View style={styles.chart}><LineChart data={{ labels: data.map((entry, index) => index === 0 || index === data.length - 1 || index % 5 === 0 ? entry.dateKey.slice(5) : ''), datasets: [{ data: values, color: (opacity = 1) => `rgba(45, 155, 112, ${opacity})`, strokeWidth: 3 }] }} width={Math.max(width - 72, 240)} height={185} chartConfig={chartConfig} withOuterLines={false} withVerticalLines={false} bezier style={styles.lineChart} /></View> : <View style={styles.empty}><Text style={styles.emptyText}>Add weight entries to see your monthly trend.</Text></View>}</Surface>;
}

const styles = StyleSheet.create({ card: { borderRadius: 24, marginTop: 16, overflow: 'hidden', paddingVertical: 20 }, header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }, title: { fontWeight: '800' }, range: { color: '#77727E' }, chart: { overflow: 'hidden' }, lineChart: { marginLeft: -8 }, empty: { alignItems: 'center', height: 170, justifyContent: 'center' }, emptyText: { color: '#77727E', textAlign: 'center' } });

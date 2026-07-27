import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Surface, Text } from 'react-native-paper';

import type { StepEntry } from '../types';

interface StepsHistoryChartProps { entries: StepEntry[]; }

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF', backgroundGradientTo: '#FFFFFF', backgroundGradientFromOpacity: 0, backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(115, 87, 255, ${opacity})`, labelColor: (opacity = 1) => `rgba(119, 114, 126, ${opacity})`,
  propsForBackgroundLines: { stroke: '#E5E1EC', strokeDasharray: '0' }, decimalPlaces: 0,
};

export function StepsHistoryChart({ entries }: StepsHistoryChartProps) {
  const { width } = useWindowDimensions();
  const chartEntries = [...entries].slice(0, 7).reverse();
  return <Surface elevation={1} style={styles.card}><Text variant="titleMedium" style={styles.title}>Last 7 days</Text>{chartEntries.length ? <View style={styles.chart}><LineChart data={{ labels: chartEntries.map((entry) => entry.dateKey.slice(5)), datasets: [{ data: chartEntries.map((entry) => entry.count), color: (opacity = 1) => `rgba(115, 87, 255, ${opacity})`, strokeWidth: 3 }] }} width={Math.max(width - 72, 240)} height={170} chartConfig={chartConfig} fromZero withInnerLines withOuterLines={false} withVerticalLines={false} bezier style={styles.lineChart} /></View> : <View style={styles.empty}><Text style={styles.emptyText}>Save entries to see your trend.</Text></View>}</Surface>;
}

const styles = StyleSheet.create({ card: { borderRadius: 24, marginTop: 16, overflow: 'hidden', paddingVertical: 20 }, title: { fontWeight: '800', marginHorizontal: 20, marginBottom: 12 }, chart: { overflow: 'hidden' }, lineChart: { marginLeft: -8 }, empty: { alignItems: 'center', height: 150, justifyContent: 'center' }, emptyText: { color: '#77727E' } });

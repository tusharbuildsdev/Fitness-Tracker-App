import { useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import type { CalorieEntry } from '../types';

interface CaloriesHistoryChartProps { entries: CalorieEntry[]; }

const chartConfig = { backgroundGradientFrom: '#FFFFFF', backgroundGradientTo: '#FFFFFF', backgroundGradientFromOpacity: 0, backgroundGradientToOpacity: 0, color: (opacity = 1) => `rgba(242, 106, 75, ${opacity})`, labelColor: (opacity = 1) => `rgba(119, 114, 126, ${opacity})`, propsForBackgroundLines: { stroke: '#E5E1EC', strokeDasharray: '0' }, decimalPlaces: 0 };

export function CaloriesHistoryChart({ entries }: CaloriesHistoryChartProps) {
  const { width } = useWindowDimensions();
  const data = [...entries].slice(0, 7).reverse();
  return <Surface elevation={1} style={styles.card}><View style={styles.header}><Text variant="titleMedium" style={styles.title}>7-day intake</Text><View style={styles.legend}><View style={[styles.dot, styles.consumedDot]} /><Text variant="labelSmall">Intake</Text><View style={[styles.dot, styles.goalDot]} /><Text variant="labelSmall">Goal</Text></View></View>{data.length ? <View style={styles.chart}><LineChart data={{ labels: data.map((entry) => entry.dateKey.slice(5)), datasets: [{ data: data.map((entry) => entry.consumed), color: (opacity = 1) => `rgba(242, 106, 75, ${opacity})`, strokeWidth: 3 }, { data: data.map((entry) => entry.goal), color: (opacity = 1) => `rgba(170, 163, 181, ${opacity})`, strokeWidth: 2, strokeDashArray: [5, 5], withDots: false }] }} width={Math.max(width - 72, 240)} height={170} chartConfig={chartConfig} fromZero withOuterLines={false} withVerticalLines={false} bezier style={styles.lineChart} /></View> : <View style={styles.empty}><Text style={styles.emptyText}>Save entries to see your trend.</Text></View>}</Surface>;
}

const styles = StyleSheet.create({ card: { borderRadius: 24, marginTop: 16, overflow: 'hidden', paddingVertical: 20 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 20 }, title: { fontWeight: '800' }, legend: { alignItems: 'center', flexDirection: 'row', gap: 4 }, dot: { borderRadius: 5, height: 8, marginLeft: 5, width: 8 }, consumedDot: { backgroundColor: '#F26A4B' }, goalDot: { backgroundColor: '#AAA3B5' }, chart: { overflow: 'hidden' }, lineChart: { marginLeft: -8 }, empty: { alignItems: 'center', height: 150, justifyContent: 'center' }, emptyText: { color: '#77727E' } });

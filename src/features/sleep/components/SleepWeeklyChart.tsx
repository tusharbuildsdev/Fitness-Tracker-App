import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Surface, Text } from 'react-native-paper';

import type { SleepEntry } from '../types';

interface SleepWeeklyChartProps { entries: SleepEntry[]; }

const chartConfig = { backgroundGradientFrom: '#FFFFFF', backgroundGradientTo: '#FFFFFF', backgroundGradientFromOpacity: 0, backgroundGradientToOpacity: 0, color: (opacity = 1) => `rgba(77, 91, 213, ${opacity})`, labelColor: (opacity = 1) => `rgba(119, 114, 126, ${opacity})`, propsForBackgroundLines: { stroke: '#E8E9F8', strokeDasharray: '0' }, decimalPlaces: 1, barPercentage: 0.55, barRadius: 6 };

export function SleepWeeklyChart({ entries }: SleepWeeklyChartProps) {
  const { width } = useWindowDimensions();
  const data = [...entries].slice(0, 7).reverse();
  return <Animated.View entering={FadeInUp.delay(90).springify()}><Surface elevation={1} style={styles.card}><Text variant="titleMedium" style={styles.title}>Weekly sleep</Text>{data.length ? <View style={styles.chart}><BarChart data={{ labels: data.map((entry) => entry.dateKey.slice(5)), datasets: [{ data: data.map((entry) => Number((entry.durationMinutes / 60).toFixed(1))) }] }} width={Math.max(width - 72, 240)} height={185} yAxisLabel="" yAxisSuffix="h" fromZero withInnerLines withVerticalLabels chartConfig={chartConfig} showValuesOnTopOfBars style={styles.barChart} /></View> : <View style={styles.empty}><Text style={styles.emptyText}>Save sleep sessions to see your week.</Text></View>}</Surface></Animated.View>;
}
const styles = StyleSheet.create({ card: { borderRadius: 24, marginTop: 16, overflow: 'hidden', paddingVertical: 20 }, title: { fontWeight: '800', marginHorizontal: 20, marginBottom: 14 }, chart: { overflow: 'hidden' }, barChart: { marginLeft: -8 }, empty: { alignItems: 'center', height: 140, justifyContent: 'center' }, emptyText: { color: '#77727E' } });

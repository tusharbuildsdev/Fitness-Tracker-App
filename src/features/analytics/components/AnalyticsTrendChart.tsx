import { useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import type { AnalyticsDay } from '../types';

interface AnalyticsTrendChartProps { title: string; color: string; unit: string; days: AnalyticsDay[]; valueKey: 'steps' | 'calories' | 'workoutMinutes' | 'waterMl' | 'sleepMinutes'; }

export function AnalyticsTrendChart({ title, color, unit, days, valueKey }: AnalyticsTrendChartProps) {
  const { width } = useWindowDimensions();
  const data = days.length > 14 ? days.filter((_, index) => index % 3 === 0 || index === days.length - 1) : days;
  const values = data.map((day) => day[valueKey]);
  const total = values.reduce((sum, value) => sum + value, 0);
  const hasData = values.some((value) => value > 0);
  const chartConfig = { backgroundGradientFrom: '#FFFFFF', backgroundGradientTo: '#FFFFFF', backgroundGradientFromOpacity: 0, backgroundGradientToOpacity: 0, color: (opacity = 1) => color.replace(')', `, ${opacity})`).replace('rgb(', 'rgba('), labelColor: (opacity = 1) => `rgba(119, 114, 126, ${opacity})`, propsForBackgroundLines: { stroke: '#E6E2EC', strokeDasharray: '0' }, decimalPlaces: 0 };
  return <Surface elevation={1} style={styles.card} accessibilityLabel={`${title}: ${Math.round(total).toLocaleString()} ${unit} for the selected period`}><View style={styles.header}><Text variant="titleMedium" style={styles.title}>{title}</Text><Text variant="labelSmall" style={[styles.total, { color }]}>{Math.round(total).toLocaleString()} {unit}</Text></View>{hasData ? <View style={styles.chart}><LineChart data={{ labels: data.map((day, index) => index === 0 || index === data.length - 1 ? day.dateKey.slice(5) : ''), datasets: [{ data: values, color: (opacity = 1) => color.replace(')', `, ${opacity})`).replace('rgb(', 'rgba('), strokeWidth: 3 }] }} width={Math.max(width - 72, 240)} height={180} chartConfig={chartConfig} fromZero withOuterLines={false} withVerticalLines={false} bezier style={styles.lineChart} /></View> : <View style={styles.empty}><Text style={styles.emptyText}>No tracked data for this period.</Text></View>}</Surface>;
}
const styles = StyleSheet.create({ card: { borderRadius: 24, marginTop: 16, overflow: 'hidden', paddingVertical: 20 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }, title: { fontWeight: '800' }, total: { fontWeight: '800' }, chart: { overflow: 'hidden' }, lineChart: { marginLeft: -8 }, empty: { alignItems: 'center', height: 160, justifyContent: 'center' }, emptyText: { color: '#77727E' } });

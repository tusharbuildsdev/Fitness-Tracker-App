import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Surface, Text } from 'react-native-paper';

import type { ProgressComparison } from '../types';

interface ProgressComparisonCardProps { comparison: ProgressComparison; index: number; }

export function ProgressComparisonCard({ comparison, index }: ProgressComparisonCardProps) {
  const percentage = comparison.previous ? (comparison.current - comparison.previous) / comparison.previous * 100 : 0;
  const improved = percentage >= 0;
  return <Animated.View entering={FadeInUp.delay(index * 65).springify()} style={styles.wrap}><Surface elevation={1} style={styles.card}><View style={[styles.marker, { backgroundColor: comparison.color }]} /><View style={styles.body}><Text variant="titleSmall">{comparison.label}</Text><Text variant="titleMedium" style={styles.value}>{Math.round(comparison.current).toLocaleString()} {comparison.unit}</Text></View><View style={styles.change}><Feather name={improved ? 'trending-up' : 'trending-down'} size={16} color={improved ? '#278B64' : '#C77832'} /><Text variant="labelSmall" style={[styles.changeText, { color: improved ? '#278B64' : '#C77832' }]}>{comparison.previous ? `${Math.abs(percentage).toFixed(0)}%` : 'New'}</Text></View></Surface></Animated.View>;
}
const styles = StyleSheet.create({ wrap: { flex: 1, minWidth: '47%' }, card: { alignItems: 'center', borderRadius: 20, flexDirection: 'row', marginBottom: 10, padding: 14 }, marker: { borderRadius: 99, height: 30, marginRight: 10, width: 5 }, body: { flex: 1 }, value: { fontWeight: '800', marginTop: 2 }, change: { alignItems: 'center', flexDirection: 'row', gap: 3 }, changeText: { fontWeight: '800' } });

import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Surface, Text } from 'react-native-paper';

interface WeeklyProgressCardProps { weightKg?: number; weeklyChange: number; }

export function WeeklyProgressCard({ weightKg, weeklyChange }: WeeklyProgressCardProps) {
  const isLoss = weeklyChange < 0;
  const changeText = weeklyChange === 0 ? 'No change yet' : `${isLoss ? '↓' : '↑'} ${Math.abs(weeklyChange).toFixed(1)} kg this week`;
  return <Animated.View entering={FadeInDown.springify()}><Surface elevation={1} style={styles.card}><View style={styles.icon}><Feather name="trending-up" size={23} color="#2D9B70" /></View><View style={styles.body}><Text variant="titleMedium" style={styles.title}>Current weight</Text><Text variant="headlineMedium" style={styles.weight}>{weightKg ? `${weightKg.toFixed(1)} kg` : '—'}</Text><Text variant="bodySmall" style={[styles.change, !isLoss && weeklyChange > 0 && styles.gain]}>{changeText}</Text></View></Surface></Animated.View>;
}
const styles = StyleSheet.create({ card: { alignItems: 'center', borderRadius: 24, flexDirection: 'row', padding: 20 }, icon: { alignItems: 'center', backgroundColor: '#E5F5EE', borderRadius: 16, height: 56, justifyContent: 'center', marginRight: 14, width: 56 }, body: { flex: 1 }, title: { fontWeight: '800' }, weight: { color: '#263B34', fontWeight: '800', marginTop: 2 }, change: { color: '#2D9B70', marginTop: 3 }, gain: { color: '#C77832' } });

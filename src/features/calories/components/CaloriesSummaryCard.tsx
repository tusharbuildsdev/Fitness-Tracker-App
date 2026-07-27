import { Feather } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Surface, Text } from 'react-native-paper';

interface CaloriesSummaryCardProps { consumed: number; goal: number; }

export function CaloriesSummaryCard({ consumed, goal }: CaloriesSummaryCardProps) {
  const remaining = goal - consumed;
  const progress = Math.min(consumed / goal, 1);
  const progressWidth = useSharedValue(`${progress * 100}%`);
  useEffect(() => { progressWidth.value = withTiming(`${progress * 100}%`, { duration: 650 }); }, [progress, progressWidth]);
  const fillStyle = useAnimatedStyle(() => ({ width: progressWidth.value as never }));
  return <Surface elevation={1} style={styles.card}><View style={styles.header}><View style={styles.icon}><Feather name="zap" size={21} color="#F26A4B" /></View><View><Text variant="titleMedium" style={styles.title}>Today’s calories</Text><Text variant="bodySmall" style={styles.subtitle}>{consumed.toLocaleString()} of {goal.toLocaleString()} kcal</Text></View></View><View style={styles.track}><Animated.View style={[styles.fill, fillStyle]} /></View><View style={styles.footer}><Text variant="headlineSmall" style={[styles.remaining, remaining < 0 && styles.exceeded]}>{Math.abs(remaining).toLocaleString()} kcal</Text><Text variant="bodySmall" style={styles.remainingLabel}>{remaining >= 0 ? 'remaining' : 'over your goal'}</Text></View></Surface>;
}

const styles = StyleSheet.create({ card: { borderRadius: 24, padding: 20 }, header: { alignItems: 'center', flexDirection: 'row' }, icon: { alignItems: 'center', backgroundColor: '#FFF0EB', borderRadius: 15, height: 50, justifyContent: 'center', marginRight: 12, width: 50 }, title: { fontWeight: '800' }, subtitle: { color: '#77727E', marginTop: 2 }, track: { backgroundColor: '#F5E4DE', borderRadius: 99, height: 11, marginTop: 18, overflow: 'hidden' }, fill: { backgroundColor: '#F26A4B', borderRadius: 99, height: '100%' }, footer: { alignItems: 'baseline', flexDirection: 'row', marginTop: 12 }, remaining: { color: '#268A63', fontWeight: '800' }, exceeded: { color: '#C53D3D' }, remainingLabel: { color: '#77727E', marginLeft: 6 } });

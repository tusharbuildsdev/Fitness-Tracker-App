import { Feather } from '@expo/vector-icons';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Surface, Text } from 'react-native-paper';

interface StepsProgressCardProps { count: number; goal: number; }

export function StepsProgressCard({ count, goal }: StepsProgressCardProps) {
  const progress = Math.min(count / goal, 1);
  const width = useSharedValue(`${progress * 100}%`);
  useEffect(() => { width.value = withTiming(`${progress * 100}%`, { duration: 650 }); }, [progress, width]);
  const progressStyle = useAnimatedStyle(() => ({ width: width.value as never }));
  return <Surface elevation={1} style={styles.card}><View style={styles.header}><View style={styles.icon}><Feather name="activity" size={21} color="#7357FF" /></View><View><Text variant="titleMedium" style={styles.title}>Today’s steps</Text><Text variant="bodySmall" style={styles.subtitle}>{count.toLocaleString()} of {goal.toLocaleString()} steps</Text></View><Text variant="titleMedium" style={styles.percent}>{Math.round(progress * 100)}%</Text></View><View style={styles.track}><Animated.View style={[styles.fill, progressStyle]} /></View><Text variant="bodySmall" style={styles.remaining}>{Math.max(goal - count, 0).toLocaleString()} steps remaining</Text></Surface>;
}

const styles = StyleSheet.create({ card: { borderRadius: 24, padding: 20 }, header: { alignItems: 'center', flexDirection: 'row' }, icon: { alignItems: 'center', backgroundColor: '#F0EDFF', borderRadius: 15, height: 50, justifyContent: 'center', marginRight: 12, width: 50 }, title: { fontWeight: '800' }, subtitle: { color: '#77727E', marginTop: 2 }, percent: { color: '#7357FF', fontWeight: '800', marginLeft: 'auto' }, track: { backgroundColor: '#E9E5F5', borderRadius: 99, height: 11, marginTop: 18, overflow: 'hidden' }, fill: { backgroundColor: '#7357FF', borderRadius: 99, height: '100%' }, remaining: { color: '#77727E', marginTop: 9 } });

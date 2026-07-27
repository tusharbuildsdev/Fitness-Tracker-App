import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Surface, Text } from 'react-native-paper';

interface SleepDurationCardProps { durationMinutes: number; }

export function SleepDurationCard({ durationMinutes }: SleepDurationCardProps) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const goalProgress = Math.min(durationMinutes / 480, 1);
  return <Animated.View entering={FadeInDown.springify()}><Surface elevation={1} style={styles.card}><View style={styles.icon}><Feather name="moon" size={25} color="#4D5BD5" /></View><View style={styles.body}><Text variant="titleMedium" style={styles.title}>Last night’s sleep</Text><View style={styles.duration}><Text variant="headlineMedium" style={styles.value}>{hours}h {minutes}m</Text><Text variant="bodySmall" style={styles.goal}>{Math.round(goalProgress * 100)}% of 8h goal</Text></View><View style={styles.track}><View style={[styles.fill, { width: `${goalProgress * 100}%` }]} /></View></View></Surface></Animated.View>;
}
const styles = StyleSheet.create({ card: { alignItems: 'flex-start', borderRadius: 24, flexDirection: 'row', padding: 20 }, icon: { alignItems: 'center', backgroundColor: '#ECEEFD', borderRadius: 16, height: 54, justifyContent: 'center', marginRight: 14, width: 54 }, body: { flex: 1 }, title: { fontWeight: '800' }, duration: { alignItems: 'baseline', flexDirection: 'row', marginTop: 7 }, value: { color: '#313C9D', fontWeight: '800' }, goal: { color: '#77727E', marginLeft: 8 }, track: { backgroundColor: '#E4E6F6', borderRadius: 99, height: 9, marginTop: 10, overflow: 'hidden' }, fill: { backgroundColor: '#4D5BD5', borderRadius: 99, height: '100%' } });

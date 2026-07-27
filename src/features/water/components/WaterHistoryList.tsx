import { StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Divider, Text } from 'react-native-paper';

import type { WaterEntry } from '../types';

interface WaterHistoryListProps { entries: WaterEntry[]; }

export function WaterHistoryList({ entries }: WaterHistoryListProps) {
  if (!entries.length) return <Text style={styles.empty}>Your saved hydration history will appear here.</Text>;
  return <View>{entries.map((entry, index) => <Animated.View key={entry.id} entering={FadeInUp.delay(index * 45).springify()}><View style={styles.row}><View><Text variant="titleSmall">{entry.dateKey}</Text><Text variant="bodySmall" style={styles.goal}>Goal: {entry.goalMl.toLocaleString()} ml</Text></View><Text variant="titleSmall" style={styles.amount}>{entry.amountMl.toLocaleString()} ml</Text></View>{index < entries.length - 1 ? <Divider /> : null}</Animated.View>)}</View>;
}
const styles = StyleSheet.create({ row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }, goal: { color: '#77727E', marginTop: 3 }, amount: { color: '#2D9CDB', fontWeight: '800' }, empty: { color: '#77727E', paddingVertical: 16, textAlign: 'center' } });

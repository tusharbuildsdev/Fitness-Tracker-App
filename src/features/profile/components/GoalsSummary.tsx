import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import type { UserGoals } from '../types';

export function GoalsSummary({ goals }: { goals: UserGoals }) {
  const items = [['Steps', goals.steps.toLocaleString()], ['Calories', `${goals.calories} kcal`], ['Water', `${goals.waterMl / 1000} L`], ['Sleep', `${goals.sleepHours} h`]];
  return <Surface elevation={1} style={styles.card}><Text variant="titleMedium" style={styles.title}>Daily goals</Text><View style={styles.grid}>{items.map(([label, value]) => <View key={label} style={styles.goal}><Text variant="titleSmall" style={styles.value}>{value}</Text><Text variant="bodySmall" style={styles.label}>{label}</Text></View>)}</View></Surface>;
}
const styles = StyleSheet.create({ card: { borderRadius: 24, marginTop: 20, padding: 18 }, title: { fontWeight: '800' }, grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14 }, goal: { marginBottom: 14, width: '50%' }, value: { color: '#7357FF', fontWeight: '800' }, label: { color: '#77727E', marginTop: 2 } });

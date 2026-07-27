import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ActivityIndicator, SegmentedButtons, Surface, Text } from 'react-native-paper';

import { auth } from '../../../app/config/firebase';
import { AnalyticsTrendChart } from '../components/AnalyticsTrendChart';
import { ProgressComparisonCard } from '../components/ProgressComparisonCard';
import { useAnalytics } from '../hooks/useAnalytics';
import type { AnalyticsPeriod, AnalyticsStackParamList } from '../types';

type Props = NativeStackScreenProps<AnalyticsStackParamList, 'Analytics'>;

export function AnalyticsScreen({ navigation }: Props) {
  const [period, setPeriod] = useState<AnalyticsPeriod>('week');
  const { data, comparisons, isLoading, error, reload } = useAnalytics(auth.currentUser?.uid, period);
  useLayoutEffect(() => { navigation.setOptions({ title: 'Analytics' }); }, [navigation]);
  const total = (key: 'steps' | 'calories' | 'workoutMinutes' | 'waterMl' | 'sleepMinutes') => data.days.reduce((sum, day) => sum + day[key], 0);
  if (isLoading && !data.days.length) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  return <ScrollView style={styles.container} contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => void reload()} />}><Animated.View entering={FadeInDown.springify()}><Text variant="headlineSmall" style={styles.heading}>Your progress</Text><Text variant="bodyMedium" style={styles.subheading}>See how your habits are adding up.</Text><SegmentedButtons value={period} onValueChange={(value) => setPeriod(value as AnalyticsPeriod)} buttons={[{ value: 'week', label: 'Weekly' }, { value: 'month', label: 'Monthly' }]} style={styles.segmented} /></Animated.View><Surface elevation={1} style={styles.hero}><Text variant="labelLarge" style={styles.heroLabel}>{period === 'week' ? 'THIS WEEK' : 'THIS MONTH'}</Text><Text variant="headlineMedium" style={styles.heroValue}>{total('workoutMinutes')} min</Text><Text style={styles.heroSubtitle}>of intentional movement</Text><View style={styles.heroStats}><HeroStat value={Math.round(total('steps')).toString()} label="Steps" /><HeroStat value={`${(total('sleepMinutes') / 60).toFixed(1)}h`} label="Sleep" /><HeroStat value={`${Math.round(total('waterMl') / 1000)}L`} label="Water" /></View></Surface><Text variant="titleMedium" style={styles.sectionTitle}>Compare progress</Text><View style={styles.comparisons}>{comparisons.map((comparison, index) => <ProgressComparisonCard comparison={comparison} index={index} key={comparison.label} />)}</View><AnalyticsTrendChart title="Steps" color="#7357FF" unit="steps" days={data.days} valueKey="steps" /><AnalyticsTrendChart title="Calories consumed" color="#F26A4B" unit="kcal" days={data.days} valueKey="calories" /><AnalyticsTrendChart title="Workout duration" color="#2D9B70" unit="min" days={data.days} valueKey="workoutMinutes" /><AnalyticsTrendChart title="Water intake" color="#2D9CDB" unit="ml" days={data.days} valueKey="waterMl" /><AnalyticsTrendChart title="Sleep duration" color="#4D5BD5" unit="min" days={data.days} valueKey="sleepMinutes" />{error ? <Text style={styles.error}>{error}</Text> : null}</ScrollView>;
}
function HeroStat({ value, label }: { value: string; label: string }) { return <View><Text variant="titleMedium" style={styles.statValue}>{value}</Text><Text variant="labelSmall" style={styles.statLabel}>{label}</Text></View>; }
const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20, paddingBottom: 36 }, center: { alignItems: 'center', flex: 1, justifyContent: 'center' }, heading: { fontWeight: '800' }, subheading: { color: '#77727E', marginTop: 4 }, segmented: { marginTop: 18 }, hero: { backgroundColor: '#433795', borderRadius: 26, marginTop: 18, overflow: 'hidden', padding: 22 }, heroLabel: { color: '#D7D2FF', letterSpacing: 1 }, heroValue: { color: '#FFFFFF', fontWeight: '800', marginTop: 7 }, heroSubtitle: { color: '#D7D2FF', marginTop: 2 }, heroStats: { borderTopColor: '#675DC3', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingTop: 15 }, statValue: { color: '#FFFFFF', fontWeight: '800' }, statLabel: { color: '#D7D2FF', marginTop: 2 }, sectionTitle: { fontWeight: '800', marginBottom: 10, marginTop: 24 }, comparisons: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, error: { color: '#B3261E', marginTop: 16, textAlign: 'center' } });

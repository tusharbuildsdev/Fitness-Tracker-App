import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useLayoutEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ActivityIndicator, Button, Divider, HelperText, Surface, Text, TextInput } from 'react-native-paper';

import { auth } from '../../../app/config/firebase';
import { CaloriesHistoryChart } from '../components/CaloriesHistoryChart';
import { CaloriesSummaryCard } from '../components/CaloriesSummaryCard';
import { useCalories } from '../hooks/useCalories';
import { caloriesSchema, type CaloriesFormValues } from '../schemas/caloriesSchema';
import type { CalorieEntry, CaloriesStackParamList } from '../types';
import { getLocalDateKey } from '../../../utils/date';

type Props = NativeStackScreenProps<CaloriesStackParamList, 'CaloriesTracker'>;
const todayKey = getLocalDateKey();

export function CaloriesTrackerScreen({ navigation }: Props) {
  const { history, today, isLoading, error, save } = useCalories(auth.currentUser?.uid);
  const [isSaving, setIsSaving] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<CaloriesFormValues>({ resolver: zodResolver(caloriesSchema) as never, values: { consumed: today?.consumed ?? 0, goal: today?.goal ?? 2_000 } });
  useLayoutEffect(() => { navigation.setOptions({ title: 'Calories tracker' }); }, [navigation]);
  const onSave = async (values: CaloriesFormValues) => { setIsSaving(true); try { await save({ ...values, dateKey: todayKey }); Alert.alert('Calories updated', 'Your daily total is synced.'); reset(values); } catch (saveError) { Alert.alert('Could not save calories', saveError instanceof Error ? saveError.message : 'Try again shortly.'); } finally { setIsSaving(false); } };
  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  return <FlatList data={history} keyExtractor={(item) => item.id} style={styles.container} contentContainerStyle={styles.content} ListHeaderComponent={<><Animated.View entering={FadeInUp.springify()}><CaloriesSummaryCard consumed={today?.consumed ?? 0} goal={today?.goal ?? 2_000} /></Animated.View><Animated.View entering={FadeInUp.delay(80).springify()}><Surface elevation={1} style={styles.formCard}><Text variant="titleMedium" style={styles.formTitle}>Daily entry</Text><Controller control={control} name="consumed" render={({ field: { value, onChange } }) => <TextInput label="Calories consumed" mode="outlined" keyboardType="number-pad" value={String(value ?? '')} onChangeText={onChange} error={Boolean(errors.consumed)} />} /><HelperText type="error" visible={Boolean(errors.consumed)}>{errors.consumed?.message}</HelperText><Controller control={control} name="goal" render={({ field: { value, onChange } }) => <TextInput label="Daily calorie goal" mode="outlined" keyboardType="number-pad" value={String(value ?? '')} onChangeText={onChange} error={Boolean(errors.goal)} />} /><HelperText type="error" visible={Boolean(errors.goal)}>{errors.goal?.message}</HelperText><Button mode="contained" loading={isSaving} disabled={isSaving} onPress={handleSubmit(onSave)} style={styles.button} contentStyle={styles.buttonContent}>Save daily total</Button></Surface></Animated.View><CaloriesHistoryChart entries={history} /><Text variant="titleMedium" style={styles.historyTitle}>History</Text>{error ? <Text style={styles.error}>{error}</Text> : null}</>} renderItem={({ item, index }) => <HistoryRow item={item} index={index} />} ItemSeparatorComponent={Divider} />;
}
function HistoryRow({ item, index }: { item: CalorieEntry; index: number }) { const remaining = item.goal - item.consumed; return <Animated.View entering={FadeInUp.delay(index * 45).springify()} style={styles.historyRow}><View><Text variant="titleSmall">{item.dateKey}</Text><Text variant="bodySmall" style={styles.historyGoal}>{remaining >= 0 ? `${remaining.toLocaleString()} kcal remaining` : `${Math.abs(remaining).toLocaleString()} kcal over`}</Text></View><Text variant="titleSmall" style={styles.historyCount}>{item.consumed.toLocaleString()} kcal</Text></Animated.View>; }
const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20, paddingBottom: 36 }, center: { alignItems: 'center', flex: 1, justifyContent: 'center' }, formCard: { borderRadius: 24, marginTop: 16, padding: 20 }, formTitle: { fontWeight: '800', marginBottom: 16 }, button: { borderRadius: 16, marginTop: 10 }, buttonContent: { minHeight: 52 }, historyTitle: { fontWeight: '800', marginBottom: 10, marginTop: 24 }, historyRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }, historyGoal: { color: '#77727E', marginTop: 3 }, historyCount: { color: '#F26A4B', fontWeight: '800' }, error: { color: '#B3261E', marginTop: 8 } });

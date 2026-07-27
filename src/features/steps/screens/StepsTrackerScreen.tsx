import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { useLayoutEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ActivityIndicator, Button, Divider, HelperText, Surface, Text, TextInput } from 'react-native-paper';

import { auth } from '../../../app/config/firebase';
import { StepsHistoryChart } from '../components/StepsHistoryChart';
import { StepsProgressCard } from '../components/StepsProgressCard';
import { useSteps } from '../hooks/useSteps';
import { stepsSchema, type StepsFormValues } from '../schemas/stepsSchema';
import type { StepEntry, StepsStackParamList } from '../types';
import { getLocalDateKey } from '../../../utils/date';

type Props = NativeStackScreenProps<StepsStackParamList, 'StepsTracker'>;
const todayKey = getLocalDateKey();

export function StepsTrackerScreen({ navigation }: Props) {
  const { history, today, isLoading, error, save } = useSteps(auth.currentUser?.uid);
  const [isSaving, setIsSaving] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<StepsFormValues>({ resolver: zodResolver(stepsSchema) as never, values: { count: today?.count ?? 0, goal: today?.goal ?? 10_000 } });
  useLayoutEffect(() => { navigation.setOptions({ title: 'Steps tracker' }); }, [navigation]);

  const onSave = async (values: StepsFormValues) => { setIsSaving(true); try { await save({ ...values, dateKey: todayKey }); Alert.alert('Steps updated', 'Your progress is synced.'); reset(values); } catch (saveError) { Alert.alert('Could not save steps', saveError instanceof Error ? saveError.message : 'Try again shortly.'); } finally { setIsSaving(false); } };
  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return <FlatList data={history} keyExtractor={(item) => item.id} style={styles.container} contentContainerStyle={styles.content} ListHeaderComponent={<><Animated.View entering={FadeInUp.springify()}><StepsProgressCard count={today?.count ?? 0} goal={today?.goal ?? 10_000} /></Animated.View><Animated.View entering={FadeInUp.delay(80).springify()}><Surface elevation={1} style={styles.formCard}><Text variant="titleMedium" style={styles.formTitle}>Manual entry</Text><Controller control={control} name="count" render={({ field: { value, onChange } }) => <TextInput label="Today’s steps" mode="outlined" keyboardType="number-pad" value={String(value ?? '')} onChangeText={onChange} error={Boolean(errors.count)} />} /><HelperText type="error" visible={Boolean(errors.count)}>{errors.count?.message}</HelperText><Controller control={control} name="goal" render={({ field: { value, onChange } }) => <TextInput label="Daily goal" mode="outlined" keyboardType="number-pad" value={String(value ?? '')} onChangeText={onChange} error={Boolean(errors.goal)} />} /><HelperText type="error" visible={Boolean(errors.goal)}>{errors.goal?.message}</HelperText><Button mode="contained" loading={isSaving} disabled={isSaving} onPress={handleSubmit(onSave)} style={styles.button} contentStyle={styles.buttonContent}>Save today’s steps</Button></Surface></Animated.View><StepsHistoryChart entries={history} /><Text variant="titleMedium" style={styles.historyTitle}>History</Text>{error ? <Text style={styles.error}>{error}</Text> : null}</>} renderItem={({ item, index }) => <HistoryRow item={item} index={index} />} ItemSeparatorComponent={Divider} ListEmptyComponent={null} />;
}

function HistoryRow({ item, index }: { item: StepEntry; index: number }) { return <Animated.View entering={FadeInUp.delay(index * 45).springify()} style={styles.historyRow}><View><Text variant="titleSmall">{item.dateKey}</Text><Text variant="bodySmall" style={styles.historyGoal}>Goal: {item.goal.toLocaleString()}</Text></View><Text variant="titleSmall" style={styles.historyCount}>{item.count.toLocaleString()} steps</Text></Animated.View>; }
const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20, paddingBottom: 36 }, center: { alignItems: 'center', flex: 1, justifyContent: 'center' }, formCard: { borderRadius: 24, marginTop: 16, padding: 20 }, formTitle: { fontWeight: '800', marginBottom: 16 }, button: { borderRadius: 16, marginTop: 10 }, buttonContent: { minHeight: 52 }, historyTitle: { fontWeight: '800', marginBottom: 10, marginTop: 24 }, historyRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }, historyGoal: { color: '#77727E', marginTop: 3 }, historyCount: { color: '#7357FF', fontWeight: '800' }, error: { color: '#B3261E', marginTop: 8 } });

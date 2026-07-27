import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Divider, HelperText, Surface, Text, TextInput } from 'react-native-paper';

import { auth } from '../../../app/config/firebase';
import { SleepDurationCard } from '../components/SleepDurationCard';
import { SleepWeeklyChart } from '../components/SleepWeeklyChart';
import { useSleep } from '../hooks/useSleep';
import { parseSleepDateTime, sleepSchema, type SleepFormValues } from '../schemas/sleepSchema';
import type { SleepEntry, SleepStackParamList } from '../types';

type Props = NativeStackScreenProps<SleepStackParamList, 'SleepTracker'>;
const formatForInput = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
const initialEnd = new Date();
const initialStart = new Date(initialEnd.valueOf() - 8 * 60 * 60 * 1000);

export function SleepTrackerScreen({ navigation }: Props) {
  const { history, today, isLoading, error, save } = useSleep(auth.currentUser?.uid);
  const [isSaving, setIsSaving] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<SleepFormValues>({ resolver: zodResolver(sleepSchema), defaultValues: { sleepStart: formatForInput(initialStart), sleepEnd: formatForInput(initialEnd) } });
  useLayoutEffect(() => { navigation.setOptions({ title: 'Sleep tracker' }); }, [navigation]);
  const onSave = async (values: SleepFormValues) => { setIsSaving(true); try { await save({ startAt: parseSleepDateTime(values.sleepStart), endAt: parseSleepDateTime(values.sleepEnd) }); Alert.alert('Sleep saved', 'Your sleep duration is synced.'); } catch (saveError) { Alert.alert('Could not save sleep', saveError instanceof Error ? saveError.message : 'Try again shortly.'); } finally { setIsSaving(false); } };
  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  return <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><SleepDurationCard durationMinutes={today?.durationMinutes ?? 0} /><Surface elevation={1} style={styles.formCard}><Text variant="titleMedium" style={styles.title}>Sleep session</Text><Text variant="bodySmall" style={styles.hint}>Use 24-hour time: YYYY-MM-DD HH:mm</Text><Controller control={control} name="sleepStart" render={({ field: { value, onChange } }) => <TextInput label="Sleep start" mode="outlined" value={value} onChangeText={onChange} error={Boolean(errors.sleepStart)} />} /><HelperText type="error" visible={Boolean(errors.sleepStart)}>{errors.sleepStart?.message}</HelperText><Controller control={control} name="sleepEnd" render={({ field: { value, onChange } }) => <TextInput label="Sleep end" mode="outlined" value={value} onChangeText={onChange} error={Boolean(errors.sleepEnd)} />} /><HelperText type="error" visible={Boolean(errors.sleepEnd)}>{errors.sleepEnd?.message}</HelperText><Button mode="contained" style={styles.button} contentStyle={styles.buttonContent} loading={isSaving} disabled={isSaving} onPress={handleSubmit(onSave)}>Save sleep</Button></Surface><SleepWeeklyChart entries={history} /><Text variant="titleMedium" style={styles.historyTitle}>History</Text>{error ? <Text style={styles.error}>{error}</Text> : null}{history.map((entry) => <HistoryRow key={entry.id} entry={entry} />)}</ScrollView>;
}
function HistoryRow({ entry }: { entry: SleepEntry }) { const hours = Math.floor(entry.durationMinutes / 60); const minutes = entry.durationMinutes % 60; return <><View style={styles.row}><Text variant="titleSmall">{entry.dateKey}</Text><Text variant="titleSmall" style={styles.rowValue}>{hours}h {minutes}m</Text></View><Divider /></>; }
const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20, paddingBottom: 36 }, center: { alignItems: 'center', flex: 1, justifyContent: 'center' }, formCard: { borderRadius: 24, marginTop: 16, padding: 20 }, title: { fontWeight: '800' }, hint: { color: '#77727E', marginBottom: 14, marginTop: 4 }, button: { borderRadius: 16, marginTop: 10 }, buttonContent: { minHeight: 52 }, historyTitle: { fontWeight: '800', marginTop: 24 }, row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }, rowValue: { color: '#4D5BD5', fontWeight: '800' }, error: { color: '#B3261E', marginTop: 8 } });

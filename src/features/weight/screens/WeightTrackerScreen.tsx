import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Divider, HelperText, Surface, Text, TextInput } from 'react-native-paper';

import { auth } from '../../../app/config/firebase';
import { MonthlyWeightChart } from '../components/MonthlyWeightChart';
import { WeeklyProgressCard } from '../components/WeeklyProgressCard';
import { useWeight } from '../hooks/useWeight';
import { weightSchema, type WeightFormValues } from '../schemas/weightSchema';
import type { WeightEntry, WeightStackParamList } from '../types';
import { getLocalDateKey } from '../../../utils/date';

type Props = NativeStackScreenProps<WeightStackParamList, 'WeightTracker'>;
const todayKey = getLocalDateKey();

export function WeightTrackerScreen({ navigation }: Props) {
  const { history, latest, weeklyChange, isLoading, error, save } = useWeight(auth.currentUser?.uid);
  const [isSaving, setIsSaving] = useState(false);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<WeightFormValues>({ resolver: zodResolver(weightSchema) as never, defaultValues: { weightKg: latest?.weightKg, dateKey: todayKey } });
  useLayoutEffect(() => { navigation.setOptions({ title: 'Weight tracker' }); }, [navigation]);
  const onSave = async (values: WeightFormValues) => { setIsSaving(true); try { await save(values); Alert.alert('Weight saved', 'Your progress is synced.'); reset({ ...values }); } catch (saveError) { Alert.alert('Could not save weight', saveError instanceof Error ? saveError.message : 'Try again shortly.'); } finally { setIsSaving(false); } };
  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  return <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><WeeklyProgressCard weightKg={latest?.weightKg} weeklyChange={weeklyChange} /><Surface elevation={1} style={styles.formCard}><Text variant="titleMedium" style={styles.title}>Add weight</Text><Controller control={control} name="weightKg" render={({ field: { value, onChange } }) => <TextInput label="Weight (kg)" mode="outlined" keyboardType="decimal-pad" value={value?.toString() ?? ''} onChangeText={onChange} error={Boolean(errors.weightKg)} />} /><HelperText type="error" visible={Boolean(errors.weightKg)}>{errors.weightKg?.message}</HelperText><Controller control={control} name="dateKey" render={({ field: { value, onChange } }) => <TextInput label="Date (YYYY-MM-DD)" mode="outlined" value={value} onChangeText={onChange} error={Boolean(errors.dateKey)} />} /><HelperText type="error" visible={Boolean(errors.dateKey)}>{errors.dateKey?.message}</HelperText><Button mode="contained" style={styles.button} contentStyle={styles.buttonContent} loading={isSaving} disabled={isSaving} onPress={handleSubmit(onSave)}>Save weight</Button></Surface><MonthlyWeightChart entries={history} /><Text variant="titleMedium" style={styles.historyTitle}>Recent entries</Text>{error ? <Text style={styles.error}>{error}</Text> : null}{history.map((entry) => <HistoryRow entry={entry} key={entry.id} />)}</ScrollView>;
}
function HistoryRow({ entry }: { entry: WeightEntry }) { return <><View style={styles.row}><Text variant="titleSmall">{entry.dateKey}</Text><Text variant="titleSmall" style={styles.rowValue}>{entry.weightKg.toFixed(1)} kg</Text></View><Divider /></>; }
const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20, paddingBottom: 36 }, center: { alignItems: 'center', flex: 1, justifyContent: 'center' }, formCard: { borderRadius: 24, marginTop: 16, padding: 20 }, title: { fontWeight: '800', marginBottom: 16 }, button: { borderRadius: 16, marginTop: 10 }, buttonContent: { minHeight: 52 }, historyTitle: { fontWeight: '800', marginTop: 24 }, row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15 }, rowValue: { color: '#2D9B70', fontWeight: '800' }, error: { color: '#B3261E', marginTop: 8 } });

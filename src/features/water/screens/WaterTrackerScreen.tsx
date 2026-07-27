import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Chip, HelperText, Surface, Text, TextInput } from 'react-native-paper';

import { auth } from '../../../app/config/firebase';
import { WaterHistoryList } from '../components/WaterHistoryList';
import { WaterProgressRing } from '../components/WaterProgressRing';
import { useWater } from '../hooks/useWater';
import { waterSchema, type WaterFormValues } from '../schemas/waterSchema';
import type { WaterStackParamList } from '../types';
import { getLocalDateKey } from '../../../utils/date';

type Props = NativeStackScreenProps<WaterStackParamList, 'WaterTracker'>;
const todayKey = getLocalDateKey();
const quickAmounts = [250, 500, 750];

export function WaterTrackerScreen({ navigation }: Props) {
  const { history, today, isLoading, error, save } = useWater(auth.currentUser?.uid);
  const [isSaving, setIsSaving] = useState(false);
  const { control, handleSubmit, formState: { errors }, getValues, reset, setValue } = useForm<WaterFormValues>({ resolver: zodResolver(waterSchema) as never, values: { amountMl: today?.amountMl ?? 0, goalMl: today?.goalMl ?? 2_500 } });
  useLayoutEffect(() => { navigation.setOptions({ title: 'Water tracker' }); }, [navigation]);
  const persist = async (values: WaterFormValues) => { setIsSaving(true); try { await save({ ...values, dateKey: todayKey }); reset(values); } catch (saveError) { Alert.alert('Could not save water intake', saveError instanceof Error ? saveError.message : 'Try again shortly.'); } finally { setIsSaving(false); } };
  const quickAdd = (amount: number) => { const values = getValues(); const next = { ...values, amountMl: values.amountMl + amount }; setValue('amountMl', next.amountMl); void persist(next); };
  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  return <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><WaterProgressRing amountMl={today?.amountMl ?? 0} goalMl={today?.goalMl ?? 2_500} /><Surface elevation={1} style={styles.formCard}><Text variant="titleMedium" style={styles.title}>Add water</Text><View style={styles.chips}>{quickAmounts.map((amount) => <Chip key={amount} icon="plus" onPress={() => quickAdd(amount)} disabled={isSaving}>{amount} ml</Chip>)}</View><Controller control={control} name="amountMl" render={({ field: { value, onChange } }) => <TextInput label="Today’s total (ml)" mode="outlined" keyboardType="number-pad" value={String(value ?? '')} onChangeText={onChange} error={Boolean(errors.amountMl)} />} /><HelperText type="error" visible={Boolean(errors.amountMl)}>{errors.amountMl?.message}</HelperText><Controller control={control} name="goalMl" render={({ field: { value, onChange } }) => <TextInput label="Daily water goal (ml)" mode="outlined" keyboardType="number-pad" value={String(value ?? '')} onChangeText={onChange} error={Boolean(errors.goalMl)} />} /><HelperText type="error" visible={Boolean(errors.goalMl)}>{errors.goalMl?.message}</HelperText><Button mode="contained" style={styles.button} contentStyle={styles.buttonContent} loading={isSaving} disabled={isSaving} onPress={handleSubmit(persist)}>Save water intake</Button></Surface><Text variant="titleMedium" style={styles.historyTitle}>History</Text>{error ? <Text style={styles.error}>{error}</Text> : null}<WaterHistoryList entries={history} /></ScrollView>;
}
const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20, paddingBottom: 36 }, center: { alignItems: 'center', flex: 1, justifyContent: 'center' }, formCard: { borderRadius: 24, marginTop: 16, padding: 20 }, title: { fontWeight: '800', marginBottom: 14 }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 }, button: { borderRadius: 16, marginTop: 10 }, buttonContent: { minHeight: 52 }, historyTitle: { fontWeight: '800', marginTop: 24 }, error: { color: '#B3261E', marginTop: 8 } });

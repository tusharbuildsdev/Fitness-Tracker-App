import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Menu, Text, TextInput } from 'react-native-paper';

import { workoutSchema, type WorkoutFormValues } from '../schemas/workoutSchema';
import { WORKOUT_TYPES, type Workout } from '../types';
import { getLocalDateKey } from '../../../utils/date';

interface WorkoutFormProps {
  initialWorkout?: Workout;
  isSubmitting: boolean;
  onSubmit: (values: WorkoutFormValues) => Promise<void>;
}

const todayKey = getLocalDateKey();

export function WorkoutForm({ initialWorkout, isSubmitting, onSubmit }: WorkoutFormProps) {
  const [isTypeMenuVisible, setIsTypeMenuVisible] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      type: initialWorkout?.type ?? 'Strength Training',
      durationMinutes: initialWorkout?.durationMinutes ?? undefined,
      caloriesBurned: initialWorkout?.caloriesBurned ?? undefined,
      notes: initialWorkout?.notes ?? '',
      dateKey: initialWorkout?.dateKey ?? todayKey,
    },
  });

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange } }) => (
          <Menu
            visible={isTypeMenuVisible}
            onDismiss={() => setIsTypeMenuVisible(false)}
            anchor={<TextInput label="Workout type" mode="outlined" value={value} editable={false} onPressIn={() => setIsTypeMenuVisible(true)} right={<TextInput.Icon icon="chevron-down" onPress={() => setIsTypeMenuVisible(true)} />} />}
          >
            {WORKOUT_TYPES.map((type) => <Menu.Item key={type} title={type} onPress={() => { onChange(type); setIsTypeMenuVisible(false); }} />)}
          </Menu>
        )}
      />
      <HelperText type="error" visible={Boolean(errors.type)}>{errors.type?.message}</HelperText>
      <Controller control={control} name="durationMinutes" render={({ field: { value, onChange } }) => (
        <TextInput label="Duration (minutes)" mode="outlined" keyboardType="number-pad" value={value?.toString() ?? ''} onChangeText={(text) => onChange(Number(text))} error={Boolean(errors.durationMinutes)} />
      )} />
      <HelperText type="error" visible={Boolean(errors.durationMinutes)}>{errors.durationMinutes?.message}</HelperText>
      <Controller control={control} name="caloriesBurned" render={({ field: { value, onChange } }) => (
        <TextInput label="Calories burned" mode="outlined" keyboardType="number-pad" value={value?.toString() ?? ''} onChangeText={(text) => onChange(Number(text))} error={Boolean(errors.caloriesBurned)} />
      )} />
      <HelperText type="error" visible={Boolean(errors.caloriesBurned)}>{errors.caloriesBurned?.message}</HelperText>
      <Controller control={control} name="dateKey" render={({ field: { value, onChange } }) => (
        <TextInput label="Date (YYYY-MM-DD)" mode="outlined" value={value} onChangeText={onChange} error={Boolean(errors.dateKey)} />
      )} />
      <HelperText type="error" visible={Boolean(errors.dateKey)}>{errors.dateKey?.message}</HelperText>
      <Controller control={control} name="notes" render={({ field: { value, onChange } }) => (
        <TextInput label="Notes (optional)" mode="outlined" multiline numberOfLines={4} value={value} onChangeText={onChange} error={Boolean(errors.notes)} />
      )} />
      <HelperText type="error" visible={Boolean(errors.notes)}>{errors.notes?.message}</HelperText>
      <Button mode="contained" style={styles.submit} contentStyle={styles.submitContent} loading={isSubmitting} disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        {initialWorkout ? 'Save changes' : 'Add workout'}
      </Button>
      <Text variant="bodySmall" style={styles.hint}>Your workout is saved securely to your FitTrack Pro account.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 2 },
  submit: { borderRadius: 16, marginTop: 16 },
  submitContent: { minHeight: 54 },
  hint: { color: '#77727E', marginTop: 12, textAlign: 'center' },
});

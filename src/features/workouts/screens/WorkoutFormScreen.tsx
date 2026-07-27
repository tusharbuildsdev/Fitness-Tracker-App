import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { auth } from '../../../app/config/firebase';
import { WorkoutForm } from '../components/WorkoutForm';
import type { WorkoutFormValues } from '../schemas/workoutSchema';
import { addWorkout, updateWorkout } from '../services/workoutService';
import type { WorkoutStackParamList } from '../types';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'AddWorkout' | 'EditWorkout'>;

export function WorkoutFormScreen({ navigation, route }: Props) {
  const workout = route.params && 'workout' in route.params ? route.params.workout : undefined;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: workout ? 'Edit workout' : 'Add workout' });
  }, [navigation, workout]);

  const handleSubmit = async (values: WorkoutFormValues) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      Alert.alert('Sign in required', 'Please sign in before saving a workout.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (workout) await updateWorkout(workout.id, values);
      else await addWorkout(userId, values);
      navigation.goBack();
    } catch {
      Alert.alert('Could not save workout', 'Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><WorkoutForm initialWorkout={workout} isSubmitting={isSubmitting} onSubmit={handleSubmit} /></ScrollView></KeyboardAvoidingView>;
}

const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20 } });

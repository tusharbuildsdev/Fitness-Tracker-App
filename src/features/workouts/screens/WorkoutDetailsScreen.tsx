import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ActivityIndicator, Button, Surface, Text } from 'react-native-paper';

import { getWorkoutById } from '../services/workoutService';
import { useWorkouts } from '../hooks/useWorkouts';
import { auth } from '../../../app/config/firebase';
import type { Workout, WorkoutStackParamList } from '../types';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutDetails'>;

export function WorkoutDetailsScreen({ navigation, route }: Props) {
  const { workouts, removeWorkout } = useWorkouts(auth.currentUser?.uid);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => { navigation.setOptions({ title: 'Workout details' }); }, [navigation]);
  useEffect(() => {
    const existing = workouts.find((item) => item.id === route.params.workoutId);
    if (existing) { setWorkout(existing); setIsLoading(false); return; }
    getWorkoutById(route.params.workoutId).then(setWorkout).finally(() => setIsLoading(false));
  }, [route.params.workoutId, workouts]);

  const confirmDelete = () => Alert.alert('Delete workout?', 'This action cannot be undone.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: async () => { await removeWorkout(route.params.workoutId); navigation.goBack(); } },
  ]);

  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!workout) return <View style={styles.center}><Text>Workout not found.</Text></View>;

  return <ScrollView style={styles.container} contentContainerStyle={styles.content}><Animated.View entering={FadeInUp.springify()}><Surface elevation={1} style={styles.hero}><View style={styles.heroIcon}><Feather name="activity" size={30} color="#7357FF" /></View><Text variant="headlineSmall" style={styles.title}>{workout.type}</Text><Text style={styles.date}>{workout.dateKey}</Text></Surface><View style={styles.metrics}><Metric icon="clock" value={`${workout.durationMinutes} min`} label="Duration" /><Metric icon="zap" value={`${workout.caloriesBurned}`} label="Calories" /></View>{workout.notes ? <Surface elevation={1} style={styles.notes}><Text variant="titleSmall">Notes</Text><Text style={styles.noteText}>{workout.notes}</Text></Surface> : null}<Button mode="contained" icon="pencil" style={styles.edit} onPress={() => navigation.navigate('EditWorkout', { workout })}>Edit workout</Button><Button mode="text" textColor="#C53D3D" icon="delete-outline" onPress={confirmDelete}>Delete workout</Button></Animated.View></ScrollView>;
}

function Metric({ icon, value, label }: { icon: keyof typeof Feather.glyphMap; value: string; label: string }) { return <Surface elevation={1} style={styles.metric}><Feather name={icon} color="#7357FF" size={20} /><Text variant="titleMedium" style={styles.metricValue}>{value}</Text><Text variant="bodySmall" style={styles.metricLabel}>{label}</Text></Surface>; }
const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20 }, center: { alignItems: 'center', flex: 1, justifyContent: 'center' }, hero: { alignItems: 'center', borderRadius: 24, padding: 28 }, heroIcon: { alignItems: 'center', backgroundColor: '#F0EDFF', borderRadius: 20, height: 64, justifyContent: 'center', width: 64 }, title: { fontWeight: '800', marginTop: 12 }, date: { color: '#77727E', marginTop: 4 }, metrics: { flexDirection: 'row', gap: 12, marginTop: 16 }, metric: { alignItems: 'center', borderRadius: 20, flex: 1, padding: 18 }, metricValue: { fontWeight: '800', marginTop: 8 }, metricLabel: { color: '#77727E', marginTop: 2 }, notes: { borderRadius: 20, marginTop: 16, padding: 18 }, noteText: { color: '#58535F', lineHeight: 21, marginTop: 8 }, edit: { borderRadius: 16, marginTop: 24, paddingVertical: 5 } });

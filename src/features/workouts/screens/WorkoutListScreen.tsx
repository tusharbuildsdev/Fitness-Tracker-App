import { Feather } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, FAB, Text } from 'react-native-paper';

import { auth } from '../../../app/config/firebase';
import { WorkoutCard } from '../components/WorkoutCard';
import { useWorkouts } from '../hooks/useWorkouts';
import type { WorkoutStackParamList } from '../types';

type Props = NativeStackScreenProps<WorkoutStackParamList, 'WorkoutList'>;

export function WorkoutListScreen({ navigation }: Props) {
  const { workouts, isLoading, error } = useWorkouts(auth.currentUser?.uid);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Workouts' });
  }, [navigation]);

  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={workouts.length ? styles.list : styles.emptyList}
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <WorkoutCard workout={item} index={index} onPress={() => navigation.navigate('WorkoutDetails', { workoutId: item.id })} />}
        ListEmptyComponent={<View style={styles.empty}><Feather name="activity" size={34} color="#7357FF" /><Text variant="titleMedium" style={styles.emptyTitle}>{error ? 'Unable to load workouts' : 'No workouts yet'}</Text><Text style={styles.emptyText}>{error ?? 'Add your first workout and build your streak.'}</Text></View>}
      />
      <FAB icon="plus" label="Add workout" style={styles.fab} onPress={() => navigation.navigate('AddWorkout')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FAF9FF', flex: 1 },
  center: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  list: { padding: 20, paddingBottom: 100 },
  emptyList: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  empty: { alignItems: 'center' },
  emptyTitle: { fontWeight: '700', marginTop: 12 },
  emptyText: { color: '#77727E', marginTop: 5, textAlign: 'center' },
  fab: { bottom: 24, position: 'absolute', right: 20 },
});

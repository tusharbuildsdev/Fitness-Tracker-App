import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Surface, Text } from 'react-native-paper';

import type { Workout } from '../types';

interface WorkoutCardProps {
  workout: Workout;
  index: number;
  onPress: () => void;
}

export function WorkoutCard({ workout, index, onPress }: WorkoutCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 55).springify()}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`View ${workout.type} workout`}>
        <Surface elevation={1} style={styles.card}>
          <View style={styles.iconWrap}>
            <Feather name="activity" size={21} color="#7357FF" />
          </View>
          <View style={styles.details}>
            <Text variant="titleMedium" style={styles.type}>{workout.type}</Text>
            <Text variant="bodySmall" style={styles.date}>{workout.dateKey}</Text>
          </View>
          <View style={styles.stats}>
            <Text variant="titleSmall">{workout.durationMinutes} min</Text>
            <Text variant="bodySmall" style={styles.calories}>{workout.caloriesBurned} kcal</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#8A8795" />
        </Surface>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', borderRadius: 20, flexDirection: 'row', marginBottom: 12, padding: 16 },
  iconWrap: { alignItems: 'center', backgroundColor: '#F0EDFF', borderRadius: 14, height: 48, justifyContent: 'center', width: 48 },
  details: { flex: 1, marginLeft: 12 },
  type: { fontWeight: '700' },
  date: { color: '#77727E', marginTop: 3 },
  stats: { alignItems: 'flex-end', marginRight: 8 },
  calories: { color: '#F06B4F', marginTop: 3 },
});

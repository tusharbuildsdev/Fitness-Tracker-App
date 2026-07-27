import { Feather } from '@expo/vector-icons';
import { NavigationContainer, type Theme as NavigationTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnalyticsScreen } from './src/features/analytics/screens/AnalyticsScreen';
import { CaloriesTrackerScreen } from './src/features/calories/screens/CaloriesTrackerScreen';
import { ProfileScreen } from './src/features/profile/screens/ProfileScreen';
import { AboutScreen } from './src/features/settings/screens/AboutScreen';
import { PrivacyScreen } from './src/features/settings/screens/PrivacyScreen';
import { SettingsScreen } from './src/features/settings/screens/SettingsScreen';
import { AppThemeProvider } from './src/features/settings/context/AppThemeProvider';
import { SettingsProvider } from './src/features/settings/context/SettingsContext';
import { SleepTrackerScreen } from './src/features/sleep/screens/SleepTrackerScreen';
import { StepsTrackerScreen } from './src/features/steps/screens/StepsTrackerScreen';
import { WaterTrackerScreen } from './src/features/water/screens/WaterTrackerScreen';
import { WeightTrackerScreen } from './src/features/weight/screens/WeightTrackerScreen';
import { WorkoutDetailsScreen } from './src/features/workouts/screens/WorkoutDetailsScreen';
import { WorkoutFormScreen } from './src/features/workouts/screens/WorkoutFormScreen';
import { WorkoutListScreen } from './src/features/workouts/screens/WorkoutListScreen';
import type { Workout } from './src/features/workouts/types';

type IconName = ComponentProps<typeof Feather>['name'];

type WorkoutStackParamList = {
  WorkoutList: undefined;
  AddWorkout: undefined;
  EditWorkout: { workout: Workout };
  WorkoutDetails: { workoutId: string };
};

type TrackStackParamList = {
  Trackers: undefined;
  StepsTracker: undefined;
  CaloriesTracker: undefined;
  WaterTracker: undefined;
  SleepTracker: undefined;
  WeightTracker: undefined;
};

type SettingsStackParamList = {
  Settings: undefined;
  Privacy: undefined;
  About: undefined;
};

type RootTabParamList = {
  Workouts: undefined;
  Track: undefined;
  Analytics: undefined;
  Profile: undefined;
  Settings: undefined;
};

const WorkoutStack = createNativeStackNavigator<WorkoutStackParamList>();
const TrackStack = createNativeStackNavigator<TrackStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const navigationTheme: NavigationTheme = {
  dark: false,
  colors: {
    primary: '#7357FF',
    background: '#FAF9FF',
    card: '#FFFFFF',
    text: '#1D1B20',
    border: '#E7E1EC',
    notification: '#7357FF',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },
};

function WorkoutsNavigator() {
  return <WorkoutStack.Navigator><WorkoutStack.Screen name="WorkoutList" component={WorkoutListScreen} /><WorkoutStack.Screen name="AddWorkout" component={WorkoutFormScreen} /><WorkoutStack.Screen name="EditWorkout" component={WorkoutFormScreen} /><WorkoutStack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} /></WorkoutStack.Navigator>;
}

function TrackersScreen({ navigation }: { navigation: import('@react-navigation/native-stack').NativeStackNavigationProp<TrackStackParamList, 'Trackers'> }) {
  const trackers: { name: Exclude<keyof TrackStackParamList, 'Trackers'>; label: string; icon: IconName }[] = [
    { name: 'StepsTracker', label: 'Steps', icon: 'activity' },
    { name: 'CaloriesTracker', label: 'Calories', icon: 'zap' },
    { name: 'WaterTracker', label: 'Water', icon: 'droplet' },
    { name: 'SleepTracker', label: 'Sleep', icon: 'moon' },
    { name: 'WeightTracker', label: 'Weight', icon: 'trending-up' },
  ];
  return <View style={styles.trackers}><Text variant="headlineSmall" style={styles.trackersTitle}>Track your day</Text><Text style={styles.trackersSubtitle}>Choose a habit to log and review.</Text>{trackers.map((tracker) => <Pressable key={tracker.name} onPress={() => navigation.navigate(tracker.name)} style={styles.trackerButton}><Feather name={tracker.icon} color="#7357FF" size={22} /><Text variant="titleMedium" style={styles.trackerLabel}>{tracker.label}</Text><Feather name="chevron-right" color="#77727E" size={22} /></Pressable>)}</View>;
}

function TrackNavigator() {
  return <TrackStack.Navigator><TrackStack.Screen name="Trackers" component={TrackersScreen} options={{ title: 'Tracking' }} /><TrackStack.Screen name="StepsTracker" component={StepsTrackerScreen} /><TrackStack.Screen name="CaloriesTracker" component={CaloriesTrackerScreen} /><TrackStack.Screen name="WaterTracker" component={WaterTrackerScreen} /><TrackStack.Screen name="SleepTracker" component={SleepTrackerScreen} /><TrackStack.Screen name="WeightTracker" component={WeightTrackerScreen} /></TrackStack.Navigator>;
}

function SettingsNavigator() {
  return <SettingsStack.Navigator><SettingsStack.Screen name="Settings" component={SettingsScreen} /><SettingsStack.Screen name="Privacy" component={PrivacyScreen} /><SettingsStack.Screen name="About" component={AboutScreen} /></SettingsStack.Navigator>;
}

function MainNavigation() {
  const icons: Record<keyof RootTabParamList, IconName> = { Workouts: 'activity', Track: 'plus-circle', Analytics: 'bar-chart-2', Profile: 'user', Settings: 'settings' };
  return <Tab.Navigator screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: '#7357FF', tabBarIcon: ({ color, size }) => <Feather name={icons[route.name]} color={color} size={size} /> })}><Tab.Screen name="Workouts" component={WorkoutsNavigator} options={{ title: 'Workouts' }} /><Tab.Screen name="Track" component={TrackNavigator} options={{ title: 'Track' }} /><Tab.Screen name="Analytics" component={AnalyticsScreen} /><Tab.Screen name="Profile" component={ProfileScreen} /><Tab.Screen name="Settings" component={SettingsNavigator} /></Tab.Navigator>;
}

export default function App() {
  return <SafeAreaProvider><SettingsProvider><AppThemeProvider><NavigationContainer theme={navigationTheme}><StatusBar style="auto" /><MainNavigation /></NavigationContainer></AppThemeProvider></SettingsProvider></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  trackers: { backgroundColor: '#FAF9FF', flex: 1, padding: 20 },
  trackersTitle: { fontWeight: '800', marginTop: 4 },
  trackersSubtitle: { color: '#77727E', marginTop: 5, marginBottom: 24 },
  trackerButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, flexDirection: 'row', marginBottom: 12, padding: 18 },
  trackerLabel: { flex: 1, fontWeight: '700', marginLeft: 14 },
});

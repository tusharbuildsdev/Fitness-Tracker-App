import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import type { SettingsStackParamList } from '../types';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Privacy'>;

export function PrivacyScreen({ navigation }: Props) {
  useLayoutEffect(() => { navigation.setOptions({ title: 'Privacy' }); }, [navigation]);
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}><Text variant="headlineSmall" style={styles.heading}>Your fitness data stays yours.</Text><PrivacySection title="Your account" text="FitTrack Pro uses Firebase Authentication to manage your sign-in securely." /><PrivacySection title="Your tracking data" text="Your workouts, activity, hydration, sleep, and weight entries are stored in Cloud Firestore and are scoped to your authenticated account." /><PrivacySection title="No selling of personal data" text="FitTrack Pro does not sell your health and activity data. Use the app settings and your Firebase account controls to manage access." /><PrivacySection title="Notifications" text="Notifications are optional and can be disabled at any time from Settings or your device notification controls." /></ScrollView>;
}
function PrivacySection({ title, text }: { title: string; text: string }) { return <Surface elevation={1} style={styles.card}><Text variant="titleMedium" style={styles.title}>{title}</Text><Text style={styles.text}>{text}</Text></Surface>; }
const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20 }, heading: { fontWeight: '800', marginBottom: 16 }, card: { borderRadius: 20, marginBottom: 12, padding: 18 }, title: { fontWeight: '800' }, text: { color: '#5E5965', lineHeight: 21, marginTop: 7 } });

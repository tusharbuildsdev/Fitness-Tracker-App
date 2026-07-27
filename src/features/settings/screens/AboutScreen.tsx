import Constants from 'expo-constants';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import type { SettingsStackParamList } from '../types';

type Props = NativeStackScreenProps<SettingsStackParamList, 'About'>;

export function AboutScreen({ navigation }: Props) {
  useLayoutEffect(() => { navigation.setOptions({ title: 'About' }); }, [navigation]);
  const version = Constants.expoConfig?.version ?? '1.0.0';
  return <View style={styles.container}><Surface elevation={1} style={styles.card}><View style={styles.logo}><Text variant="headlineMedium" style={styles.logoText}>F</Text></View><Text variant="headlineSmall" style={styles.name}>FitTrack Pro</Text><Text style={styles.tagline}>Build healthier habits, one day at a time.</Text><Text variant="bodySmall" style={styles.version}>Version {version}</Text></Surface><Text style={styles.footer}>Made to help you understand your progress and stay consistent.</Text></View>;
}
const styles = StyleSheet.create({ container: { alignItems: 'center', backgroundColor: '#FAF9FF', flex: 1, padding: 20 }, card: { alignItems: 'center', borderRadius: 26, padding: 30, width: '100%' }, logo: { alignItems: 'center', backgroundColor: '#7357FF', borderRadius: 24, height: 72, justifyContent: 'center', width: 72 }, logoText: { color: '#FFFFFF', fontWeight: '800' }, name: { fontWeight: '800', marginTop: 14 }, tagline: { color: '#77727E', marginTop: 5, textAlign: 'center' }, version: { color: '#77727E', marginTop: 20 }, footer: { color: '#77727E', marginTop: 20, textAlign: 'center' } });

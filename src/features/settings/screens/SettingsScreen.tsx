import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Menu, Surface, Text } from 'react-native-paper';

import { useSettings } from '../context/SettingsContext';
import { requestNotificationPermission } from '../services/notificationService';
import type { SettingsStackParamList, ThemePreference, UnitPreference } from '../types';
import { SettingsRow } from '../components/SettingsRow';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Settings'>;
const themeLabels: Record<ThemePreference, string> = { system: 'System default', light: 'Light', dark: 'Dark' };
const unitLabels: Record<UnitPreference, string> = { metric: 'Metric (kg, cm)', imperial: 'Imperial (lb, ft)' };

export function SettingsScreen({ navigation }: Props) {
  const { settings, isLoading, updateSettings } = useSettings();
  const [themeMenuVisible, setThemeMenuVisible] = useState(false);
  const [unitsMenuVisible, setUnitsMenuVisible] = useState(false);
  useLayoutEffect(() => { navigation.setOptions({ title: 'Settings' }); }, [navigation]);
  const toggleNotifications = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestNotificationPermission();
      if (!granted) { Alert.alert('Permission needed', 'Enable notifications in your device settings to receive FitTrack reminders.'); return; }
    }
    await updateSettings({ notificationsEnabled: enabled });
  };
  if (isLoading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  return <ScrollView style={styles.container} contentContainerStyle={styles.content}><Text variant="titleMedium" style={styles.label}>Appearance</Text><Surface elevation={1} style={styles.group}><Menu visible={themeMenuVisible} onDismiss={() => setThemeMenuVisible(false)} anchor={<View><SettingsRow icon="moon" title="Theme" description={themeLabels[settings.theme]} onPress={() => setThemeMenuVisible(true)} showDivider={false} /></View>}>{(['system', 'light', 'dark'] as ThemePreference[]).map((theme) => <Menu.Item key={theme} title={themeLabels[theme]} onPress={() => { void updateSettings({ theme }); setThemeMenuVisible(false); }} />)}</Menu></Surface><Text variant="titleMedium" style={styles.label}>Preferences</Text><Surface elevation={1} style={styles.group}><SettingsRow icon="bell" title="Notifications" description="Workout and hydration reminders" value={settings.notificationsEnabled} onValueChange={(value) => void toggleNotifications(value)} /><Menu visible={unitsMenuVisible} onDismiss={() => setUnitsMenuVisible(false)} anchor={<View><SettingsRow icon="sliders" title="Units" description={unitLabels[settings.units]} onPress={() => setUnitsMenuVisible(true)} showDivider={false} /></View>}>{(['metric', 'imperial'] as UnitPreference[]).map((units) => <Menu.Item key={units} title={unitLabels[units]} onPress={() => { void updateSettings({ units }); setUnitsMenuVisible(false); }} />)}</Menu></Surface><Text variant="titleMedium" style={styles.label}>Information</Text><Surface elevation={1} style={styles.group}><SettingsRow icon="shield" title="Privacy" description="How your data is handled" onPress={() => navigation.navigate('Privacy')} /><SettingsRow icon="info" title="About FitTrack Pro" description="App information and version" onPress={() => navigation.navigate('About')} showDivider={false} /></Surface></ScrollView>;
}
const styles = StyleSheet.create({ container: { backgroundColor: '#FAF9FF', flex: 1 }, content: { padding: 20, paddingBottom: 36 }, center: { alignItems: 'center', flex: 1, justifyContent: 'center' }, label: { fontWeight: '800', marginBottom: 9, marginTop: 10 }, group: { borderRadius: 20, marginBottom: 12, overflow: 'hidden' } });

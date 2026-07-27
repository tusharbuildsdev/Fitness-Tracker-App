import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Divider, Switch, Text } from 'react-native-paper';

interface SettingsRowProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description?: string;
  value?: boolean;
  onPress?: () => void;
  onValueChange?: (value: boolean) => void;
  showDivider?: boolean;
}

export function SettingsRow({ icon, title, description, value, onPress, onValueChange, showDivider = true }: SettingsRowProps) {
  return <><Pressable onPress={onPress} disabled={!onPress} style={styles.row}><View style={styles.icon}><Feather name={icon} size={19} color="#7357FF" /></View><View style={styles.body}><Text variant="titleSmall" style={styles.title}>{title}</Text>{description ? <Text variant="bodySmall" style={styles.description}>{description}</Text> : null}</View>{typeof value === 'boolean' ? <Switch value={value} onValueChange={onValueChange} /> : onPress ? <Feather name="chevron-right" size={20} color="#8A8795" /> : null}</Pressable>{showDivider ? <Divider /> : null}</>;
}
const styles = StyleSheet.create({ row: { alignItems: 'center', flexDirection: 'row', minHeight: 68, paddingHorizontal: 16 }, icon: { alignItems: 'center', backgroundColor: '#F0EDFF', borderRadius: 12, height: 38, justifyContent: 'center', marginRight: 12, width: 38 }, body: { flex: 1 }, title: { fontWeight: '700' }, description: { color: '#77727E', marginTop: 2 } });

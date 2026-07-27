import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface ProfileAvatarProps { name: string; avatarUrl?: string; size?: number; }

export function ProfileAvatar({ name, avatarUrl, size = 86 }: ProfileAvatarProps) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'FT';
  return <View style={[styles.container, { height: size, width: size, borderRadius: size / 2 }]}>{avatarUrl ? <Image source={{ uri: avatarUrl }} style={[styles.image, { height: size, width: size, borderRadius: size / 2 }]} /> : <Text variant="headlineMedium" style={styles.initials}>{initials}</Text>}</View>;
}
const styles = StyleSheet.create({ container: { alignItems: 'center', backgroundColor: '#7357FF', justifyContent: 'center', overflow: 'hidden' }, image: { backgroundColor: '#E9E5F5' }, initials: { color: '#FFFFFF', fontWeight: '800' } });

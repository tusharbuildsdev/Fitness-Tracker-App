import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Surface, Text } from 'react-native-paper';

interface WaterProgressRingProps { amountMl: number; goalMl: number; }

export function WaterProgressRing({ amountMl, goalMl }: WaterProgressRingProps) {
  const progress = Math.min(amountMl / goalMl, 1);
  const size = 190;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const remaining = Math.max(goalMl - amountMl, 0);
  return <Animated.View entering={ZoomIn.springify()}><Surface elevation={1} style={styles.card}><View style={styles.ringWrap}><Svg width={size} height={size} style={styles.ring}><Circle cx={size / 2} cy={size / 2} r={radius} stroke="#DCEFF7" strokeWidth={strokeWidth} fill="none" /><Circle cx={size / 2} cy={size / 2} r={radius} stroke="#2D9CDB" strokeWidth={strokeWidth} strokeLinecap="round" fill="none" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} rotation="-90" origin={`${size / 2}, ${size / 2}`} /></Svg><View style={styles.ringLabel}><Feather name="droplet" size={22} color="#2D9CDB" fill="#2D9CDB" /><Text variant="headlineSmall" style={styles.amount}>{amountMl.toLocaleString()}</Text><Text variant="labelSmall" style={styles.ml}>ML</Text></View></View><Text variant="titleMedium" style={styles.title}>Hydration progress</Text><Text variant="bodySmall" style={styles.subtitle}>{remaining.toLocaleString()} ml remaining of your {goalMl.toLocaleString()} ml goal</Text></Surface></Animated.View>;
}
const styles = StyleSheet.create({ card: { alignItems: 'center', borderRadius: 24, padding: 22 }, ringWrap: { alignItems: 'center', height: 190, justifyContent: 'center', width: 190 }, ring: { position: 'absolute' }, ringLabel: { alignItems: 'center' }, amount: { fontWeight: '800', marginTop: 2 }, ml: { color: '#77727E', letterSpacing: 1 }, title: { fontWeight: '800', marginTop: 16 }, subtitle: { color: '#77727E', marginTop: 4, textAlign: 'center' } });

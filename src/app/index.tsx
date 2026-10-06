import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start(() => {
      router.replace("/(tabs)");
    });
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
      </View>
      <Text style={styles.title}>PSIF</Text>
      <Text style={styles.subtitle}>Plataforma de Suporte{'\n'}Psicopedagógico</Text>

      <View style={styles.progressBarBg}>
        <Animated.View style={[styles.progressBarFill, { width: widthInterpolated }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconWrapper: {
    width: 110,
    height: 110,
    borderRadius: 28,
    backgroundColor: '#a9c9e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 32, fontWeight: '700', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#dbe6f2', textAlign: 'center', marginBottom: 100 },
  progressBarBg: {
    position: 'absolute',
    bottom: 60,
    width: '60%',
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%', backgroundColor: '#fff' },
});
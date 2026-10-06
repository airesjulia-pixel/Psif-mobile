import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>

      
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </Stack>
  );
}
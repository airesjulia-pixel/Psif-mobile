import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "Home"}}/>
      <Stack.Screen name="Aluno/perfilAluno" options={{ headerShown: false }} />
      <Stack.Screen name="Atendimento/Encaminhamento/observacao" options={{ headerShown: false }} />    
      <Stack.Screen name="Atendimento/Encaminhamento/addObservacao" options={{ headerShown: false }} />
      <Stack.Screen name="Login/pageLogin" options={{ headerShown: false }} />
      <Stack.Screen name="Login/recuperarSenha" options={{ headerShown: false }} />
      <Stack.Screen name="Turma/pageTurma" options={{ headerShown: false }} />
      <Stack.Screen name="Aluno/pageAluno" options={{ headerShown: false }} />
      <Stack.Screen name="Inicial/deshboard" options={{ headerShown: false }} />
      <Stack.Screen name="Atendimento/Encaminhamento/pageEncaminhamento" options={{ headerShown: false }} />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </Stack>
  );
}
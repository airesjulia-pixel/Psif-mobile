import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs, useRouter } from 'expo-router';
import { Platform, Text, TouchableOpacity } from 'react-native';

import { encerrarSessao } from '../../data/sessao';

// Mesma paleta da tela de recuperar senha
const COR = {
    primaria: '#244A69',
    secundaria: '#6388A5',
    texto: '#526C80',
    inativo: '#7B8B99',
    fundo: '#DCEAF5',
    fundoClaro: '#B8D8F0',
    borda: '#C3D9E9',
    branco: '#FFFFFF',
};

export default function TabsLayout() {
    const router = useRouter();

    function sair() {
        encerrarSessao();
        router.replace('/Login/login');
    }

    return (
        <Tabs
            screenOptions={{
             
                headerStyle: {
                    backgroundColor: COR.primaria,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTintColor: COR.branco,
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COR.branco,
                },
                headerTitleAlign: 'left',

               
                tabBarActiveTintColor: COR.primaria,
                tabBarInactiveTintColor: COR.inativo,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginBottom: Platform.OS === 'ios' ? 0 : 6,
                },
                tabBarStyle: {
                    backgroundColor: COR.branco,
                    borderTopWidth: 1,
                    borderTopColor: COR.borda,
                    height: Platform.OS === 'ios' ? 88 : 66,
                    paddingTop: 6,
                    elevation: 8,
                },
                tabBarItemStyle: {
                    borderRadius: 12,
                    marginHorizontal: 6,
                    marginBottom: Platform.OS === 'ios' ? 0 : 4,
                },
                tabBarActiveBackgroundColor: COR.fundo,
                sceneStyle: { backgroundColor: COR.fundo },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Olá, Professor(a)',
                    tabBarLabel: 'Início',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={sair}
                            activeOpacity={0.7}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: COR.branco,
                                borderRadius: 20,
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                marginRight: 12,
                            }}
                        >
                            <Feather
                                name="log-out"
                                size={16}
                                color={COR.primaria}
                            />

                            <Text
                                style={{
                                    marginLeft: 6,
                                    fontSize: 13,
                                    fontWeight: '600',
                                    color: COR.primaria,
                                }}
                            >
                                Sair
                            </Text>
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="observacao"
                options={{
                    title: 'Observação',
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="edit" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="pageAluno"
                options={{
                    title: 'Alunos',
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome5 name="users" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="pageEncaminhamento"
                options={{
                    title: 'Enviados',
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome name="send" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
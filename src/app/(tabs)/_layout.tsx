import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import { encerrarSessao } from '../../data/sessao';

export default function TabsLayout() {
    const router = useRouter();

    function sair() {
        encerrarSessao();
        router.replace('/Login/pageLogin');
    }

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Olá, Professor(a)',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={sair}
                            activeOpacity={0.7}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#fdf1f0',
                                borderWidth: 1,
                                borderColor: '#e0b4af',
                                borderRadius: 20,
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                marginRight: 10,
                            }}
                        >
                            <Feather
                                name="log-out"
                                size={16}
                                color="#c0392b"
                            />

                            <Text
                                style={{
                                    marginLeft: 6,
                                    fontSize: 13,
                                    fontWeight: '600',
                                    color: '#c0392b',
                                }}
                            >
                                Sair
                            </Text>
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <FontAwesome
                                name="home"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />

            <Tabs.Screen
                name="observacao"
                options={{
                    title: 'Observação',
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Feather
                                name="edit"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />

            <Tabs.Screen
                name="pageAluno"
                options={{
                    title: 'Alunos',
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <FontAwesome5
                                name="users"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />

            <Tabs.Screen
                name="pageEncaminhamento"
                options={{
                    title: 'Enviados',
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <FontAwesome
                                name="send"
                                size={size}
                                color={color}
                            />
                        );
                    },
                }}
            />
        </Tabs>
    );
}
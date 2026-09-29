import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name="index" 
                options={{
                    title: 'Olá, Professor(a)',
                    headerRight: () => <View style={{ marginRight: 10}}><AntDesign name="menu" size={24} color="black"/></View>,
                    tabBarIcon: ({focused, size, color}) => {
                        return <FontAwesome name="home" size={size} color={color} />;
                    }
                }}
            />
            <Tabs.Screen 
                name="observacao" 
                options={{
                    title: 'Observação',
                    tabBarIcon: ({focused, size, color}) => {
                        return <Feather name="edit" size={size} color={color} />;
                    }
                }}
            />
            <Tabs.Screen 
                name="pageAluno" 
                options={{
                    title: 'Alunos',
                    tabBarIcon: ({focused, size, color}) => {
                        return <FontAwesome5 name="users" size={size} color={color} />
                    }
                }}
            />
            <Tabs.Screen 
                name="pageEncaminhamento" 
                options={{
                    title: 'Enviados',
                    tabBarIcon: ({focused, size, color}) => {
                        return <FontAwesome name="send" size={size} color={color} />;
                    }
                }}
            />
        </Tabs>
    )
}
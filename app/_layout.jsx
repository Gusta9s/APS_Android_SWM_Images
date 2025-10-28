import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer screenOptions={{
                drawerStyle: { backgroundColor: "#b6d3a5" },
                drawerLabelStyle: { color: "#000" },
                headerStyle: { backgroundColor: "#b6d3a5" },
                headerTintColor: "#fff"
            }}>
                <Drawer.Screen 
                    name='PaginaPrincipal/index' 
                    options={{
                        drawerLabel: 'Página Inicial',
                        headerTitle: '',
                        title: 'Página Inicial'
                    }} 
                />
                <Drawer.Screen 
                    name='SobreNosApp/index' 
                    options={{
                        drawerLabel: 'Sobre Nós',
                        headerTitle: '',
                        title: 'Sobre Nós'
                    }}
                />
                <Drawer.Screen 
                    name='FluxoPrincipal/index' 
                    options={{
                        drawerLabel: 'Captura',
                        headerTitle: '',
                        title: 'Fluxo Principal'
                    }} 
                />
                <Drawer.Screen 
                    name='FluxoPrincipal/camera' 
                    options={{
                        headerTitle: '',
                        drawerItemStyle: { display: 'none' } 
                    }} 
                />
                <Drawer.Screen 
                    name='Ajuda/index' 
                    options={{
                        drawerLabel: 'Ajuda',
                        headerTitle: '',
                        title: 'Ajuda'
                    }} 
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer screenOptions={{
                drawerStyle: { backgroundColor: "#3b3b3b" },
                drawerLabelStyle: { color: "#fff" },
                headerStyle: { backgroundColor: "#3b3b3b" },
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
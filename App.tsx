import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FrontScreen } from 'screens';
import { RootStackParamList } from 'navigation';

/** https://reactnavigation.org/docs/typescript/#type-checking-the-navigator */
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar translucent backgroundColor="transparent" />
                <Stack.Navigator>
                    <Stack.Screen name="FrontScreen" component={FrontScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;

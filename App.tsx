import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList, SignInStackNavigator, SignUpStackNavigator } from 'navigation';
import { FrontScreen } from 'screens';

/** https://reactnavigation.org/docs/typescript/#type-checking-the-navigator */
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar translucent backgroundColor="transparent" />
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <Stack.Screen name="FrontScreen" component={FrontScreen} />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUpStackNavigator}
                        options={{
                            ...TransitionPresets.FadeFromBottomAndroid,
                        }}
                    />
                    <Stack.Screen
                        name="SignIn"
                        component={SignInStackNavigator}
                        options={{
                            ...TransitionPresets.FadeFromBottomAndroid,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;

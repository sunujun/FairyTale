import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackNavigator } from 'screens';
import store from 'redux/store/index';

const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <StatusBar translucent backgroundColor="transparent" />
                    <RootStackNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
};

export default App;

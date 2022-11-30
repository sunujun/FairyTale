import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackNavigator } from 'navigation';
import store from 'redux/store/index';

const queryClient = new QueryClient();

const App = () => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <StatusBar translucent backgroundColor="transparent" />
                        <RootStackNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </QueryClientProvider>
        </Provider>
    );
};

export default App;

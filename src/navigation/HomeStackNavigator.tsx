import React from 'react';
import { Pressable } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeStackParamList } from 'navigation';
import { Home, Player } from 'screens';

const Stack = createStackNavigator<HomeStackParamList>();

/** 홈 Stack Navigation */
const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: false,
                headerTitle: () => null,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen
                name="Player"
                component={Player}
                options={({ navigation }) => ({
                    headerTransparent: true,
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.goBack()}>
                            <MaterialIcons color={'white'} name="arrow-back-ios" size={26} style={{ marginLeft: 20 }} />
                        </Pressable>
                    ),
                })}
            />
            {/* 추가되는 페이지는 밑에 작성 */}
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;

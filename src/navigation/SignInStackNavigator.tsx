import React from 'react';
import { Pressable } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SignInStackParamList } from 'navigation';
import { SignInIdentifier, SignInPassword } from 'screens';

const Stack = createStackNavigator<SignInStackParamList>();

/** 로그인 Navigation */
const SignInStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                gestureEnabled: false,
                headerTitle: () => null,
                headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" size={26} style={{ marginLeft: 20 }} />
                    </Pressable>
                ),
                ...TransitionPresets.SlideFromRightIOS,
            })}>
            <Stack.Screen name="Identifier" component={SignInIdentifier} />
            <Stack.Screen name="Password" component={SignInPassword} />
            {/* 추가되는 설정 페이지는 밑에다가 작성 */}
        </Stack.Navigator>
    );
};

export default SignInStackNavigator;

import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SignUpStackParamList } from 'navigation';
import { CheckPassword, Identifier, Password } from 'screens';

const Stack = createStackNavigator<SignUpStackParamList>();

/** 회원 가입 Navigation */
const SignUpStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: false,
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="Identifier" component={Identifier} />
            <Stack.Screen name="Password" component={Password} />
            <Stack.Screen name="CheckPassword" component={CheckPassword} />
            {/* 추가되는 설정 페이지는 밑에다가 작성 */}
        </Stack.Navigator>
    );
};

export default SignUpStackNavigator;

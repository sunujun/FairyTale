import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { SignInStackParamList } from 'navigation';
import { SignInIdentifier, SignInPassword } from 'screens';

const Stack = createStackNavigator<SignInStackParamList>();

/** 로그인 Navigation */
function SignInStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                gestureEnabled: false,
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="Identifier" component={SignInIdentifier} />
            <Stack.Screen name="Password" component={SignInPassword} />
            {/* 추가되는 설정 페이지는 밑에다가 작성 */}
        </Stack.Navigator>
    );
}

export default SignInStackNavigator;

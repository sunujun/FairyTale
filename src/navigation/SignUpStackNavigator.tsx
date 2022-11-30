import React from 'react';
import { Pressable } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SignUpStackParamList } from 'navigation';
import { CheckPassword, Identifier, Name, Password } from 'screens';

const Stack = createStackNavigator<SignUpStackParamList>();

/** 회원 가입 Navigation */
const SignUpStackNavigator = () => {
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
            <Stack.Screen name="Identifier" component={Identifier} />
            <Stack.Screen name="Name" component={Name} />
            <Stack.Screen name="Password" component={Password} />
            <Stack.Screen name="CheckPassword" component={CheckPassword} />
            {/* 추가되는 설정 페이지는 밑에다가 작성 */}
        </Stack.Navigator>
    );
};

export default SignUpStackNavigator;

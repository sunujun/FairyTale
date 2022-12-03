import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SignInStackParamList } from 'navigation';
import { SignInIdentifier, SignInPassword } from 'screens';
import { color, standardWidth } from 'styles';

const Stack = createStackNavigator<SignInStackParamList>();

/** 로그인 Navigation */
const SignInStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
                gestureEnabled: false,
                headerTransparent: true,
                headerTitle: () => '',
                headerLeft: () => (
                    <Pressable onPress={() => navigation.goBack()}>
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={26}
                            style={styles.headerLeft}
                            color={color.button.primary}
                        />
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

const styles = StyleSheet.create({
    headerLeft: {
        marginLeft: standardWidth(20),
    },
});

export default SignInStackNavigator;

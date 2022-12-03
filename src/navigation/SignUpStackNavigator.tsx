import React from 'react';
import { Pressable, StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SignUpStackParamList } from 'navigation';
import { CheckPassword, Identifier, Name, Password } from 'screens';
import { color, standardWidth } from 'styles';

const Stack = createStackNavigator<SignUpStackParamList>();

/** 회원 가입 Navigation */
const SignUpStackNavigator = () => {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
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
                <Stack.Screen name="Identifier" component={Identifier} />
                <Stack.Screen name="Name" component={Name} />
                <Stack.Screen name="Password" component={Password} />
                <Stack.Screen name="CheckPassword" component={CheckPassword} />
                {/* 추가되는 설정 페이지는 밑에다가 작성 */}
            </Stack.Navigator>
        </>
    );
};

const styles = StyleSheet.create({
    headerLeft: {
        marginLeft: standardWidth(20),
    },
});

export default SignUpStackNavigator;

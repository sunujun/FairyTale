import React from 'react';
import { Pressable, Text, View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';

type FrontScreenProp = StackNavigationProp<RootStackParamList, 'FrontScreen'>;

/** 초기 화면 */
export default function FrontScreen() {
    const statusBarHeight = StatusBar.currentHeight;
    const navigation = useNavigation<FrontScreenProp>();

    return (
        <View style={{ backgroundColor: 'red', flex: 1, paddingTop: statusBarHeight }}>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text>회원가입</Text>
            </Pressable>
            <Pressable>
                <Text>로그인</Text>
            </Pressable>
        </View>
    );
}

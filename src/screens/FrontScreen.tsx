import React from 'react';
import { Pressable, Text, View, StatusBar } from 'react-native';

/** 초기 화면 */
export default function FrontScreen() {
    const statusBarHeight = StatusBar.currentHeight;

    return (
        <View style={{ backgroundColor: 'red', flex: 1, paddingTop: statusBarHeight }}>
            <Pressable>
                <Text>회원가입</Text>
            </Pressable>
            <Pressable>
                <Text>로그인</Text>
            </Pressable>
        </View>
    );
}

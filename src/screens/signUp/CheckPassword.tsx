import React from 'react';
import { Text, View } from 'react-native';

/** Password 재확인 화면 */
export default function CheckPassword() {
    return (
        <View style={{ backgroundColor: '#eeeeee', flex: 1 }}>
            <Text>비밀번호를 한 번 더 입력하세요</Text>
        </View>
    );
}

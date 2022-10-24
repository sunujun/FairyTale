import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignUpStackParamList } from 'navigation';

type PasswordScreenProp = StackNavigationProp<SignUpStackParamList, 'Identifier'>;

/** Password 입력 화면 */
export default function Password() {
    const navigation = useNavigation<PasswordScreenProp>();

    return (
        <View style={{ backgroundColor: '#eeeeee', flex: 1 }}>
            <Text>비밀번호를 입력하세요</Text>
            <Pressable onPress={() => navigation.navigate('CheckPassword')}>
                <Text>다음</Text>
            </Pressable>
        </View>
    );
}

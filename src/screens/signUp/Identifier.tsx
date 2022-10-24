import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignUpStackParamList } from 'navigation';

type IdentifierScreenProp = StackNavigationProp<SignUpStackParamList, 'Identifier'>;

/** ID 입력 화면 */
export default function Identifier() {
    const navigation = useNavigation<IdentifierScreenProp>();

    return (
        <View style={{ backgroundColor: '#eeeeee', flex: 1 }}>
            <Text>아이디를 입력하세요</Text>
            <Pressable onPress={() => navigation.navigate('Password')}>
                <Text>다음</Text>
            </Pressable>
        </View>
    );
}

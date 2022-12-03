import React from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from 'navigation';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';

const Background = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    background-color: ${color.text.caution1};
    padding-bottom: ${standardHeight(40)}px;
`;

const LoginButton = styled(Pressable)`
    width: ${standardWidth(200)}px;
    height: ${standardHeight(40)}px;
    background-color: ${color.button.secondary};
    justify-content: center;
    align-items: center;
    border-radius: ${standardWidth(40)}px;
    margin-bottom: ${standardHeight(20)}px;
`;

const ButtonText = styled(Text)`
    font-size: ${standardFontSize(18)}px;
    font-color: ${color.text.main};
    font-weight: bold;
`;

type FrontScreenProp = StackNavigationProp<RootStackParamList, 'FrontScreen'>;

/** 초기 화면 */
const FrontScreen = () => {
    const navigation = useNavigation<FrontScreenProp>();

    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={{ flex: 1 }}>
            <Background>
                <Image source={require('images/fairytale.png')} style={{ width: 450, height: 150 }} />
                <Image source={require('images/book.png')} style={{ width: 200, height: 170 }} />
                <Image
                    source={require('images/leaf-shapes.png')}
                    style={{ width: '100%', height: 80, position: 'absolute', padding: 230 }}
                />
                <LoginButton onPress={() => navigation.navigate('SignUp')}>
                    <ButtonText>회원가입</ButtonText>
                </LoginButton>
                <LoginButton onPress={() => navigation.navigate('SignIn')}>
                    <ButtonText>로그인</ButtonText>
                </LoginButton>
            </Background>
        </SafeAreaView>
    );
};

export default FrontScreen;

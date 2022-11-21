import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from 'navigation';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { useAppDispatch } from 'redux/store';
import userSlice from 'redux/slices/user';

const Background = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    background-color: ${color.text.caution1};
    padding-bottom: ${standardHeight(40)}px;
`;

const LoginButton = styled(Pressable)`
    width: ${standardWidth(310)}px;
    height: ${standardHeight(40)}px;
    background-color: ${color.button.disabled};
    justify-content: center;
    align-items: center;
    border-radius: ${standardWidth(4)}px;
    margin-bottom: ${standardHeight(10)}px;
`;

const ButtonText = styled(Text)`
    font-size: ${standardFontSize(18)}px;
    font-color: ${color.text.main};
    font-weight: bold;
`;

type FrontScreenProp = StackNavigationProp<RootStackParamList, 'FrontScreen'>;

/** 초기 화면 */
export default function FrontScreen() {
    const navigation = useNavigation<FrontScreenProp>();
    const dispatch = useAppDispatch();

    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={{ flex: 1 }}>
            <Background>
                {/* FIXME: 임시 버튼 */}
                <LoginButton
                    onPress={() => {
                        dispatch(
                            userSlice.actions.setUser({
                                email: '123',
                            }),
                        );
                    }}>
                    <ButtonText>메인으로 이동</ButtonText>
                </LoginButton>
                <LoginButton onPress={() => navigation.navigate('SignUp')}>
                    <ButtonText>회원가입</ButtonText>
                </LoginButton>
                <LoginButton onPress={() => navigation.navigate('SignIn')}>
                    <ButtonText>로그인</ButtonText>
                </LoginButton>
            </Background>
        </SafeAreaView>
    );
}

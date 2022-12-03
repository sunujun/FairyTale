import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { RootState } from 'redux/store/reducers';
import { useAppDispatch } from 'redux/store';
import userSlice from 'redux/slices/user';

const Background = styled(View)`
    flex: 1;
    padding-top: ${StatusBar.currentHeight}px;
`;

const Content = styled(View)`
    flex: 1;
    padding-horizontal: ${standardWidth(24)}px;
`;

const MainText = styled(Text)`
    font-size: ${standardFontSize(24)}px;
    font-color: ${color.text.secondary2};
    font-weight: bold;
`;

const SubText = styled(Text)`
    font-size: ${standardFontSize(16)}px;
    font-color: ${color.text.main};
`;

const NextButton = styled(Pressable)`
    height: ${standardHeight(44)}px;
    background-color: ${color.button.primary};
    justify-content: center;
    align-items: center;
    border-radius: ${standardWidth(4)}px;
`;

/** Password 재확인 화면 */
const CheckPassword = () => {
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState('');
    const correctPassword = useSelector((state: RootState) => state.signUp.pw === password);
    const signUpData = useSelector((state: RootState) => state.signUp);

    const signUpMutation = useMutation({
        mutationFn: (_signUpData: any) =>
            axios.post('https://asia-northeast3-kidsfairytalereading.cloudfunctions.net/signIn', _signUpData),
        onMutate: variable => {
            console.log('onMutate', variable);
        },
        onError: error => {
            // error
            console.log(error);
        },
        onSuccess: (data, variables) => {
            console.log('success', data.data.result);
            if (data.data.result === 'CREATE') {
                dispatch(
                    userSlice.actions.setUser({
                        email: variables.email,
                        name: variables.name,
                    }),
                );
            }
        },
        onSettled: () => {
            console.log('end');
        },
    });

    const handleSubmit = () => {
        signUpMutation.mutate(signUpData);
    };

    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={{ flex: 1 }}>
            <Background>
                <Content>
                    <MainText>비밀번호 확인</MainText>
                    <SubText>사용할 비밀번호를 한 번 더 입력하세요</SubText>
                    {/* TODO: 임시 비밀번호 확인 입력, 비밀번호 일치, 불일치에 따른 로직 추가 */}
                    <TextInput
                        style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
                        onChangeText={text => setPassword(text)}
                    />
                </Content>
            </Background>
            {/* TODO: 텍스트 인풋에 비밀번호가 입력되어야 press 활성화, 비활성화/활성화 디자인 추가 */}
            <NextButton
                disabled={password === ''}
                style={password === '' && { backgroundColor: color.button.disabled }}
                onPress={() => {
                    if (correctPassword) {
                        handleSubmit();
                    } else {
                        console.log(correctPassword);
                    }
                }}>
                <Text>다음</Text>
            </NextButton>
        </SafeAreaView>
    );
};

export default CheckPassword;

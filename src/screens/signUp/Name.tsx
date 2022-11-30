import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View, TextInput } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignUpStackParamList } from 'navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { useAppDispatch } from 'redux/store';
import signUpSlice from 'redux/slices/signUp';

type NameScreenProp = StackNavigationProp<SignUpStackParamList, 'Name'>;

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

/** 이름 입력 화면 */
const Name = () => {
    const navigation = useNavigation<NameScreenProp>();
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');

    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={{ flex: 1 }}>
            <Background>
                <Content>
                    <MainText>이름</MainText>
                    <SubText>이름을 입력하세요</SubText>
                    {/* TODO: 임시 이름 입력 */}
                    <TextInput
                        style={{ borderBottomWidth: 1, borderBottomColor: 'black' }}
                        onChangeText={text => setName(text)}
                    />
                </Content>
            </Background>
            {/* TODO: 텍스트 인풋에 비밀번호가 입력되어야 press 활성화, 비활성화/활성화 디자인 추가 */}
            <NextButton
                disabled={name === ''}
                style={name === '' && { backgroundColor: color.button.disabledPrimary }}
                onPress={() => {
                    dispatch(
                        signUpSlice.actions.setName({
                            name: name,
                        }),
                    );
                    navigation.navigate('Password');
                }}>
                <Text>다음</Text>
            </NextButton>
        </SafeAreaView>
    );
};

export default Name;

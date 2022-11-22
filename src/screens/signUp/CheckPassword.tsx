import React from 'react';
import { Pressable, StatusBar, Text, View, TextInput } from 'react-native';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';

const Background = styled(View)`
    flex: 1;
    background-color: ${color.text.caution1};
    padding-top: ${StatusBar.currentHeight}px;
`;

const Content = styled(View)`
    flex: 1;
    background-color: ${color.text.caution1};
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
    background-color: ${color.button.disabledPrimary};
    justify-content: center;
    align-items: center;
    border-radius: ${standardWidth(4)}px;
`;

/** Password 재확인 화면 */
export default function CheckPassword() {
    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={{ flex: 1 }}>
            <Background>
                {/* TODO: 헤더 추가 예정, 화살표 이미지 필요, 하단은 임의 헤더 + 마진 높이 합친 값 */}
                <View style={{ height: standardHeight(56), backgroundColor: 'white' }} />
                <Content>
                    <MainText>비밀번호 확인</MainText>
                    <SubText>사용할 비밀번호를 한 번 더 입력하세요</SubText>
                    {/* TODO: 임시 비밀번호 확인 입력, 비밀번호 일치, 불일치에 따른 로직 추가 */}
                    <TextInput style={{ borderBottomWidth: 1, borderBottomColor: 'black' }} />
                </Content>
            </Background>
            {/* TODO: 텍스트 인풋에 비밀번호가 입력되어야 press 활성화, 비활성화/활성화 디자인 추가 */}
            <NextButton>
                <Text>다음</Text>
            </NextButton>
        </SafeAreaView>
    );
}
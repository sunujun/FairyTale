import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignUpStackParamList } from 'navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { useAppDispatch } from 'redux/store';
import signUpSlice from 'redux/slices/signUp';

type PasswordScreenProp = StackNavigationProp<SignUpStackParamList, 'Password'>;

/** Password 입력 화면 */
const Password = () => {
    const navigation = useNavigation<PasswordScreenProp>();
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={styles.container}>
            <View style={styles.background}>
                <View style={styles.content}>
                    <Text style={styles.mainText}>비밀번호</Text>
                    <Text style={styles.subText}>사용할 비밀번호를 입력하세요</Text>
                    {/* TODO: 임시 비밀번호 입력 */}
                    <TextInput style={styles.textInput} onChangeText={text => setPassword(text)} />
                </View>
            </View>
            {/* TODO: 텍스트 인풋에 비밀번호가 입력되어야 press 활성화, 비활성화/활성화 디자인 추가 */}
            <Pressable
                disabled={password === ''}
                style={dynamicStyles(password === '').button}
                onPress={() => {
                    dispatch(
                        signUpSlice.actions.setPw({
                            pw: password,
                        }),
                    );
                    navigation.navigate('CheckPassword');
                }}>
                <Text style={dynamicStyles(password === '').buttonText}>다음</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background.primary,
    },
    background: {
        flex: 1,
        paddingTop: standardWidth(56) + (StatusBar.currentHeight as number),
    },
    content: {
        flex: 1,
        paddingHorizontal: standardWidth(24),
    },
    mainText: {
        fontSize: standardFontSize(24),
        color: color.text.primary2,
        fontWeight: 'bold',
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: color.divider,
        marginTop: standardHeight(12),
    },
    subText: {
        fontSize: standardFontSize(16),
        color: color.text.primary1,
        marginTop: standardHeight(4),
    },
});

const dynamicStyles = (isDisabled: boolean) =>
    StyleSheet.create({
        button: {
            height: standardHeight(44),
            backgroundColor: isDisabled ? color.button.disabled : color.button.primary,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonText: {
            fontSize: standardFontSize(18),
            color: color.text.button,
            fontWeight: 'bold',
        },
    });

export default Password;

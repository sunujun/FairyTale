import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { RootState } from 'redux/store/reducers';
import { useAppDispatch } from 'redux/store';
import userSlice from 'redux/slices/user';

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
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={styles.container}>
            <View style={styles.background}>
                <View style={styles.content}>
                    <Text style={styles.mainText}>비밀번호 확인</Text>
                    <Text style={styles.subText}>사용할 비밀번호를 한 번 더 입력하세요</Text>
                    {/* TODO: 임시 비밀번호 확인 입력, 비밀번호 일치, 불일치에 따른 로직 추가 */}
                    <TextInput style={styles.textInput} onChangeText={text => setPassword(text)} />
                </View>
            </View>
            <Pressable
                disabled={password === ''}
                style={dynamicStyles(password === '').button}
                onPress={() => {
                    if (correctPassword) {
                        handleSubmit();
                    } else {
                        console.log(correctPassword);
                    }
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

export default CheckPassword;

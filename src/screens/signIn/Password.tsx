import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { useAppDispatch } from 'redux/store';
import { RootState } from 'redux/store/reducers';
import userSlice from 'redux/slices/user';

/** Password 입력 화면 */
const Password = () => {
    const dispatch = useAppDispatch();
    const [password, setPassword] = useState('');
    const signInData = useSelector((state: RootState) => state.signIn);

    const signUpMutation = useMutation({
        mutationFn: (_signInData: any) =>
            axios.post('https://asia-northeast3-kidsfairytalereading.cloudfunctions.net/signIn', _signInData),
        onMutate: variable => {
            console.log('onMutate', variable);
        },
        onError: error => {
            // error
            console.log(error);
        },
        onSuccess: (data, variables) => {
            console.log('success', data.data.result);
            if (data.data.result === 'SUCCESS') {
                dispatch(
                    userSlice.actions.setUser({
                        email: variables.email,
                    }),
                );
            }
        },
        onSettled: () => {
            console.log('end');
        },
    });

    const handleSubmit = () => {
        signUpMutation.mutate({ ...signInData, pw: password });
    };

    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={styles.container}>
            <View style={styles.background}>
                <View style={styles.content}>
                    <Text style={styles.mainText}>비밀번호</Text>
                    <Text style={styles.subText}>비밀번호를 입력하세요</Text>
                    {/* TODO: 임시 비밀번호 입력 */}
                    <TextInput style={styles.textInput} onChangeText={text => setPassword(text)} />
                </View>
            </View>
            <Pressable
                disabled={password === ''}
                style={dynamicStyles(password === '').button}
                onPress={async () => {
                    handleSubmit();
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

import React, { useState } from 'react';
import { Pressable, StatusBar, Text, View, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SignUpStackParamList } from 'navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { useAppDispatch } from 'redux/store';
import signUpSlice from 'redux/slices/signUp';

type NameScreenProp = StackNavigationProp<SignUpStackParamList, 'Name'>;

/** 이름 입력 화면 */
const Name = () => {
    const navigation = useNavigation<NameScreenProp>();
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');

    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={styles.container}>
            <View style={styles.background}>
                <View style={styles.content}>
                    <Text style={styles.mainText}>이름</Text>
                    <Text style={styles.subText}>이름을 입력하세요</Text>
                    {/* TODO: 임시 이름 입력 */}
                    <TextInput style={styles.textInput} onChangeText={text => setName(text)} />
                </View>
            </View>
            <Pressable
                disabled={name === ''}
                style={dynamicStyles(name === '').button}
                onPress={() => {
                    dispatch(
                        signUpSlice.actions.setName({
                            name: name,
                        }),
                    );
                    navigation.navigate('Password');
                }}>
                <Text style={dynamicStyles(name === '').buttonText}>다음</Text>
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

export default Name;

import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { RootStackParamList } from 'navigation';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';

type FrontScreenProp = StackNavigationProp<RootStackParamList, 'FrontScreen'>;

/** 초기 화면 */
const FrontScreen = () => {
    const navigation = useNavigation<FrontScreenProp>();

    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={styles.safeArea}>
            <View style={styles.container}>
                <FastImage
                    source={require('images/fairytale.png')}
                    style={styles.titleImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <FastImage
                    source={require('images/book.png')}
                    style={styles.bookImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <FastImage
                    source={require('images/leaf-shapes.png')}
                    style={styles.leafImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Pressable style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}>회원가입</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.buttonText}>로그인</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: color.background.front,
        paddingBottom: standardHeight(40),
    },
    titleImage: {
        width: standardWidth(360),
        height: standardHeight(200),
    },
    bookImage: {
        width: standardWidth(200),
        height: standardHeight(160),
    },
    leafImage: {
        width: standardWidth(460),
        height: standardHeight(460),
        position: 'absolute',
        bottom: standardHeight(-40),
        left: 0,
    },
    button: {
        width: standardWidth(200),
        height: standardHeight(40),
        backgroundColor: color.button.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: standardWidth(40),
        marginBottom: standardHeight(12),
    },
    buttonText: {
        fontSize: standardFontSize(18),
        color: color.text.main,
        fontWeight: 'bold',
    },
});

export default FrontScreen;

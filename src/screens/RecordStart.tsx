import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { RootStackParamList } from 'navigation';

type RootStackProp = StackNavigationProp<RootStackParamList, 'Main'>;

/** 녹음 전 설명 화면 */
const RecordStart = () => {
    const navigation = useNavigation<RootStackProp>();

    return (
        <SafeAreaView style={styles.container}>
            <FastImage source={require('images/record.png')} style={styles.micImage} />
            <Text style={styles.guideText}>녹음 시작 버튼을 누른 후</Text>
            <Text style={styles.guideText}>화면에 제시되는 단락을 녹음한 파일을 제출해주세요</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Record')}>
                <Text style={styles.buttonText}>녹음 시작</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: standardHeight(16),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.background.primary,
    },
    micImage: {
        width: standardWidth(112),
        height: standardWidth(112),
        marginBottom: standardHeight(24),
    },
    guideText: {
        fontSize: standardFontSize(13),
        color: color.text.primary1,
        fontWeight: '200',
    },
    button: {
        width: standardWidth(310),
        height: standardHeight(40),
        backgroundColor: color.button.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: standardWidth(4),
        marginTop: standardHeight(24),
    },
    buttonText: {
        fontSize: standardFontSize(18),
        color: color.text.button,
        fontWeight: 'bold',
    },
});

export default RecordStart;

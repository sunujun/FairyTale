import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { RootStackParamList } from 'navigation';

type RootStackRouteProp = RouteProp<RootStackParamList, 'BookInformation'>;
type RootStackProp = StackNavigationProp<RootStackParamList, 'Main'>;
interface FilterButtonProps {
    /** key  */
    key: string;
    /** label */
    label: string;
}

/** 홈에서 책 선택 시, 발생하는 화면 */
const BookInformation = () => {
    const navigation = useNavigation<RootStackProp>();
    const route = useRoute<RootStackRouteProp>();
    /** 언어 필터 종류 */
    const languageFilterData: FilterButtonProps[] = [
        {
            key: 'korean',
            label: '한국어',
        },
        {
            key: 'english',
            label: '영어',
        },
    ];
    /** 선택된 언어 필터 옵션 */
    const [languageFilterOption, setLanguageFilterOption] = useState('korean');
    /** 목소리 필터 종류 */
    const voiceFilterData: FilterButtonProps[] = [
        {
            key: 'female',
            label: '여성',
        },
        {
            key: 'male',
            label: '남성',
        },
        {
            key: 'custom',
            label: '나의 목소리',
        },
    ];
    /** 선택된 목소리 필터 옵션 */
    const [voiceFilterOption, setVoiceFilterOption] = useState('female');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.image} />
            <Text style={styles.titleText}>{route.params?.bookData.title}</Text>
            <View style={{ width: standardWidth(360), paddingHorizontal: standardWidth(32) }}>
                <View style={styles.filterWrapper}>
                    <Text style={styles.subtitleText}>언어</Text>
                    {languageFilterData.map(item => {
                        return (
                            <Pressable
                                key={item.key}
                                onPress={() => setLanguageFilterOption(item.key)}
                                style={dynamicStyles(languageFilterOption === item.key).radioButton}>
                                <Text style={dynamicStyles(languageFilterOption === item.key).radioButtonText}>
                                    {item.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
                <View style={styles.filterWrapper}>
                    <Text style={styles.subtitleText}>목소리</Text>
                    {voiceFilterData.map(item => {
                        return (
                            <Pressable
                                key={item.key}
                                onPress={() => setVoiceFilterOption(item.key)}
                                style={dynamicStyles(voiceFilterOption === item.key).radioButton}>
                                <Text style={dynamicStyles(voiceFilterOption === item.key).radioButtonText}>
                                    {item.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
                <View style={styles.summaryWrapper}>
                    <Text style={styles.subtitleText}>줄거리</Text>
                    <Text style={styles.summaryText}>{route.params?.bookData.summary}</Text>
                </View>
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Player', { bookData: route.params?.bookData });
                    }}>
                    <Text style={styles.buttonText}>재생하기</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: standardWidth(200),
        height: standardWidth(200),
        backgroundColor: 'red',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: standardFontSize(24),
        color: color.text.primary1,
        marginTop: standardHeight(24),
    },
    subtitleText: {
        width: standardWidth(48),
        fontWeight: 'bold',
        fontSize: standardFontSize(16),
        color: color.text.primary1,
    },
    filterWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: standardHeight(16),
    },
    summaryWrapper: {
        marginTop: standardHeight(16),
    },
    summaryText: {
        marginTop: standardHeight(4),
        fontSize: standardFontSize(14),
        color: color.text.secondary1,
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

const dynamicStyles = (isSelected: boolean) =>
    StyleSheet.create({
        radioButton: {
            height: standardHeight(28),
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: standardHeight(4),
            marginHorizontal: standardWidth(5),
            borderRadius: standardHeight(14),
            borderWidth: 1,
            borderColor: isSelected ? color.button.primary : color.button.disabled,
            backgroundColor: isSelected ? color.button.primary : color.button.secondary,
        },
        radioButtonText: {
            paddingHorizontal: standardWidth(10),
            color: isSelected ? color.text.button : color.text.disabled,
        },
    });

export default BookInformation;

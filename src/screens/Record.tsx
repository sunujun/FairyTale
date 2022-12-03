import React, { useEffect, useMemo, useState } from 'react';
import {
    PermissionsAndroid,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import type { AudioSet, PlayBackType, RecordBackType } from 'react-native-audio-recorder-player';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { RootStackParamList } from 'navigation';

type RootStackProp = StackNavigationProp<RootStackParamList, 'Record'>;

/** 녹음 화면 */
const Record = () => {
    const navigation = useNavigation<RootStackProp>();

    /** 녹음 파일 저장 위치 */
    const path = Platform.select({
        ios: undefined,
        android: undefined,
    });
    /** Recorder 및 Player */
    const audioRecorderPlayer = useMemo(() => {
        return new AudioRecorderPlayer();
    }, []);

    useEffect(() => {
        audioRecorderPlayer.setSubscriptionDuration(0.1);
    }, [audioRecorderPlayer]);

    /** 녹음 시간 */
    const [recordTime, setRecordTime] = useState('00:00:00');
    /** 녹음 파일 실행 시간 (viewBar에 사용) */
    const [currentPositionSec, setCurrentPositionSec] = useState(0);
    /** 녹음 파일 전체 시간 (viewBar에 사용) */
    const [currentDurationSec, setCurrentDurationSec] = useState(0);
    /** 녹음 파일 전체 시간 */
    const [playTime, setPlayTime] = useState('00:00:00');
    /** 녹음 파일 전체 시간 */
    const [duration, setDuration] = useState('00:00:00');

    /** viewBar onPress 시, 발생하는 동작 */
    const onStatusPress = (e: any): void => {
        const touchX = e.nativeEvent.locationX;
        console.log(`touchX: ${touchX}`);

        const playWidth = (currentPositionSec / currentDurationSec) * standardWidth(300);
        console.log(`currentPlayWidth: ${playWidth}`);

        const currentPosition = Math.round(currentPositionSec);

        if (playWidth && playWidth < touchX) {
            const addSecs = Math.round(currentPosition + 1000);
            audioRecorderPlayer.seekToPlayer(addSecs);
            console.log(`addSecs: ${addSecs}`);
        } else {
            const subSecs = Math.round(currentPosition - 1000);
            audioRecorderPlayer.seekToPlayer(subSecs);
            console.log(`subSecs: ${subSecs}`);
        }
    };
    /** 녹음 시작 */
    const onStartRecord = async (): Promise<void> => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                console.log('write external storage', grants);

                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('permissions granted');
                } else {
                    console.log('All required permissions not granted');

                    return;
                }
            } catch (err) {
                console.warn(err);

                return;
            }
        }

        const audioSet: AudioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
            OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
        };

        console.log('audioSet', audioSet);

        const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

        audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
            // console.log('record-back', e);
            setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
        });
        console.log(`uri: ${uri}`);
    };
    /** 녹음 중지 */
    const onPauseRecord = async (): Promise<void> => {
        try {
            const r = await audioRecorderPlayer.pauseRecorder();
            console.log(r);
        } catch (err) {
            console.log('pauseRecord', err);
        }
    };
    /** 녹음 재개 */
    const onResumeRecord = async (): Promise<void> => {
        await audioRecorderPlayer.resumeRecorder();
    };
    /** 녹음 종료 */
    const onStopRecord = async (): Promise<void> => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordTime('00:00:00');
        console.log(result);
    };
    /** 재생 시작 */
    const onStartPlay = async (): Promise<void> => {
        console.log('onStartPlay');
        //? Custom path
        // const msg = await audioRecorderPlayer.startPlayer(path);

        //? Default path
        const msg = await audioRecorderPlayer.startPlayer();
        const volume = await audioRecorderPlayer.setVolume(1.0);
        console.log(`file: ${msg}`, `volume: ${volume}`);

        audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
            setCurrentPositionSec(e.currentPosition);
            setCurrentDurationSec(e.duration);
            setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
        });
    };
    /** 재생 중지 */
    const onPausePlay = async (): Promise<void> => {
        await audioRecorderPlayer.pausePlayer();
    };
    /** 재생 재개 */
    const onResumePlay = async (): Promise<void> => {
        await audioRecorderPlayer.resumePlayer();
    };
    /** 재생 종료 */
    const onStopPlay = async (): Promise<void> => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setPlayTime('00:00:00');
        setPlayWidth(0);
    };
    /** 재생 viewBar 너비 */
    const [playWidth, setPlayWidth] = useState(0);

    useEffect(() => {
        if (currentPositionSec / currentDurationSec) {
            setPlayWidth((currentPositionSec / currentDurationSec) * standardWidth(300));
        }
    }, [currentDurationSec, currentPositionSec]);

    const showToast = () => {
        ToastAndroid.show('녹음 제출이 완료되었습니다', ToastAndroid.SHORT);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sampleTextWrapper}>
                <Text style={styles.sampleText}>
                    물방아 같은 심장의 고동을 들어 보라 청춘의 피는 끓는다 끓는 피에 뛰노는 심장은 거선의 기관과 같이
                    {'\n\n'}
                    가슴에 대고 물방아 같은 심장의 고동을 들어 보라 청춘의 피는 끓는다 끓는 피에 뛰노는 심장은 거선의
                    기관과 같이 힘있다 이것이다 인류의 역사를 꾸며 내려온 동력은 바로 이것이다 이성은 투명하되 얼음과
                    같으며 지혜는 날카로우나 갑 속에 든 칼이다 청춘의 끓는 피가 아니더면 인간이
                </Text>
            </View>
            <Text style={styles.titleText}>녹음</Text>
            <Text style={styles.textRecordCounter}>{recordTime}</Text>
            <View style={styles.viewRecorder}>
                <View style={styles.recordButtonWrapper}>
                    <Pressable
                        style={({ pressed }) => conditionalStyles(pressed, false).button}
                        onPress={() => onStartRecord()}>
                        <Text style={styles.text}>Record</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => conditionalStyles(pressed, true).button}
                        onPress={() => onPauseRecord()}>
                        <Text style={styles.text}>Pause</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => conditionalStyles(pressed, true).button}
                        onPress={() => onResumeRecord()}>
                        <Text style={styles.text}>Resume</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => conditionalStyles(pressed, true).button}
                        onPress={() => onStopRecord()}>
                        <Text style={styles.text}>Stop</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.viewPlayer}>
                <Text style={styles.titleText}>녹음 파일 확인</Text>
                <TouchableOpacity style={styles.viewBarWrapper} onPress={event => onStatusPress(event)}>
                    <View style={styles.viewBar}>
                        <View style={[styles.viewBarPlay, { width: playWidth }]} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.textCounter}>
                    {playTime} / {duration}
                </Text>
                <View style={styles.playButtonWrapper}>
                    <Pressable
                        style={({ pressed }) => conditionalStyles(pressed, false).button}
                        onPress={() => onStartPlay()}>
                        <Text style={styles.text}>Play</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => conditionalStyles(pressed, true).button}
                        onPress={() => onPausePlay()}>
                        <Text style={styles.text}>Pause</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => conditionalStyles(pressed, true).button}
                        onPress={() => onResumePlay()}>
                        <Text style={styles.text}>Resume</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => conditionalStyles(pressed, true).button}
                        onPress={() => onStopPlay()}>
                        <Text style={styles.text}>Stop</Text>
                    </Pressable>
                </View>
            </View>
            <Pressable
                style={styles.submitButton}
                onPress={() => {
                    showToast();
                    navigation.goBack();
                }}>
                <Text style={styles.submitButtonText}>녹음 제출</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background.primary,
        alignItems: 'center',
    },
    sampleTextWrapper: {
        marginHorizontal: standardWidth(30),
        borderColor: color.button.primary,
        borderRadius: standardWidth(4),
        marginTop: standardWidth(56),
        paddingVertical: standardHeight(12),
        paddingHorizontal: standardHeight(8),
        borderWidth: 1,
    },
    sampleText: {
        color: color.text.primary1,
        fontSize: standardFontSize(16),
    },
    titleText: {
        color: color.text.primary1,
        fontSize: standardFontSize(18),
        fontWeight: 'bold',
        marginTop: standardHeight(24),
    },
    viewRecorder: {
        width: standardWidth(360),
        alignItems: 'center',
    },
    recordButtonWrapper: {
        flexDirection: 'row',
        marginTop: standardHeight(8),
    },
    viewPlayer: {
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    viewBarWrapper: {
        marginHorizontal: standardWidth(30),
        alignSelf: 'stretch',
        marginTop: standardHeight(8),
    },
    viewBar: {
        backgroundColor: color.text.hint,
        height: standardHeight(4),
        alignSelf: 'stretch',
    },
    viewBarPlay: {
        backgroundColor: color.button.primary,
        height: standardHeight(4),
        width: 0,
    },
    playStatusText: {
        marginTop: 8,
        color: color.text.hint,
    },
    playButtonWrapper: {
        flexDirection: 'row',
        marginTop: standardHeight(8),
    },
    button: {
        borderColor: color.button.primary,
        borderWidth: 1,
    },
    text: {
        color: color.text.main,
        fontSize: standardFontSize(14),
        marginHorizontal: standardWidth(8),
        marginVertical: standardHeight(4),
    },
    textRecordCounter: {
        color: color.text.secondary1,
        fontSize: 20,
        textAlignVertical: 'center',
        fontWeight: '200',
        letterSpacing: 2,
        marginTop: standardHeight(8),
    },
    textCounter: {
        color: color.text.secondary1,
        fontSize: 20,
        textAlignVertical: 'center',
        fontWeight: '200',
        letterSpacing: 2,
        marginTop: standardHeight(8),
    },
    submitButton: {
        width: standardWidth(310),
        height: standardHeight(40),
        backgroundColor: color.button.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: standardWidth(4),
        marginTop: standardHeight(24),
    },
    submitButtonText: {
        fontSize: standardFontSize(18),
        color: color.text.button,
        fontWeight: 'bold',
    },
});

const conditionalStyles = (pressed: boolean, isMarginLeft: boolean) =>
    StyleSheet.create({
        button: {
            borderColor: color.button.primary,
            borderWidth: 1,
            marginLeft: isMarginLeft ? standardWidth(12) : 0,
            opacity: pressed ? 0.5 : 1,
        },
    });

export default Record;

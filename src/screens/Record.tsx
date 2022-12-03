import React, { useEffect, useMemo, useState } from 'react';
import { PermissionsAndroid, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
    OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import type { AudioSet, PlayBackType, RecordBackType } from 'react-native-audio-recorder-player';
import { standardWidth } from 'styles';

/** 녹음 화면 */
const Record = () => {
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

                console.log('write external stroage', grants);

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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>Audio Recorder Player</Text>
            <Text style={styles.textRecordCounter}>{recordTime}</Text>
            <View style={styles.viewRecorder}>
                <View style={styles.recordButtonWrapper}>
                    <Pressable onPress={() => onStartRecord()}>
                        <Text style={styles.button}>Record</Text>
                    </Pressable>
                    <Pressable onPress={() => onPauseRecord()}>
                        <Text
                            style={[
                                styles.button,
                                {
                                    marginLeft: 12,
                                },
                            ]}>
                            Pause
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => onResumeRecord()}>
                        <Text
                            style={[
                                styles.button,
                                {
                                    marginLeft: 12,
                                },
                            ]}>
                            Resume
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => onStopRecord()}>
                        <Text style={[styles.button, { marginLeft: 12 }]}>Stop</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.viewPlayer}>
                <TouchableOpacity style={styles.viewBarWrapper} onPress={event => onStatusPress(event)}>
                    <View style={styles.viewBar}>
                        <View style={[styles.viewBarPlay, { width: playWidth }]} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.textCounter}>
                    {playTime} / {duration}
                </Text>
                <View style={styles.playButtonWrapper}>
                    <Pressable onPress={() => onStartPlay()}>
                        <Text style={styles.button}>Play</Text>
                    </Pressable>
                    <Pressable onPress={() => onPausePlay()}>
                        <Text
                            style={[
                                styles.button,
                                {
                                    marginLeft: 12,
                                },
                            ]}>
                            Pause
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => onResumePlay()}>
                        <Text
                            style={[
                                styles.button,
                                {
                                    marginLeft: 12,
                                },
                            ]}>
                            Resume
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => onStopPlay()}>
                        <Text
                            style={[
                                styles.button,
                                {
                                    marginLeft: 12,
                                },
                            ]}>
                            Stop
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455A64',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleText: {
        marginTop: 100,
        color: 'white',
        fontSize: 28,
    },
    viewRecorder: {
        marginTop: 40,
        width: '100%',
        alignItems: 'center',
    },
    recordButtonWrapper: {
        flexDirection: 'row',
    },
    viewPlayer: {
        marginTop: 60,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    viewBarWrapper: {
        marginTop: 28,
        marginHorizontal: standardWidth(30),
        alignSelf: 'stretch',
    },
    viewBar: {
        backgroundColor: '#ccc',
        height: 4,
        alignSelf: 'stretch',
    },
    viewBarPlay: {
        backgroundColor: 'white',
        height: 4,
        width: 0,
    },
    playStatusText: {
        marginTop: 8,
        color: '#ccc',
    },
    playButtonWrapper: {
        flexDirection: 'row',
        marginTop: 40,
    },
    button: {
        borderColor: 'white',
        borderWidth: 1,
    },
    text: {
        color: 'white',
        fontSize: 14,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    textRecordCounter: {
        marginTop: 32,
        color: 'white',
        fontSize: 20,
        textAlignVertical: 'center',
        fontWeight: '200',
        letterSpacing: 3,
    },
    textCounter: {
        marginTop: 12,
        color: 'white',
        fontSize: 20,
        textAlignVertical: 'center',
        fontWeight: '200',
        letterSpacing: 3,
    },
});

export default Record;

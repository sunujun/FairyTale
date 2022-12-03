import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { RouteProp, useRoute } from '@react-navigation/native';
import { PlayerControls, Progress, TrackInfo } from 'components';
import { useCurrentTrack } from 'hooks';
import { SetupService } from 'services';
import { RootStackParamList } from 'navigation';
import { standardHeight } from 'styles';

type HomeTabRouteProp = RouteProp<RootStackParamList, 'Player'>;

/** 재생 화면 */
const Player = () => {
    const route = useRoute<HomeTabRouteProp>();
    const track = useCurrentTrack();
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    useEffect(() => {
        async function run() {
            const isSetup = await SetupService();
            setIsPlayerReady(isSetup);

            const queue = await TrackPlayer.getQueue();
            if (isSetup && queue.length <= 0) {
                TrackPlayer.add(route.params?.bookData);
            }
        }

        run();

        return () => {
            TrackPlayer.reset();
        };
    }, [route.params?.bookData]);

    if (!isPlayerReady) {
        return (
            <SafeAreaView style={styles.screenContainer}>
                <ActivityIndicator />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.contentContainer}>
                <TrackInfo track={track} />
                <Progress live={track?.isLiveStream} />
            </View>
            <View style={styles.actionRowContainer}>
                <PlayerControls />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#212121',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 3,
        alignItems: 'center',
        paddingTop: standardHeight(56),
    },
    actionRowContainer: {
        flex: 1,
        flexDirection: 'row',
    },
});

export default Player;

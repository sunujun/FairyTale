import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { color, standardHeight, standardWidth } from 'styles';

export const Progress: React.FC<{ live?: boolean }> = ({ live }) => {
    const progress = useProgress();
    return live ? (
        <View style={styles.liveContainer}>
            <Text style={styles.liveText}>Live Stream</Text>
        </View>
    ) : (
        <>
            <Slider
                style={styles.container}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                thumbTintColor={color.button.primary}
                minimumTrackTintColor={color.button.primary}
                maximumTrackTintColor={color.text.primary1}
                onSlidingComplete={TrackPlayer.seekTo}
            />
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{new Date(progress.position * 1000).toISOString().slice(14, 19)}</Text>
                <Text style={styles.labelText}>
                    {new Date((progress.duration - progress.position) * 1000).toISOString().slice(14, 19)}
                </Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    liveContainer: {
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
    },
    liveText: {
        color: color.text.primary1,
        alignSelf: 'center',
        fontSize: 18,
    },
    container: {
        height: standardHeight(40),
        width: standardWidth(360),
        marginTop: standardHeight(48),
        flexDirection: 'row',
    },
    labelContainer: {
        width: standardWidth(336),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelText: {
        color: color.text.primary1,
    },
});

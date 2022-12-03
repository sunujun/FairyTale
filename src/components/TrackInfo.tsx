import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import type { Track } from 'react-native-track-player';
import { color } from 'styles';

export interface TrackInfoProps {
    track?: Track;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({ track }) => {
    return (
        <View style={styles.container}>
            <FastImage source={track?.artwork as number} style={styles.artwork} />
            <Text style={styles.titleText}>{track?.title}</Text>
            <Text style={styles.artistText}>{track?.artist}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    artwork: {
        width: 240,
        height: 240,
        marginTop: 30,
        backgroundColor: color.background.secondary,
    },
    titleText: {
        fontSize: 18,
        fontWeight: '600',
        color: color.text.primary2,
        marginTop: 30,
    },
    artistText: {
        fontSize: 16,
        fontWeight: '200',
        color: color.text.primary1,
    },
});

import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { State, usePlaybackState } from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useOnTogglePlayback, useDebouncedValue } from 'hooks';
import { color } from 'styles';

export const PlayPauseButton: React.FC = () => {
    const state = usePlaybackState();
    const isPlaying = state === State.Playing;
    const isLoading = useDebouncedValue(state === State.Connecting || state === State.Buffering, 250);

    const onTogglePlayback = useOnTogglePlayback();

    if (isLoading) {
        return <View style={styles.statusContainer}>{isLoading && <ActivityIndicator />}</View>;
    }

    return (
        <Pressable onPress={onTogglePlayback}>
            {isPlaying ? (
                <Ionicons color={color.button.primary} name="pause" size={52} />
            ) : (
                <Ionicons color={color.button.primary} name="play" size={52} />
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    playPause: {
        width: 120,
        textAlign: 'center',
    },
    statusContainer: {
        height: 40,
        width: 120,
        marginTop: 20,
        marginBottom: 60,
    },
});

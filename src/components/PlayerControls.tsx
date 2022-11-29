import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PlayPauseButton } from 'components';

export const PlayerControls: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <PlayPauseButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

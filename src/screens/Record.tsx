import React from 'react';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** 녹음 화면 */
const Record = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={() => {}}>
                <Text>녹음</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default Record;

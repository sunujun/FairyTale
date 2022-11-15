import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** 설정 화면 */
export default function Settings() {
    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={{ flex: 1 }}>
            <Text>설정</Text>
        </SafeAreaView>
    );
}

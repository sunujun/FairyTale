import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** 홈 화면 */
export default function Home() {
    return (
        <SafeAreaView mode="margin" style={{ flex: 1 }}>
            <Text>홈</Text>
        </SafeAreaView>
    );
}

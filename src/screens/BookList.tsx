import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** 책 목록 화면 */
export default function BookList() {
    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={{ flex: 1 }}>
            <Text>책 목록</Text>
        </SafeAreaView>
    );
}

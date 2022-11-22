import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** 즐겨찾기 화면 */
export default function Favorites() {
    return (
        <SafeAreaView mode="margin" edges={['right', 'left', 'bottom']} style={{ flex: 1 }}>
            <Text>즐겨찾기</Text>
        </SafeAreaView>
    );
}

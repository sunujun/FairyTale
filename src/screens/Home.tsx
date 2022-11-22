import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OctIcons from 'react-native-vector-icons/Octicons';
import { standardFontSize, standardHeight, standardWidth } from 'styles';

/** 홈 화면 */
const Home = () => {
    return (
        <SafeAreaView mode="margin" style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <OctIcons name="search" size={standardFontSize(18)} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="검색어를 입력하세요"
                        inlineImageLeft="search_icon"
                    />
                </View>
            </View>
            <Text>홈</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: standardHeight(16),
        alignItems: 'center',
    },
    searchBox: {
        borderRadius: 4,
        borderColor: '#999999',
        borderWidth: 2,
        width: standardWidth(320),
        height: standardHeight(44),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: standardWidth(16),
    },
    searchInput: {
        fontWeight: 'bold',
        fontSize: standardFontSize(18),
        height: standardHeight(44),
        marginLeft: standardWidth(8),
    },
});

export default Home;

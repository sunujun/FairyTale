import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OctIcons from 'react-native-vector-icons/Octicons';
import { standardFontSize, standardHeight, standardWidth } from 'styles';

/** 홈 화면 */
const Home = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <SafeAreaView mode="margin" style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <OctIcons name="search" size={standardFontSize(18)} />
                    <TextInput
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                        placeholder="검색어를 입력하세요"
                        inlineImageLeft="search_icon"
                    />
                    {searchText !== '' && (
                        <Pressable onPress={() => setSearchText('')}>
                            <OctIcons name="x-circle-fill" size={standardFontSize(20)} />
                        </Pressable>
                    )}
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
        width: standardWidth(240),
        marginHorizontal: standardWidth(8),
    },
});

export default Home;
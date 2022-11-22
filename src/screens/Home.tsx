import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OctIcons from 'react-native-vector-icons/Octicons';
import { standardFontSize, standardHeight, standardWidth } from 'styles';

interface FilterButtonProps {
    /** key  */
    key: string;
    /** label */
    label: string;
}

/** 홈 화면 */
const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [filterOption, setFilterOption] = useState('all');

    const filterData: FilterButtonProps[] = [
        {
            key: 'all',
            label: '전체',
        },
        {
            key: 'read',
            label: '읽은 책',
        },
        {
            key: 'before',
            label: '읽기 전',
        },
        {
            key: 'english',
            label: '영어 지원',
        },
        {
            key: 'favorites',
            label: '관심',
        },
    ];
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
                    />
                    {searchText !== '' && (
                        <Pressable onPress={() => setSearchText('')}>
                            <OctIcons name="x-circle-fill" size={standardFontSize(20)} />
                        </Pressable>
                    )}
                </View>
                <View style={styles.filterList}>
                    {filterData.map(item => {
                        return (
                            <Pressable
                                onPress={() => setFilterOption(item.key)}
                                style={
                                    filterOption === item.key ? styles.selectedFilterBox : styles.unselectedFilterBox
                                }>
                                <Text
                                    style={
                                        filterOption === item.key
                                            ? styles.selectedFilterText
                                            : styles.unselectedFilterText
                                    }>
                                    {item.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
                <View>
                    <Text>책 리스트</Text>
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
    filterList: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: standardHeight(12),
        marginLeft: standardWidth(20),
    },
    selectedFilterBox: {
        width: standardWidth(60),
        height: standardHeight(28),
        borderWidth: 1,
        borderColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -1,
        elevation: 1,
    },
    unselectedFilterBox: {
        width: standardWidth(60),
        height: standardHeight(28),
        borderWidth: 1,
        borderColor: '#999999',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -1,
    },
    selectedFilterText: {
        fontWeight: 'bold',
        fontSize: standardFontSize(12),
        color: 'blue',
    },
    unselectedFilterText: {
        fontWeight: 'bold',
        fontSize: standardFontSize(12),
        color: '#999999',
    },
});

export default Home;

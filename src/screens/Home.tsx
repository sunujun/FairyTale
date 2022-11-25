import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OctIcons from 'react-native-vector-icons/Octicons';
import { standardFontSize, standardHeight, standardWidth } from 'styles';

interface FilterButtonProps {
    /** key  */
    key: string;
    /** label */
    label: string;
}

interface BookProps {
    /** key  */
    key: string;
    /** 제목 */
    title: string;
}

/** 홈 화면 */
const Home = () => {
    /** 책 이름 검색 */
    const [searchText, setSearchText] = useState('');
    /** 선택된 필터 옵션 */
    const [filterOption, setFilterOption] = useState('all');
    /** 필터 종류 */
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
    /** FIXME: 임시 책 데이터: 서버에서 받아와야함 */
    const bookData: BookProps[] = [
        {
            key: 'heung',
            title: '흥부전',
        },
        {
            key: 'byeol',
            title: '별주부전',
        },
        {
            key: 'kong',
            title: '콩쥐팥쥐',
        },
        {
            key: 'bro',
            title: '의좋은 형제',
        },
        {
            key: 'chun',
            title: '춘향전',
        },
        {
            key: 'gold',
            title: '금도끼 은도끼',
        },
        {
            key: 'wood',
            title: '선녀와 나무꾼',
        },
        {
            key: 'sim',
            title: '심청전',
        },
        {
            key: 'cinderella',
            title: '신데렐라',
        },
        {
            key: 'sleep',
            title: '잠자는 숲 속의 공주',
        },
    ];

    const renderItem = useCallback(({ item }: { item: BookProps }) => {
        return (
            <Pressable>
                <View style={styles.bookList}>
                    <Text>{item.title}</Text>
                </View>
            </Pressable>
        );
    }, []);

    const keyExtractor = useCallback((item: BookProps) => {
        return item.key;
    }, []);

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
                                key={item.key}
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
                <FlatList
                    data={bookData}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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
    separator: {
        backgroundColor: '#999999',
        height: 1,
    },
    bookList: {
        width: standardWidth(360),
        height: standardHeight(40),
        justifyContent: 'center',
        paddingLeft: standardWidth(20),
    },
});

export default Home;

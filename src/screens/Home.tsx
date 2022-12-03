import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from 'navigation';
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
    /** 아티스트 */
    artist: string;
    url: any;
}

type HomeStackProp = StackNavigationProp<HomeStackParamList, 'Home'>;

/** 홈 화면 */
const Home = () => {
    /** 책 이름 검색 */
    const [searchText, setSearchText] = useState('');
    /** 선택된 필터 옵션 */
    const [filterOption, setFilterOption] = useState('all');
    const navigation = useNavigation<HomeStackProp>();
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
            key: 'Kongjwi Patjwi',
            title: '콩쥐팥쥐',
            artist: '한국전래동화',
            url: require('mp3/Kongjwi_Patjwi.mp3'),
        },
        {
            key: 'Cinderella',
            title: '신데렐라',
            artist: '외국전래동화',
            url: require('mp3/Cinderella.mp3'),
        },
        {
            key: 'The Little Mermaid',
            title: '인어공주',
            url: require('mp3/The_Little_Mermaid.mp3'),
            artist: '외국전래동화',
        },
        {
            key: 'custom',
            title: '커스텀보이스',
            url: require('mp3/custom.mp3'),
            artist: '커스텀보이스',
        },
    ];

    const renderItem = useCallback(
        ({ item }: { item: BookProps }) => {
            return (
                <Pressable
                    onPress={() => {
                        navigation.navigate('Player', { bookData: item });
                    }}>
                    <View style={styles.bookList}>
                        <Text>{item.title}</Text>
                    </View>
                </Pressable>
            );
        },
        [navigation],
    );

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
        borderColor: '#036B3F',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -1,
        zIndex: 1,
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
        color: '#036B3F',
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

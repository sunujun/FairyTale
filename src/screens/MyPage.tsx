import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import { useSelector } from 'react-redux';
import { color, standardFontSize, standardHeight, standardWidth } from 'styles';
import { RootState } from 'redux/store/reducers';
import { useAppDispatch } from 'redux/store';
import userSlice from 'redux/slices/user';

/** 내 정보 화면 */
const MyPage = () => {
    const dispatch = useAppDispatch();
    /** 현재 앱의 버전 체크 */
    const currentVersion = DeviceInfo.getVersion();
    /** 사용자 아이디 */
    const userId = useSelector((state: RootState) => state.user.email);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.informationWrapper}>
                <Text style={styles.identifierText}>{userId} 님</Text>
                <View style={styles.subscriptButton}>
                    <Text style={styles.subscriptButtonText}>구독 시작하기</Text>
                </View>
            </View>
            <View style={styles.listWrapper}>
                <Pressable style={styles.listButton}>
                    <Text style={styles.listText}>내 정보 관리</Text>
                </Pressable>
                <Pressable style={styles.listButton}>
                    <Text style={styles.listText}>알림 설정</Text>
                </Pressable>
            </View>
            <View style={styles.listWrapper}>
                <Pressable style={styles.listButton}>
                    <Text style={styles.listText}>고객센터</Text>
                </Pressable>
                <Pressable style={styles.listButton}>
                    <Text style={styles.listText}>약관 및 정책</Text>
                </Pressable>
                <Pressable style={styles.listButton}>
                    <Text style={styles.listBoldText}>개인정보처리방침</Text>
                </Pressable>
                <Pressable style={styles.listButton}>
                    <Text style={styles.listText}>
                        앱버전 {'('}
                        {currentVersion}
                        {')'}
                    </Text>
                </Pressable>
                <Pressable style={styles.listButton}>
                    <Text style={styles.listText}>오픈소스 라이선스</Text>
                </Pressable>
            </View>
            <View style={styles.listWrapper}>
                <Pressable
                    style={styles.listButton}
                    onPress={() => {
                        dispatch(
                            userSlice.actions.setUser({
                                email: '',
                            }),
                        );
                    }}>
                    <Text style={styles.listColorText}>로그아웃</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background.secondary,
    },
    informationWrapper: {
        backgroundColor: color.background.primary,
        marginBottom: standardHeight(24),
        paddingVertical: standardHeight(20),
        paddingHorizontal: standardWidth(16),
    },
    identifierText: {
        color: color.text.primary2,
        fontSize: standardFontSize(20),
        fontWeight: 'bold',
    },
    subscriptButton: {
        width: standardWidth(328),
        height: standardHeight(32),
        backgroundColor: color.button.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: standardWidth(4),
        marginTop: standardHeight(24),
        alignSelf: 'center',
    },
    subscriptButtonText: {
        fontSize: standardFontSize(14),
        color: color.text.button,
        fontWeight: 'bold',
    },
    listWrapper: {
        marginBottom: standardHeight(10),
    },
    listButton: {
        width: standardWidth(360),
        height: standardHeight(36),
        backgroundColor: color.background.primary,
        justifyContent: 'center',
        paddingHorizontal: standardWidth(16),
        marginBottom: 1,
    },
    listText: {
        color: color.text.primary2,
        fontSize: standardFontSize(16),
    },
    listBoldText: {
        color: color.text.primary2,
        fontSize: standardFontSize(16),
        fontWeight: 'bold',
    },
    listColorText: {
        color: color.text.main,
        fontSize: standardFontSize(16),
    },
});

export default MyPage;

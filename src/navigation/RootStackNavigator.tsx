import React, { useState } from 'react';
import { Pressable, StatusBar, StyleSheet, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color, standardWidth } from 'styles';
import { MainTabNavigator, RootStackParamList, SignInStackNavigator, SignUpStackNavigator } from 'navigation';
import { BookInformation, FrontScreen, Record } from 'screens';
import { RootState } from 'redux/store/reducers';

/** https://reactnavigation.org/docs/typescript/#type-checking-the-navigator */
const Stack = createStackNavigator<RootStackParamList>();

/** 초기 화면 */
const RootStackNavigator = () => {
    /** 로그인 체크 */
    const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
    /** 관심 동화 */
    const [isInterested, setIsInterested] = useState(false);

    const showToast = (prevState: boolean) => {
        if (prevState) {
            ToastAndroid.show('관심 동화에서 삭제되었습니다', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('관심 동화로 등록되었습니다', ToastAndroid.SHORT);
        }
    };
    // 앱 실행 시 토큰 존재하면 로그인 활성화
    // useEffect(() => {
    //     const getTokenAndRefresh = async () => {
    //         try {
    //             const token = await EncryptedStorage.getItem('refreshToken');
    //             if (!token) {
    //                 return; // 없으면 탈출
    //             }
    //             // 있으면 아래 경로로 토큰 쏴주고, 받아온 값을 리덕스로 보관
    //             const response = await axios.post(
    //                 `${Config.API_URL}/refreshToken`,
    //                 {},
    //                 {
    //                     headers: {
    //                         authorization: `Bearer ${token}`,
    //                     },
    //                 },
    //             );
    //             dispatch(
    //                 userSlice.actions.setUser({
    //                     name: response.data.data.name,
    //                     email: response.data.data.email,
    //                     accessToken: response.data.data.accessToken,
    //                 }),
    //             );
    //         } catch (error) {
    //             console.log('RootStack - useEffect - Error : ', error);
    //             if (error.response?.data.code === 'expired') {
    //                 Alert.alert('알림', '다시 로그인 해주세요.');
    //             }
    //         } finally {
    //             // 로딩 화면으로 splash-screen 추가 예정
    //         }
    //     };
    //     getTokenAndRefresh();
    // }, [dispatch]);

    return !isLoggedIn ? (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="FrontScreen" component={FrontScreen} />
            <Stack.Screen
                name="SignUp"
                component={SignUpStackNavigator}
                options={{
                    ...TransitionPresets.FadeFromBottomAndroid,
                }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignInStackNavigator}
                options={{
                    ...TransitionPresets.FadeFromBottomAndroid,
                }}
            />
        </Stack.Navigator>
    ) : (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack.Navigator>
                <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Record"
                    component={Record}
                    options={({ navigation }) => ({
                        headerTransparent: true,
                        headerTitle: '',
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.goBack()}>
                                <MaterialIcons
                                    color={color.button.primary}
                                    name="arrow-back-ios"
                                    size={26}
                                    style={styles.headerLeft}
                                />
                            </Pressable>
                        ),
                        ...TransitionPresets.FadeFromBottomAndroid,
                    })}
                />
                <Stack.Screen
                    name="BookInformation"
                    component={BookInformation}
                    options={({ navigation }) => ({
                        headerTransparent: true,
                        headerTitle: '',
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.goBack()}>
                                <MaterialIcons
                                    color={color.button.primary}
                                    name="arrow-back-ios"
                                    size={26}
                                    style={styles.headerLeft}
                                />
                            </Pressable>
                        ),
                        headerRight: () => (
                            <Pressable
                                onPress={() => {
                                    setIsInterested(prev => {
                                        showToast(prev);
                                        return !prev;
                                    });
                                }}>
                                {isInterested ? (
                                    <AntDesign
                                        color={color.button.primary}
                                        name="star"
                                        size={26}
                                        style={styles.headerRight}
                                    />
                                ) : (
                                    <AntDesign
                                        color={color.button.primary}
                                        name="staro"
                                        size={26}
                                        style={styles.headerRight}
                                    />
                                )}
                            </Pressable>
                        ),
                        ...TransitionPresets.FadeFromBottomAndroid,
                    })}
                />
            </Stack.Navigator>
        </>
    );
};

const styles = StyleSheet.create({
    headerLeft: {
        marginLeft: standardWidth(20),
    },
    headerRight: {
        marginRight: standardWidth(20),
    },
});

export default RootStackNavigator;

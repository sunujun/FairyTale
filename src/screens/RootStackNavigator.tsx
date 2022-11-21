import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { MainTabNavigator, RootStackParamList, SignInStackNavigator, SignUpStackNavigator } from 'navigation';
import { FrontScreen } from 'screens';
import { useAppDispatch } from 'redux/store/index';
import { RootState } from 'redux/store/reducers';

/** https://reactnavigation.org/docs/typescript/#type-checking-the-navigator */
const Stack = createStackNavigator<RootStackParamList>();

/** 초기 화면 */
export default function RootStackNavigator() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector((state: RootState) => !!state.user.email);

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
            <>
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
            </>
        </Stack.Navigator>
    ) : (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name="Main"
                component={MainTabNavigator}
                // options={{
                //     ...TransitionPresets.FadeFromBottomAndroid,
                // }}
            />
        </Stack.Navigator>
    );
}

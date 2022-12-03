import React from 'react';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch } from 'redux/store';
import userSlice from 'redux/slices/user';

/** 설정 화면 */
const Settings = () => {
    const dispatch = useAppDispatch();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                onPress={() => {
                    dispatch(
                        userSlice.actions.setUser({
                            email: '',
                        }),
                    );
                }}>
                <Text>로그아웃</Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default Settings;

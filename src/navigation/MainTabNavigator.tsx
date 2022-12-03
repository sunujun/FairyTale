import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStackNavigator, MainTabParamList } from 'navigation';
import { MyPage, RecordStart } from 'screens';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

/** Main Navigation */
const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            shifting={true}
            activeColor="#f0edf6"
            inactiveColor="#f0edf6aa"
            screenOptions={{ tabBarColor: '#036B3F' }}>
            <Tab.Screen
                name="HomeNavigator"
                component={HomeStackNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="RecordStart"
                component={RecordStart}
                options={{
                    tabBarLabel: 'Record',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="microphone" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="MyPage"
                component={MyPage}
                options={{
                    tabBarLabel: 'MyPage',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
                }}
            />
            {/* 추가되는 페이지는 밑에다가 작성 */}
        </Tab.Navigator>
    );
};

export default MainTabNavigator;

import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStackNavigator, MainTabParamList } from 'navigation';
import { Record, Settings } from 'screens';

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
                name="Record"
                component={Record}
                options={{
                    tabBarLabel: 'Record',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="record-rec" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" color={color} size={26} />,
                }}
            />
            {/* 추가되는 페이지는 밑에다가 작성 */}
        </Tab.Navigator>
    );
};

export default MainTabNavigator;

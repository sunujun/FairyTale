import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainTabParamList } from 'navigation';
import { BookList, Settings } from 'screens';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

/** Main Navigation */
function MainTabNavigator() {
    return (
        <Tab.Navigator activeColor="#f0edf6" inactiveColor="#3e2465" backBehavior="none">
            <Tab.Screen
                name="BookList"
                component={BookList}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                }}
            />
            <Tab.Screen
                name="Search"
                component={Settings}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-search" color={color} size={26} />,
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
}

export default MainTabNavigator;

import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainTabParamList } from 'navigation';
import { Home, MyPage, RecordStart } from 'screens';
import { color } from 'styles';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

/** Main Navigation */
const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            shifting={true}
            activeColor="#F0EDF6"
            inactiveColor="#F0EDF6AA"
            screenOptions={{ tabBarColor: color.button.primary }}>
            <Tab.Screen
                name="Home"
                component={Home}
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

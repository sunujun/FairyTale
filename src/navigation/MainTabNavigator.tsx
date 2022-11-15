import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MainTabParamList } from 'navigation';
import { BookList, Settings } from 'screens';

const Tab = createMaterialBottomTabNavigator<MainTabParamList>();

/** Main Navigation */
function MainTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="BookList" component={BookList} />
            <Tab.Screen name="Settings" component={Settings} />
            {/* 추가되는 페이지는 밑에다가 작성 */}
        </Tab.Navigator>
    );
}

export default MainTabNavigator;

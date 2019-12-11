import Encyclopedia from '../screen/Encyclopedia';
import { Ionicons } from '@expo/vector-icons';
import LabNavigator from './LabNavigator';
import React from 'react';
import Settings from '../screen/Settings';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const iconDict = {
  Lab: 'ios-flask',
  Encyclopedia: 'ios-bookmarks',
  Settings: 'ios-settings',
};

export default createMaterialBottomTabNavigator(
  {
    Lab: {
      screen: LabNavigator,
      navigationOptions: {
        tabBarColor: '#694fad',
      },
    },
    Encyclopedia: {
      screen: Encyclopedia,
      navigationOptions: {
        tabBarColor: '#4d80e4',
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarColor: '#5a8a68',
      },
    },
  },
  {
    shifting: true,
    initialRouteName: 'Lab',
    activeColor: '#d6d6d6',
    inactiveColor: '#363636',
    barStyle: { backgroundColor: '#694fad' },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = iconDict[routeName];

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

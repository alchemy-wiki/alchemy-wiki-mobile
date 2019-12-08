import Encyclopedia from '../screen/Encyclopedia';
import Home from '../screen/Home';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Setting from '../screen/Setting';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const iconDict = {
  Home: 'ios-flask',
  Encyclopedia: 'ios-bookmarks',
  Setting: 'ios-settings',
};

export default createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
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
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarColor: '#5a8a68',
      },
    },
  },
  {
    shifting: true,
    initialRouteName: 'Home',
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

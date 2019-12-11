import { Animated, Easing } from 'react-native';

import Lab from '../screen/Lab';
import Storage from '../screen/Storage';
import { createStackNavigator } from 'react-navigation-stack';

export default createStackNavigator(
  {
    Lab: { screen: Lab },
    Storage: { screen: Storage },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: true,
      gestureResponseDistance: {
        vertical: 1000,
        horizontal: 0,
      },
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 1000,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: [0, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  },
);

import HomeNavigator from './HomeNavigator';
import Loading from '../screen/Loading';
import { createSwitchNavigator } from 'react-navigation';

export default createSwitchNavigator(
  {
    Loading: Loading,
    Home: HomeNavigator,
  },
  {
    initialRouteName: 'Loading',
  },
);

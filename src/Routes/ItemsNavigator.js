import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Routes from './Routes';
import ShirtSelect from '../Screens/ShirtSelect';
import PantsSelect from '../Screens/PantsSelect';
import ShoesSelect from '../Screens/ShoesSelect';

export default createBottomTabNavigator(
  {
    [Routes.Screens.SHIRT_SELECT.routeName]: {
      screen: ShirtSelect,
    },
    [Routes.Screens.PANTS_SELECT.routeName]: {
      screen: PantsSelect,
    },
    [Routes.Screens.SHOES_SELECT.routeName]: {
      screen: ShoesSelect,
    },
  },
  {
    initialRouteName: Routes.Screens.SHIRT_SELECT.routeName,
  },
);

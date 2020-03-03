import React from 'react';
import {createAppContainer} from 'react-navigation';
import Routes from './Routes';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ShirtSelect from '../Screens/ShirtSelect';
import PantsSelect from '../Screens/PantsSelect';
import ShoesSelect from '../Screens/ShoesSelect';
import MainNavigator from './MainNavigator';
import Select from '../Screens/Select';
import Drawer from '../components/Drawer';

export default createAppContainer(
  createDrawerNavigator(
    {
      [Routes.Navigators.MAIN.routeName]: {
        screen: MainNavigator,
      },
      [Routes.Screens.SHIRT_SELECT.routeName]: {
        screen: ShirtSelect,
      },
      [Routes.Screens.PANTS_SELECT.routeName]: {
        screen: PantsSelect,
      },
      [Routes.Screens.SHOES_SELECT.routeName]: {
        screen: ShoesSelect,
      },
      [Routes.Screens.SELECT.routeName]: {
        screen: Select,
      },
    },
    {
      initialRouteName: Routes.Navigators.MAIN.routeName,
        contentComponent: Drawer
    },
  ),
);

import React from 'react';
import {createAppContainer} from 'react-navigation';
import Routes from './Routes';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MainNavigator from './MainNavigator';
import Select from '../Screens/Select';
import Drawer from '../components/Drawer';

export default createAppContainer(
  createDrawerNavigator(
    {
      [Routes.Navigators.MAIN.routeName]: {
        screen: MainNavigator,
      },
      [Routes.Screens.SELECT.routeName]: {
        screen: Select,
      },
    },
    {
      initialRouteName: Routes.Navigators.MAIN.routeName,
      contentComponent: Drawer,
    },
  ),
);

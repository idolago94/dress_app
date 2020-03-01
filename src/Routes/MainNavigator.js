import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Routes from './Routes';
import Home from '../Screens/Home';
import CompleteSet from '../Screens/CompleteSet';
import ItemsNavigator from './ItemsNavigator';

export default createAppContainer(
  createStackNavigator(
    {
      [Routes.Navigators.ITEMS.routeName]: {
        screen: ItemsNavigator,
      },
      [Routes.Screens.HOME.routeName]: {
        screen: Home,
      },
      [Routes.Screens.COMPLETE_SET.routeName]: {
        screen: CompleteSet,
      },
    },
    {
      initialRouteName: Routes.Screens.HOME.routeName,
    },
  ),
);

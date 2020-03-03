import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Routes from './Routes';
import Home from '../Screens/Home';
import CompleteSet from '../Screens/CompleteSet';

export default createAppContainer(
  createStackNavigator(
    {
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

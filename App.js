import React, {Component} from 'react';

import {Provider} from 'mobx-react';
import ItemsStore from './src/mobx/ItemsStore';
import SetStore from './src/mobx/SetStore';
import DrawerNavigator from './src/Routes/DrawerNavigator';
import {View, Text} from 'react-native';

const App: () => React$Node = () => {
  return (
    <Provider items={ItemsStore} sets={SetStore}>
      <DrawerNavigator />
    </Provider>
  );
};


export default App;

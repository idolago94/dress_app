import React, {Component} from 'react';
import {Provider} from 'mobx-react';
import ItemsStore from './src/mobx/ItemsStore';
import SetStore from './src/mobx/SetStore';
import DrawerNavigator from './src/Routes/DrawerNavigator';
import {create} from 'mobx-persist';
import {AsyncStorage} from 'react-native';

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('setList', SetStore);
hydrate('newSet', SetStore);

const App: () => React$Node = () => {
  return (
    <Provider items={ItemsStore} sets={SetStore}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;

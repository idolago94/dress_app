import {observable, decorate, action} from 'mobx';
import {AsyncStorage} from 'react-native';

const storageKeys = {
  SETS: 'setList',
  NON_COMPLETED_SET: 'nonCompletedSet',
};

class SetStore {
  constructor() {
    AsyncStorage.getItem(storageKeys.SETS, (err, data) => {
      if (data) {
        this.setList = JSON.parse(data);
      }
    });

    AsyncStorage.getItem(storageKeys.NON_COMPLETED_SET, (err, data) => {
      if (data) {
        this.newSet = JSON.parse(data);
      }
    });
  }

  setList = [];
  newSet = {};

  addSet() {
    console.log('add set');
    this.setList.push(this.newSet);
    AsyncStorage.clear();
    AsyncStorage.setItem(storageKeys.SETS, JSON.stringify(this.setList));
    this.newSet = {};
  }

  setItemSet(itemType, item) {
    console.log('set item', item);
    this.newSet = {
      ...this.newSet,
      [itemType]: item,
    };
    AsyncStorage.setItem(
      storageKeys.NON_COMPLETED_SET,
      JSON.stringify(this.newSet),
    );
  }
}

decorate(SetStore, {
  setList: observable,
  newSet: observable,

  addSet: action,
  setItemSet: action,
});

export default new SetStore();

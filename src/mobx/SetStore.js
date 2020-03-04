import {observable, decorate, action, computed} from 'mobx';
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

  @observable setList = [];
  @observable newSet = {};

  @action
  addSet() {
    console.log('add set');
    this.setList.push(this.newSet);
    AsyncStorage.clear();
    AsyncStorage.setItem(storageKeys.SETS, JSON.stringify(this.setList));
    this.newSet = {};
  }

  @action
  setItemSet(itemType, item) {
    console.log('set item', item);
    console.log('type', itemType);
    this.newSet = {
      ...this.newSet,
      [itemType]: item,
    };
    AsyncStorage.setItem(
      storageKeys.NON_COMPLETED_SET,
      JSON.stringify(this.newSet),
    );
  }

  @computed
  get getList() {
    return this.setList.slice();
  }

  @computed
  get getNewSet() {
    return Object.assign({}, this.newSet);
  }
}

export default new SetStore();

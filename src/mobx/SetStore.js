import {observable, action, computed} from 'mobx';
import {create, persist} from 'mobx-persist';
import {AsyncStorage} from 'react-native';

const storageKeys = {
  SETS: 'setList',
  NON_COMPLETED_SET: 'nonCompletedSet',
};

class SetStore {

  @persist('list') @observable setList = [];
  @persist('object') @observable newSet = {};

  @action
  addSet() {
    console.log('add set');
    this.setList.push(this.newSet);
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

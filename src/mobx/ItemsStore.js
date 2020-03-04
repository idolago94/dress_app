import {observable, decorate, action, computed} from 'mobx';

class ItemsStore {
  @observable allItems = [];
  @observable shirt = [];
  @observable pants = [];
  @observable shoes = [];
  @observable types = ['shirt', 'pants', 'shoes'];

  @action
  fetchItems() {
    console.log('fetch items...');
    fetch('http://www.mocky.io/v2/5e3940013200005e00ddf87e')
      .then(res => res.json())
      .then(response => {
        this.allItems = response.results;
        this.types.map(ty => {
          this[ty] = response.results
            .filter(item => item.type == ty)
            .sort((a, b) => a.name.localeCompare(b.name));
        });
      });
  }

  @computed
  get getTypes() {
    return this.types.slice();
  }

  @computed
  get getItemsType() {
    return type => this[type].slice();
  }

  @computed
  get getAll() {
    return this.allItems.slice();
  }
}

export default new ItemsStore();

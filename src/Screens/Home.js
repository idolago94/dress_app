import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  Dimensions,
  TouchableHighlight, AsyncStorage,
} from 'react-native';
import Set from '../components/Set';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';
import Item from '../components/Item';
import Icon from 'react-native-vector-icons/FontAwesome5';


@inject('sets', 'items') @observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.itemTypes = ['shirt', 'pants', 'shoes'];
    this.state = {
      searchResults: [],
    };
  }

  async componentDidMount() {
    this.props.items.fetchItems();
  }

  onSaveSet() {
    this.props.sets.addSet();
    this.props.navigation.navigate(Routes.Screens.COMPLETE_SET.routeName);
  }

  handleSearch(text) {
    console.log(text);
    if (text.length > 2) {
      console.log('search...');
      let result = this.props.items.getAll.filter(item => {
        if (item.name.search(text) != -1) {
          return true;
        }
        if (item.brand.search(text) != -1) {
          return true;
        }
        if (item.colors.find(c => c.search(text) != -1)) {
          return true;
        }
        return false;
      });
      this.setState({searchResults: result});
    } else {
      console.log('default');
      let defaultResults = this.props.items.getAll.slice(0, 5);
      this.setState({searchResults: defaultResults});
    }
  }

  onAddItem(type, item) {
    console.log(item);
    this.props.sets.setItemSet(type, item);
  }

  toSelect(type) {
    this.props.navigation.navigate(Routes.Screens.SELECT.routeName, {
      type: type,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => this.props.navigation.toggleDrawer()}
          style={{position: 'absolute', top: 10, left: 10}}>
          <Icon name={'bars'} color={'black'} size={20} />
        </TouchableHighlight>
        <Text style={styles.title}>Dress App</Text>
        <TextInput
          style={{
            borderRadius: 10,
            backgroundColor: 'gray',
            width: Dimensions.get('window').width * 0.6,
            padding: 10,
          }}
          placeholder={'search item'}
          onChangeText={value => this.handleSearch(value.toLowerCase())}
        />
        {this.state.searchResults.length < 1 ? null : (
          <FlatList
            style={{flex: 1}}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.searchResults}
            renderItem={({item, i}) => (
              <Item data={item} onAddItem={item => this.onAddItem(item)} />
            )}
          />
        )}
        <View
          style={{
            padding: 10,
            margin: 15,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'red',
          }}>
          {Object.keys(this.props.sets.getNewSet) < 1 ? null : (
            <Text>
              You have set not completed(
              {Object.keys(this.props.sets.getNewSet).length}/3)
            </Text>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {this.itemTypes.map((itemType, i) => (
              <Button
                key={i}
                title={itemType}
                onPress={() => this.toSelect(itemType)}
                disabled={
                  !!Object.keys(this.props.sets.getNewSet).find(
                    item => item == itemType,
                  )
                }
              />
            ))}
          </View>
          {Object.keys(this.props.sets.getNewSet).length < 3 ? null : (
            <Button title={'SAVE'} onPress={() => this.onSaveSet()} />
          )}
        </View>
        <FlatList
          style={{flex: 1}}
          data={this.props.sets.getList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <Set key={`set-${index}`} data={item} />
          )}
          ListHeaderComponent={
            <Text style={{fontWeight: 'bold', padding: 4}}>
              {this.props.sets.setList.length} set completed:{' '}
            </Text>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 70,
    padding: 20,
  },
});

export default Home;

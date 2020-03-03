import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Set from '../components/Set';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';
import Item from '../components/Item';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  componentDidMount() {
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
      let result = this.props.items.allItems.filter(item => {
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
      let defaultResults = this.props.items.allItems.slice(0, 5);
      this.setState({searchResults: defaultResults});
    }
  }

  onAddItem(type, item) {
    console.log(item);
    this.props.sets.setItemSet(type, item);
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
        <FlatList
          style={{flex: 1}}
          keyExtractor={item => item.index}
          data={this.state.searchResults}
          renderItem={({item, i}) => (
            <Item
              key={i}
              data={item}
              onAddItem={item => this.onAddItem(item)}
            />
          )}
        />
        <View
          style={{
            padding: 10,
            margin: 15,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'red',
          }}>
          {Object.keys(this.props.sets.newSet) < 1 ? null : (
            <Text>
              You have set not completed(
              {Object.keys(this.props.sets.newSet).length}/3)
            </Text>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              title={'shirt'}
              onPress={() =>
                this.props.navigation.navigate(
                  Routes.Screens.SHIRT_SELECT.routeName,
                )
              }
              disabled={Object.keys(this.props.sets.newSet).find(
                item => item == 'shirt',
              )}
            />
            <Button
              title={'pants'}
              onPress={() =>
                this.props.navigation.navigate(
                  Routes.Screens.PANTS_SELECT.routeName,
                )
              }
              disabled={Object.keys(this.props.sets.newSet).find(
                item => item == 'pants',
              )}
            />
            <Button
              title={'shoes'}
              onPress={() =>
                this.props.navigation.navigate(
                  Routes.Screens.SHOES_SELECT.routeName,
                )
              }
              disabled={Object.keys(this.props.sets.newSet).find(
                item => item == 'shoes',
              )}
            />
          </View>
          <Button
            title={'SAVE'}
            onPress={() => this.onSaveSet()}
            disabled={Object.keys(this.props.sets.newSet).length < 3}
          />
        </View>
        <FlatList
          style={{flex: 1}}
          keyExtractor={item => item.index}
          data={this.props.sets.setList}
          renderItem={({item, index}) => <Set data={item} index={index} />}
          ListHeaderComponent={<Text style={{fontWeight: 'bold', padding: 4}}>{this.props.sets.setList.length} set completed: </Text>}
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

export default inject('sets', 'items')(observer(Home));

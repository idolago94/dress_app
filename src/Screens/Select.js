import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';
import Item from '../components/Item';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      type: props.navigation.getParam('type'),
    };
  }

  componentDidMount(): void {
    this.props.navigation.addListener('willFocus', navigation => {
      this.setState({
        type: navigation.state.params.type,
        items: this.props.items[navigation.state.params.type],
        search: '',
      });
    });
  }

  onAddItem(item) {
    this.props.sets.setItemSet(this.state.type, item[this.state.type]);
    this.props.navigation.navigate(Routes.Screens.HOME.routeName);
  }

  handleSearch(text) {
    console.log(text);
    this.setState({search: text});
    if (text.length > 2) {
      console.log('search...');
      let result = this.state.items.filter(item => {
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
      this.setState({items: result});
    } else {
      console.log('default');
      let defaultResults = this.props.items[this.state.type].slice(0, 5);
      this.setState({items: defaultResults});
    }
  }

  getIconName(itemType) {
    switch (itemType) {
      case 'shirt':
        return 'tshirt';
      case 'pants':
        return 'running';
      case 'shoes':
        return 'shoe-prints';
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            style={{padding: 10}}
            name={this.getIconName(this.state.type)}
            color={'black'}
            size={50}
          />
          <Text style={styles.title}>{this.state.type} Select</Text>
        </View>

        <TextInput
          style={{
            borderRadius: 10,
            backgroundColor: 'gray',
            width: Dimensions.get('window').width * 0.6,
            padding: 10,
            alignSelf: 'center',
          }}
          value={this.state.search}
          placeholder={'search item'}
          onChangeText={value => this.handleSearch(value.toLowerCase())}
        />
        <Text style={{fontWeight: 'bold'}}>
          Found {this.state.items.length} items.
        </Text>
        <View style={styles.listBox}>
          {this.state.items.map((sh, i) => (
            <Item key={i} data={sh} onAddItem={item => this.onAddItem(item)} />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? 40 : 0,
    flex: 1,
  },
  title: {
    fontSize: 40,
    padding: 20,
    alignSelf: 'center',
  },
  listBox: {
    margin: 20,
  },
  colorsBox: {
    flexDirection: 'row',
  },
  sizesBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default inject('sets', 'items')(observer(Select));

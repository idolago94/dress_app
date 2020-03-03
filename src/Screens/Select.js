import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  TextInput,
  Dimensions,
  FlatList,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';
import Item from '../components/Item';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.navigation.getParam('type'),
    };
  }

  componentDidMount(): void {
    this.props.navigation.addListener('willFocus', navigation => {
      this.setState({type: navigation.state.params.type});
    });
  }

  onAddItem(item) {
    this.props.sets.setItemSet(this.state.type, item[this.state.type]);
    this.props.navigation.navigate(Routes.Screens.HOME.routeName);
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.state.type} Select</Text>
        <Text style={{fontWeight: 'bold'}}>
          Found {this.props.items[this.state.type].length} items.
        </Text>
        <View style={styles.listBox}>
          {this.props.items[this.state.type].map((sh, i) => (
            <Item key={i} data={sh} onAddItem={item => this.onAddItem(item)} />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

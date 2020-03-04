import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Platform,
  FlatList,
  Button,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';
import Item from '../components/Item';
import Icon from 'react-native-vector-icons/FontAwesome5';

@inject('sets', 'clothes')
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
      this.updatePage();
    });
  }

  componentDidUpdate() {
    let itemType = this.props.navigation.getParam('type');
    if (itemType != this.state.type) {
      this.updatePage();
    }
  }

  updatePage() {
    this.setState({
      type: this.props.navigation.state.params.type,
      items: this.props.clothes.getItemsType(
        this.props.navigation.state.params.type,
      ),
      search: '',
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
      let result = this.state.clothes.filter(item => {
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
      let defaultResults = this.props.clothes
        .getItemsType(this.state.type)
        .slice(0, 5);
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
        <View>
          <Button
            title={'Back'}
            onPress={() =>
              this.props.navigation.navigate(Routes.Screens.HOME.routeName)
            }
          />
        </View>
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
        <View style={styles.footer}>
          {this.props.clothes.getTypes.map((itemType, i) =>
            itemType == this.state.type ? null : (
              <Button
                key={i}
                title={`select ${itemType}`}
                onPress={() =>
                  this.props.navigation.navigate(
                    Routes.Screens.SELECT.routeName,
                    {type: itemType},
                  )
                }
              />
            ),
          )}
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Select;

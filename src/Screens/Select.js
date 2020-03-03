import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';
import Item from '../components/Item';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAddItem(item) {
    this.props.sets.setItemSet(this.props.type, item);
    this.props.navigation.navigate(Routes.Screens.HOME.routeName);
  }

  componentDidMount(): void {
      this.props.navigation.addListener('willFocus', (params) => {
          console.log(params);
      })
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

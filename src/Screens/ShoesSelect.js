import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Alert} from 'react-native';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';
import Item from "../components/Item";

class ShoesSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAddItem(item) {
    this.props.sets.setItemSet(item);
    this.props.navigation.navigate(Routes.Screens.HOME.routeName);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Shirt Select</Text>
        <Text style={{fontWeight: 'bold'}}>
          Found {this.props.items.shoes.length} items.
        </Text>
        <View style={styles.listBox}>
          {this.props.items.shoes.map((sh, i) => (
              <Item key={i} data={sh} onAddItem={(item) => this.onAddItem(item)} />
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

export default inject('sets', 'items')(observer(ShoesSelect));

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  Text,
  Platform,
} from 'react-native';
import Routes from '../Routes/Routes';
import {inject} from 'mobx-react';

@inject('clothes')
class Drawer extends Component {
  constructor(props) {
    super(props);
  }

  toSelect(type) {
    this.props.navigation.navigate(Routes.Screens.SELECT.routeName, {
      type: type,
    });
    this.props.navigation.closeDrawer();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.clothes.getTypes.map((type, i) => (
          <TouchableHighlight
            key={i}
            onPress={() => this.toSelect(type)}
            style={styles.tab}>
            <Text style={styles.tabContent}>{type} select</Text>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    marginTop: Platform.OS == 'ios' ? 50 : 0,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  tabContent: {
    fontSize: 20,
  },
});

export default Drawer;

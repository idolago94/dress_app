import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import Routes from '../Routes/Routes';
import Set from '../components/Set';
import {inject, observer} from 'mobx-react';

class CompleteSet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/complete.png')}
        />
        <Text style={{fontSize: 100}}>Set</Text>
        <Text style={{fontSize: 100}}>Saved!</Text>
        <Set
          data={this.props.sets.setList[this.props.sets.setList.length - 1]}
        />
        <Text>
          Sum sizes:
          {this.props.sets.setList[this.props.sets.setList.length - 1].shoes
            .size +
            this.props.sets.setList[this.props.sets.setList.length - 1].pants
              .size}
        </Text>
        <Button
          title="Back Home"
          onPress={() =>
            this.props.navigation.navigate(Routes.Screens.HOME.routeName)
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
    justifyContent: 'center',
  },
});

export default inject('sets')(observer(CompleteSet));

import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Routes from '../Routes/Routes';
import Set from "../components/Set";
import {inject, observer} from "mobx-react";

class CompleteSet extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        console.log('complete',this.props.sets.setList[this.props.sets.setList.length-1])
    }

    render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 100}}>Set</Text>
        <Text style={{fontSize: 100}}>Saved!</Text>
          <Set data={this.props.sets.setList[this.props.sets.setList.length-1]} />
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

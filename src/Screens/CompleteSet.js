import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import Routes from '../Routes/Routes';
import Set from '../components/Set';
import {inject, observer} from 'mobx-react';

function CompleteSet(props) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/complete.png')} />
      <Text style={{fontSize: 100}}>Set</Text>
      <Text style={{fontSize: 100}}>Saved!</Text>
      <Set data={props.sets.setList[props.sets.setList.length - 1]} />
      <Text>
        Sum sizes:
        {props.sets.setList[props.sets.setList.length - 1].shoes.size +
          props.sets.setList[props.sets.setList.length - 1].pants.size}
      </Text>
      <Button
        title="Back Home"
        onPress={() => props.navigation.navigate(Routes.Screens.HOME.routeName)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default inject('sets')(observer(CompleteSet));

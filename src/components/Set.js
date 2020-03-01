import {StyleSheet, View, Text, FlatList} from 'react-native';
import React, {Component} from 'react';

export default function Set(props) {
  return (
    <View style={styles.container}>
      {Object.keys(props.data).map((item, i) => (
        <View key={i}>
          <Text style={{fontWeight: 'bold'}}>{item}:</Text>
          <View style={{margin: 10}}>
            <Text>Name: {props.data[item].name}</Text>
            <Text>Brand: {props.data[item].brand}</Text>
            <Text>Color: {props.data[item].color}</Text>
            <Text>Size: {props.data[item].size}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
});

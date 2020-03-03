import {StyleSheet, View, Text, FlatList, Button, Alert} from 'react-native';
import React, {Component, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
    };
  }

  componentDidUpdate(prevProps): void {
    if(prevProps != this.props) {
      this.setState({color: null});
    }
  }

  onSizePress(size) {
    Alert.alert('Add this item to the set?', null, [
      {
        text: 'Yes',
        onPress: () => {
          let itemData = {
            [this.props.data.type]: {
              name: this.props.data.name,
              brand: this.props.data.brand,
              color: this.state.color,
              size: size,
            },
          };
          this.props.onAddItem(itemData);
        },
      },
      {
        text: 'No',
        onPress: () => this.setState({color: null}),
      },
    ]);
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
        <Icon
          style={{padding: 10}}
          name={this.getIconName(this.props.data.type)}
          color={'black'}
          size={20}
        />
        <View>
          <Text>
            {this.props.data.name}({this.props.data.brand}):
          </Text>
          <View style={styles.colorsBox}>
            {this.props.data.colors.map((color, cI) => (
              <Button
                key={cI}
                title={color}
                color={color}
                onPress={() => this.setState({color: color})}
              />
            ))}
          </View>
          {this.state.color ? (
            <View style={styles.sizesBox}>
              {this.props.data.sizes.map((size, sI) => (
                <Button
                  key={sI}
                  style={{
                    borderRadius: 999,
                    backgroundColor: 'gray',
                    padding: 3,
                    margin: 3,
                  }}
                  title={size.toString()}
                  color={'black'}
                  onPress={() => this.onSizePress(size)}
                />
              ))}
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorsBox: {
    flexDirection: 'row',
  },
  sizesBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

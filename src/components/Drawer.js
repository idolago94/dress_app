import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Dimensions, Text, Platform} from 'react-native';
import {inject, observer} from 'mobx-react';
import Routes from '../Routes/Routes';
import Item from '../components/Item';

export default function Drawer(props) {

    function toSelect(type) {
        props.navigation.navigate(Routes.Screens.SELECT.routeName, {type: type});
    }

        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => toSelect('shirt')} style={styles.tab}>
                    <Text style={styles.tabContent}>Shirt Select</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => toSelect('pants')} style={styles.tab}>
                    <Text style={styles.tabContent}>Pants Select</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => toSelect('shoes')} style={styles.tab}>
                    <Text style={styles.tabContent}>Shoes Select</Text>
                </TouchableHighlight>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        marginTop: Platform.OS == 'ios' ? (50):(0)
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    tabContent: {
        fontSize: 20
    }
});

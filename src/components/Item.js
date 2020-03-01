import {StyleSheet, View, Text, FlatList, Button, Alert} from 'react-native';
import React, {Component, useState} from 'react';
import Routes from "../Routes/Routes";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Item(props) {
    const [color, setColor] = useState(null);

    function onSizePress(size) {
        Alert.alert('Add this item to the set?', null, [
            {
                text: 'Yes',
                onPress: () => {
                    let itemData = {
                        [props.data.type]: {
                            name: props.data.name,
                            brand: props.data.brand,
                            color: color,
                            size: size
                        }
                    }
                    props.onAddItem(itemData);
                },
            },
            {
                text: 'No',
                onPress: () => setColor(null)
            },
        ]);
    }

    function getIconName(itemType) {
        switch (itemType) {
            case 'shirt': return 'tshirt';
            case 'pants': return 'running';
            case 'shoes': return 'shoe-prints'
        }


    }

    return (
        <View
            style={styles.container}>
            <Icon style={{padding: 10}} name={getIconName(props.data.type)} color={'black'} size={20} />
            <View>
                <Text>
                    {props.data.name}({props.data.brand}):
                </Text>
                <View style={styles.colorsBox}>
                    {props.data.colors.map((color, cI) => (
                        <Button
                            key={cI}
                            title={color}
                            color={color}
                            onPress={() => setColor(color)}
                        />
                    ))}
                </View>
                {color ? (
                    <View style={styles.sizesBox}>
                        {props.data.sizes.map((size, sI) => (
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
                                onPress={() => onSizePress(size)}
                            />
                        ))}
                    </View>
                ) : null}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    colorsBox: {
        flexDirection: 'row',
    },
    sizesBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

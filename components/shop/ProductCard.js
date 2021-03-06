import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

import Card from '../UI/Card'

const ProductItem = props => {
    let TouchableComponent = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }

    return(
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableComponent onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.image}} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                        {props.children}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 10,
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20,
    },
    infoContainer: {
        alignItems: 'center',
        height: '17%',
        padding: 10,
    },  
})

export default ProductItem
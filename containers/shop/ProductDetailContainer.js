import React from 'react'
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

import Colors from '../../constants/Colors'

const ProductDetailContainer = props => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId))

    return(
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.buttonContainer}>
                <Button color={Colors.secondaryColor} title="Add to Cart" onPress={() => {}} />
            </View>
            <Text style={styles.price}>{selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetailContainer.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans',
    },
    buttonContainer: {
        marginVertical: 10,
        alignItems: 'center',
    }
})

export default ProductDetailContainer
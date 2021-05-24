import React from 'react'
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

const ProductDetailContainer = props => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId))

    return(
        <View>
            <Text>{selectedProduct.title}</Text>
        </View>
    )
}

ProductDetailContainer.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({

})

export default ProductDetailContainer
import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

const ProductsOverviewContainer = props => {
    const products = useSelector(state => state.products.availableProducts)
    return <FlatList data={products} renderItem={itemData => <Text>{itemData.item.title}</Text>} />
}

ProductsOverviewContainer.navigationOptions = {
    headerTitle: 'All Products'
}

const styles = StyleSheet.create({

})

export default ProductsOverviewContainer
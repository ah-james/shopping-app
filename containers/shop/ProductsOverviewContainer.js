import React from 'react'
import { ScrollView, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import ProductItem from '../../components/shop/ProductItem'

const ProductsOverviewContainer = props => {
    const products = useSelector(state => state.products.availableProducts)
    return( 
        <ScrollView>
            <FlatList data={products} renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title} 
                    price={itemData.item.price}
                    viewDetail={() => {}}
                    addToCart={() => {}}
                />} 
            />
        </ScrollView>
    )
}

ProductsOverviewContainer.navigationOptions = {
    headerTitle: 'All Products'
}

const styles = StyleSheet.create({

})

export default ProductsOverviewContainer
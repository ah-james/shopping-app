import React from 'react'
import { ScrollView, StyleSheet, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import ProductItem from '../../components/shop/ProductCard'
import * as cartActions from '../../store/actions/cartActions'

const ProductsOverviewContainer = props => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const addToCart = (itemData) => {
        dispatch(cartActions.addToCart(itemData.item))
    }

    return( 
        <ScrollView>
            <FlatList data={products} renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title} 
                    price={itemData.item.price} 
                    viewDetail={() => {
                        props.navigation.navigate({ routeName: 'ProductDetail', params: {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title,
                        }})
                    }} 
                    addToCart={() => {
                        dispatch(cartActions.addToCart(itemData.item))
                    }} 
                />
            }/>
        </ScrollView>
    )
}

ProductsOverviewContainer.navigationOptions = {
    headerTitle: 'All Products'
}

const styles = StyleSheet.create({

})

export default ProductsOverviewContainer
import React from 'react'
import { ScrollView, StyleSheet, FlatList, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductCard'
import * as cartActions from '../../store/actions/cartActions'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'

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

ProductsOverviewContainer.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {navData.navigation.navigate('Cart')}} />
        </HeaderButtons>,
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({

})

export default ProductsOverviewContainer
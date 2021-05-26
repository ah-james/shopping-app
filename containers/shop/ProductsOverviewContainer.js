import React from 'react'
import { ScrollView, StyleSheet, FlatList, Platform, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductItem from '../../components/shop/ProductCard'
import * as cartActions from '../../store/actions/cartActions'
import Colors from '../../constants/Colors'


const ProductsOverviewContainer = props => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const handleSelectItem = (id, title) => {
        props.navigation.navigate({ routeName: 'ProductDetail', params: {
            productId: id,
            productTitle: title,
        }})
    }

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
                    onSelect={() => {handleSelectItem(itemData.item.id, itemData.item.title)}} 
                >
                    <Button color={Colors.secondaryColor} title="View Details" onPress={() => handleSelectItem(itemData.item.id, itemData.item.title)} />
                    <Button color={Colors.secondaryColor} title="Add to Cart" onPress={() => dispatch(cartActions.addToCart(itemData.item))} />
                </ProductItem>
            }/>
        </ScrollView>
    )
}

ProductsOverviewContainer.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {navData.navigation.navigate('Cart')}} />
        </HeaderButtons>,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({

})

export default ProductsOverviewContainer
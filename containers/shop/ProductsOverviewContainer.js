import React, { useEffect, useState, useCallback } from 'react'
import { ScrollView, FlatList, Platform, Button, ActivityIndicator, View, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductItem from '../../components/shop/ProductCard'
import * as cartActions from '../../store/actions/cartActions'
import * as productsActions from '../../store/actions/productsActions'
import Colors from '../../constants/Colors'


const ProductsOverviewContainer = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(productsActions.fetchProducts())
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        loadProducts()
    }, [dispatch, loadProducts])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts)

        return () => {
            willFocusSub.remove()
        }
    }, [loadProducts])

    const handleSelectItem = (id, title) => {
        props.navigation.navigate({ routeName: 'ProductDetail', params: {
            productId: id,
            productTitle: title,
        }})
    }

    const addToCart = (itemData) => {
        dispatch(cartActions.addToCart(itemData.item))
    }

    if (isLoading) {
        return(
            <View style={styles.center}>
                <ActivityIndicator size='large' color={Colors.primaryColor} />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return(
            <View style={styles.center}>
                <Text>No Products Found</Text>
            </View>
        )
    }

    if (error) {
        return(
            <View style={styles.center}>
                <Text>Something Went Wrong</Text>
                <Button title='Try Again' onPress={() => loadProducts} color={Colors.primaryColor} />
            </View>
        )
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
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ProductsOverviewContainer
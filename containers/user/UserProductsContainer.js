import React from 'react'
import { FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductCard from '../../components/shop/ProductCard'

const UserProductsContainer = props => {
    const userProducts = useSelector(state => state.products.userProducts)

    return <FlatList data={userProducts} renderItem={itemData => (
        <ProductCard 
            image={itemData.item.imageUrl} 
            title={itemData.item.title} 
            price={itemData.item.price} 
            viewDetail={() => {}} 
            addToCart={() => {}} 
        /> 
    )}/>
}

UserProductsContainer.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
        </HeaderButtons>,
    }
}

export default UserProductsContainer
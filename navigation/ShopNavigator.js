import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


import ProductsOverviewContainer from '../containers/shop/ProductsOverviewContainer'
import ProductDetailContainer from '../containers/shop/ProductDetailContainer'
import CartContainer from '../containers/shop/CartContainer'
import Colors from '../constants/Colors'
import OrdersContainer from '../containers/shop/OrdersContainer'
import UserProductsContainer from '../containers/user/UserProductsContainer'
import EditProductContainer from '../containers/user/EditProductContainer'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewContainer,
    ProductDetail: ProductDetailContainer,
    Cart: CartContainer,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={20} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersContainer
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={20} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions,
})

const UserNavigator = createStackNavigator({
    UserProducts: UserProductsContainer,
    EditProduct: EditProductContainer
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={20} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions,
})

const ShopNavigator = createDrawerNavigator({
    Shop: ProductsNavigator,
    Orders: OrdersNavigator,
    User: UserNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor
    }
})

export default createAppContainer(ShopNavigator)
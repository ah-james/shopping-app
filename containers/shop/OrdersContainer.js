import React from 'react'
import { FlatList, Text, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'

const OrdersContainer = props => {
    const orders = useSelector(state => state.orders.orders)

    return(
        <FlatList data={orders} renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>} />
    )
}

OrdersContainer.navigationOptions = navData => {
    return {
        headerTitle: 'Completed Orders',
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
        </HeaderButtons>,
    }
}

export default OrdersContainer
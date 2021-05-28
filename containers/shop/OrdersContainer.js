import React, { useEffect, useState } from 'react'
import { FlatList, Text, Platform, ActivityIndicator, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import OrderCard from '../../components/shop/OrderCard'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import * as ordersActions from '../../store/actions/ordersActions'
import Colors from '../../constants/Colors'

const OrdersContainer = props => {
    const [isLoading, setIsLoading] = useState(false)

    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLoading(true)
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false)
        })
    }, [dispatch])

    if (isLoading) {
        return(
            <View style={styles.center}><ActivityIndicator size='small' color={Colors.primaryColor} /></View>
        )
    }

    if (orders.length === 0) {
        return (
            <View>
                <Text style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>No Orders Found</Text>
            </View>
        )
    }

    return(
        <FlatList data={orders} renderItem={itemData => <OrderCard items={itemData.item.items} totalAmount={itemData.item.totalAmount} date={itemData.item.readableDate} />} />
    )
}

OrdersContainer.navigationOptions = navData => {
    return {
        headerTitle: 'Completed Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default OrdersContainer
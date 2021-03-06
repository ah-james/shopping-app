import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import CartCard from '../../components/shop/CartCard'
import * as cartActions from '../../store/actions/cartActions'
import * as ordersActions from '../../store/actions/ordersActions'

const CartContainer = props => {
    const [isLoading, setIsLoading] = useState(false)

    const cartSum = useSelector(state => state.cart.sum)

    const cartItems = useSelector(state => {
        const cartItemsArray = []
        for (const key in state.cart.items) {
            cartItemsArray.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return cartItemsArray.sort((a, b) => a.productId > b.productId ? 1 : -1)
    })

    const dispatch = useDispatch()

    const handleSendOrder = async () => {
        setIsLoading(true)
        await dispatch(ordersActions.addOrder(cartItems, cartSum))
        setIsLoading(false)
    } 

    return(
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.sum}>${Math.round(cartSum.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? (
                    <ActivityIndicator size='small' color={Colors.primaryColor} />
                ) : (
                    <Button title="Order Now" color={Colors.secondaryColor} disabled={cartItems.length === 0} onPress={handleSendOrder} />
                )}
            </Card>
            <FlatList 
                data={cartItems} 
                keyExtractor={item => item.productId} 
                renderItem={ itemData => (
                        <CartCard 
                        deletable
                        quantity={itemData.item.quantity} 
                        title={itemData.item.productTitle} 
                        amount={itemData.item.sum} 
                        removeItem={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId))
                        }}
                    />
                )} 
            />
        </View>
    )
}

CartContainer.navigationOptions = {
    headerTitle: 'Your Cart',
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    sum: {
        color: Colors.primaryColor,
    },
})

export default CartContainer
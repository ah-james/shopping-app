import React from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import CartCard from '../../components/shop/CartCard'
import * as cartActions from '../../store/actions/cartActions'

const CartContainer = props => {
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

    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.sum}>${cartSum.toFixed(2)}</Text>
                </Text>
                <Button title="Order Now" color={Colors.secondaryColor} disabled={cartItems.length === 0} />
            </View>
            <FlatList 
                data={cartItems} 
                keyExtractor={item => item.productId} 
                renderItem={ itemData => (
                        <CartCard 
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
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
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
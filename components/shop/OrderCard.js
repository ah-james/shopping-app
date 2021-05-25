import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import Colors from '../../constants/Colors'
import CartCard from './CartCard'

const OrderCard = props => {
    const [showDetails, setShowDetails] = useState(false)

    return(
        <View style={styles.orderItem}>
            <View style={styles.infoContainer}>
                <Text style={styles.total}>{props.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primaryColor} title={showDetails ? "Hide Details" : "Show Details"} onPress={() => setShowDetails(prevState => !prevState)} />
            {showDetails && <View style={styles.cartItems}>{props.items.map(item => <CartCard key={item.productId} quantity={item.quantity} title={item.productTitle} amount={item.sum} />)}</View>}
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    total: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16
    },
    cartItems: {
        width: '100%',
    }
})

export default OrderCard

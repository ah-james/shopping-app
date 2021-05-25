import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CartCard = props => {
    return(
        <View style={styles.cartCard}>
            <Text style={styles.cardData}>
                <Text style={styles.quantity}>{props.quantity}</Text> <Text style={styles.info}>{props.title}</Text>
            </Text>
            <View style={styles.cardData}>
                <Text style={styles.info}>{props.amount.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity style={styles.delete} onPress={props.removeItem}>
                    <Ionicons 
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} 
                        size={23} 
                        color='red'
                    />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartCard: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    }, 
    cardData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'open-sans',
        fontSize: 16,
    },
    info: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    delete: {
        marginLeft: 20,
    },
})

export default CartCard
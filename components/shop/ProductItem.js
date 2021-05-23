import React from 'react'
import { View, Text, Image, StyleSheet, Button } from 'react-native'

const ProductItem = props => {
    return(
        <View>
            <Image />
            <Text>Title</Text>
            <Text>Price</Text>
            <View>
                <Button title="View Details" />
                <Button title="Add to Cart" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ProductItem
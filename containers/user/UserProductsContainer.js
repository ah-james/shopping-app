import React from 'react'
import { FlatList, Platform, Button, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import ProductCard from '../../components/shop/ProductCard'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/productsActions'

const UserProductsContainer = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const handleEditProduct = id => {
        props.navigation.navigate({routeName: 'EditProduct', params: {
            productId: id,
        }})
    }

    const handleDelete = id => {
        Alert.alert('Are you sure?', 'Do you want to delete?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {dispatch(productsActions.deleteProduct(id))}}
        ])
    }

    return <FlatList data={userProducts} renderItem={itemData => (
        <ProductCard 
            image={itemData.item.imageUrl} 
            title={itemData.item.title} 
            price={itemData.item.price} 
            onSelect={() => handleEditProduct(itemData.item.id)} 
        >
            <Button color={Colors.secondaryColor} title="Edit" onPress={() => handleEditProduct(itemData.item.id)} />
            <Button color={Colors.secondaryColor} title="Delete" onPress={() => handleDelete(itemData.item.id)} />
        </ProductCard> 
    )}/>
}

UserProductsContainer.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Add" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => {navData.navigation.navigate('EditProduct')}} />
        </HeaderButtons>,
    }
}

export default UserProductsContainer
import React, { useEffect, useCallback, useReducer } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux' 

import CustomHeaderButton from '../../components/UI/CustomHeaderButton'
import * as productsActions from '../../store/actions/productsActions'
import Input from '../../components/UI/Input'

const FORM_UPDATE = 'FORM_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formIsValid = true
        for (const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key]
        }
        return {
            formIsValid: formIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state
}

const EditProductContainer = props => {
    const productId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(product => product.id === productId)
    )
    const dispatch = useDispatch()

    const [formState, dispatchState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    })

    const handleSubmit = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Fill out the Form!', 'Please check your errors in the form', [
                { text: 'Okay' }
            ])
            return
        }
        if (editedProduct) { 
            dispatch(productsActions.updateProduct(productId, formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description))
        } else {
            dispatch(productsActions.createProduct(formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description, +formState.inputValues.price))
        }
        props.navigation.goBack()
    }, [dispatch, productId, formState])

    useEffect(() => {
        props.navigation.setParams({ 'submit': handleSubmit })
    }, [handleSubmit])

    const handleInputChange = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
        dispatchState({
            type: FORM_UPDATE, 
            value: inputValue, 
            isValid: inputValidity, 
            input: inputIdentifier
        })
    }, [dispatchState])

    return(
        <ScrollView>
            <View style={styles.form}>
                <Input 
                    id="title"
                    label="Title" 
                    errorText="Please Enter a Valid Title" 
                    keyboardType='default' 
                    autoCapitalize='sentences' 
                    onInputChange={handleInputChange} 
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid = {!!editedProduct}
                    required
                 />
                <Input 
                    id="imageUrl"
                    label="Image URL" 
                    errorText="Please Enter a Valid URL" 
                    keyboardType='default'
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    onInputChange={handleInputChange} 
                    initiallyValid = {!!editedProduct}
                    required
                />
                {editedProduct ? null : <Input
                    id="price" 
                    label="Price" 
                    errorText="Please Enter a Valid Price" 
                    keyboardType='decimal-pad' 
                    required 
                    min={1} 
                    onInputChange={handleInputChange}  
                />}
                <Input 
                    id="description"
                    label="Description" 
                    errorText="Please Enter a Valid Description" 
                    keyboardType='default' 
                    autoCapitalize='sentences' 
                    multiline 
                    numberOfLines={3} 
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initiallyValid = {!!editedProduct}
                    required
                    onInputChange={handleInputChange} 
                />
            </View>
        </ScrollView>
    )
}

EditProductContainer.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Add" iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={submitFunction} />
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },

})

export default EditProductContainer
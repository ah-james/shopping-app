import Product from '../../models/product'
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/productsActions'

const initialState = {
    availableProducts: [],
    // dummy setup of userProducts to hardcode for testing
    userProducts: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        case DELETE_PRODUCT:
            return { 
                ...state, 
                availableProducts: state.availableProducts.filter(product => product.id !== action.productId),
                userProducts: state.userProducts.filter(product => product.id !== action.productId),               
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id, 
                action.productData.ownerId, 
                action.productData.title, 
                action.productData.imageUrl, 
                action.productData.description, 
                action.productData.price
            )
            return { ...state, availableProducts: state.availableProducts.concat(newProduct), userProducts: state.userProducts.concat(newProduct)}
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(product => product.id === action.productId)
            const updatedProduct = new Product(
                action.productId, 
                state.userProducts[productIndex].ownerId, 
                action.productData.title, 
                action.productData.imageUrl, 
                action.productData.description,
                state.userProducts[productIndex].price, 
            )
            const updatedUserProducts = [...state.userProducts]
            updatedUserProducts[productIndex] = updatedProduct
            const availableProductIndex = state.availableProducts.findIndex(product => product.id === action.productId)
            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[availableProductIndex] = updatedProduct
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
    }
    return state
}
import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT } from '../actions/productsActions'

const initialState = {
    availableProducts: PRODUCTS,
    // dummy setup of userProducts to hardcode for testing
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return { 
                ...state, 
                userProducts: state.userProducts.filter(product => product.id !== action.productId),
                availableProducts: state.availableProducts.filter(product => product.id !== action.productId)
            }
    }
    return state
}
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions"
import CartItem from '../../models/cart-item'

const initialState = {
    items: {},
    sum: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const productPrice = addedProduct.price
            const productTitle = addedProduct.title

            let updateOrNewCartItem

            if (state.items[addedProduct.id]) {
                // item is already in cart
                updateOrNewCartItem = new CartItem(state.items[addedProduct.id].quantity + 1, productPrice, productTitle, state.items[addedProduct.id].sum + productPrice)
            } else {
                updateOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice)
            }
            return {...state, items: {...state.items, [addedProduct.id]: updateOrNewCartItem}, sum: state.sum + productPrice}
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productId]
            const currentQuantity = selectedCartItem.quantity
            let updatedCartItems
            if (currentQuantity > 1) {
                // reduce by 1 instead of erasing
                // create new CartItem
                const updatedCartItem = new CartItem(selectedCartItem.quantity - 1, selectedCartItem.productPrice, selectedCartItem.productTitle, selectedCartItem.sum - selectedCartItem.productPrice)
                updatedCartItems = {...state.items, [action.productId]: updatedCartItem}
            } else {
                // spread operator on all items in state
                updatedCartItems = {...state.items}
                // delete specific item where action's productId is equal to the key
                delete updatedCartItems[action.productId]
            }
            return {
                ...state,
                items: updatedCartItems,
                sum: state.sum - selectedCartItem.productPrice
            }
    }
    return state
}
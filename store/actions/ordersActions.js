export const ADD_ORDER = 'ADD_ORDER'

export const addOrder = (cart, sum) => {
    return { type: ADD_ORDER, orderData: { cart: cart, sum: sum }}
}
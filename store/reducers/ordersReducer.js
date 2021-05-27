import Order from '../../models/order'
import { ADD_ORDER, SET_ORDERS } from '../actions/ordersActions'

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_ORDER:
            const newOrder = new Order(action.orderData.id, action.orderData.cart, action.orderData.sum, action.orderData.date)
            // old array stays untouched, return new array with everything in state plus add newOrder to state with concat
            return { ...state, orders: state.orders.concat(newOrder) }
        case SET_ORDERS:
            return { orders: action.orders }
    }

    return state
}
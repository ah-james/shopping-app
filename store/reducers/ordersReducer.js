import Order from '../../models/order'
import { ADD_ORDER } from '../actions/ordersActions'

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_ORDER:
            const newOrder = new Order(new Date().toString(), action.orderData.cart, action.orderData.sum, new Date())
            // old array stays untouched, return new array with everything in state plus add newOrder to state with concat
            return {...state, orders: state.orders.concat(newOrder)}
    }

    return state
}
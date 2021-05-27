import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shopping-app-5e413-default-rtdb.firebaseio.com/orders/u1.json')

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json()
            const loadedOrders = []
    
            for (key in responseData) {
                loadedOrders.push(new Order(key, responseData[key].cart, responseData[key].sum, new Date(responseData[key].date)))
            }
            dispatch({type: SET_ORDERS, orders: loadedOrders})
        } catch (error) {
            throw error
        }
    }
}

export const addOrder = (cart, sum) => {
    return async dispatch => {
        const date = new Date()
        const response = await fetch('https://rn-shopping-app-5e413-default-rtdb.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart,
                sum,
                date: date.toISOString(),
            })
        })

        if (!response.ok) {
            throw new Error('Something Went Wrong!')
        }

        const responseData = await response.json()

        dispatch({ type: ADD_ORDER, orderData: { id: responseData.name, cart: cart, sum: sum, date: date }})
    }

}
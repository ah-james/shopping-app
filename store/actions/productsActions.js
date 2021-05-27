import Product from "../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shopping-app-5e413-default-rtdb.firebaseio.com/products.json')

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json()
            const loadedProducts = []
    
            for (key in responseData) {
                loadedProducts.push(new Product(key, 'u1', responseData[key].title, responseData[key].imageUrl, responseData[key].description, responseData[key].price))
            }
            dispatch({type: SET_PRODUCTS, products: loadedProducts })
        } catch (error) {
            throw error
        }
    }
}

export const deleteProduct = productId => {
    return async dispatch => {
        await fetch(`https://rn-shopping-app-5e413-default-rtdb.firebaseio.com/products${productId}.json`, {
            method: 'DELETE',
        })
        dispatch({ type: DELETE_PRODUCT, productId: productId})
    }
}

export const createProduct = (title, imageUrl, description, price) => {
    return async dispatch => {
        const response = await fetch('https://rn-shopping-app-5e413-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        })

        const responseData = await response.json()

        console.log(responseData)

        dispatch({ type: CREATE_PRODUCT, productData: {
            id: responseData.name,
            title,
            imageUrl,
            description,
            price
        }})
    }
}

export const updateProduct = (id, title, imageUrl, description) => {
    return async dispatch => {

        await fetch(`https://rn-shopping-app-5e413-default-rtdb.firebaseio.com/products${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        })
        
        dispatch({ type: UPDATE_PRODUCT, productId: id, productData: {
            title,
            imageUrl,
            description,
        }})
    }
}

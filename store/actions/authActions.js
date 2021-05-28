export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAw96TzpDRl8EAEC7VQSfSutmugEOfsrGg',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            })
        })

        if (!response.ok) {
            throw new Error('Something Went Wrong!')
        }

        const responseData = await response.json()

        dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId })
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw96TzpDRl8EAEC7VQSfSutmugEOfsrGg',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            })
        })

        if (!response.ok) {
            const errorResponseData = await response.json()
            const errorId = errorResponseData.error.message
            let message = 'Something Went Wrong!'
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email was not found'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Incorrect Password'
            }
            throw new Error(message)
        }

        const responseData = await response.json()
        console.log(responseData)
        dispatch({ type: LOGIN, token: responseData.idToken, userId: responseData.localId })
    }
}
export const SIGNUP = 'SIGNUP'

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

        dispatch({ type: SIGNUP })
    }
}
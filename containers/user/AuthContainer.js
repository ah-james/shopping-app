import React, { useReducer, useCallback, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, KeyboardAvoidingView, Button, View, ActivityIndicator, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import * as authActions from '../../store/actions/authActions'

const FORM_UPDATE = 'FORM_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formIsValid = true
        for (const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key]
        }
        return {
            formIsValid: formIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state
}

const AuthContainer = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [error, setError] = useState()
    const [formState, dispatchState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        formIsValid: false,
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred', error, [{ text: 'Okay' }])
        }
    }, [error])

    const handleAuth = async () => {
        let action
        if (isSignup) {
            action = authActions.signup(formState.inputValues.email, formState.inputValues.password)
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password)
        }
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(action)
            props.navigation.navigate('Shop')
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
    }

    const handleInputChange = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
        dispatchState({
            type: FORM_UPDATE, 
            value: inputValue, 
            isValid: inputValidity, 
            input: inputIdentifier
        })
    }, [dispatchState])

    return(
        // <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10} style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient} >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id="email" 
                            label="E-Mail" 
                            keyboardType="email-address" 
                            required 
                            email 
                            autoCapitalize="none" 
                            errorText="Please enter a valid email address" 
                            onInputChange={handleInputChange}
                            initialValue="" 
                        />
                        <Input 
                            id="password" 
                            label="Password" 
                            keyboardType="default"
                            secureTextEntry
                            required 
                            minLength={5} 
                            autoCapitalize="none" 
                            errorText="Please enter a valid password address" 
                            onInputChange={handleInputChange}
                            initialValue="" 
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? <ActivityIndicator size='small' color={Colors.primaryColor} /> : <Button title={isSignup ? 'Sign Up' : "Login"} color={Colors.primaryColor} onPress={handleAuth} />}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`} color={Colors.secondaryColor} onPress={() => {
                                setIsSignup(prevState => !prevState)
                            }} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        // </KeyboardAvoidingView>
    )
}

AuthContainer.navigationOptions = {
    headerTitle: 'Log In or Sign Up'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 15,
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 10
    },
})

export default AuthContainer
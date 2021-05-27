import React, { useReducer, useCallback } from 'react'
import { ScrollView, StyleSheet, KeyboardAvoidingView, Button, View } from 'react-native'
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

    const handleSignup = () => {
        dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password))
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
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
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
                            <Button title="Login" color={Colors.primaryColor} onPress={handleSignup} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Sign Up" color={Colors.secondaryColor} onPress={() => {}} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
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
import React from 'react'
import { ScrollView, StyleSheet, KeyboardAvoidingView, Button, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'

const AuthContainer = props => {
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
                            errorMessage="Please enter a valid email address" 
                            onInputChange={() => {}}
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
                            errorMessage="Please enter a valid password address" 
                            onInputChange={() => {}}
                            initialValue="" 
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Login" color={Colors.primaryColor} onPress={() => {}} />
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
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/customInput/CustomInput'
import CustomButton from '../components/customButton/CustomButton'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const confirmPassword = () => {
        // console.warn('confirmPassword');
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigation.navigate('LoginScreen');
            })
            .catch((error) => {
                setErrorMessage(error.message)
            });
    }
    const handleSignIn = () => {
        // console.warn('confirmPassword');
        navigation.navigate('LoginScreen')
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <Text style={styles.title}>Reset Your Password</Text>
            <Text style={styles.error}>{errorMessage}</Text>
            <CustomInput
                placeholder="Enter Email"
                value={email}
                setValue={setEmail}

            />
            <CustomButton
                text="Send"
                onPress={confirmPassword}
            />
            <CustomButton
                text="Back To Sign In"
                onPress={handleSignIn}
                type="TERTIARY"
            />
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#141e30',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        margin: 10
    },
    error:{
        color:'red'
    }
})
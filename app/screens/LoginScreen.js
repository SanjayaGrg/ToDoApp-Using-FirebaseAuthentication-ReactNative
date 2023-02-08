import { StyleSheet, Text, KeyboardAvoidingView, Image, useWindowDimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/customInput/CustomInput';
import CustomButton from '../components/customButton/CustomButton';
import { auth } from '../../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    if(auth.currentUser){
        navigation.navigate('MainScreen');
    }else{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                navigation.navigate('MainScreen');
            }
        })
    }

    const handleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    navigation.navigate('MainScreen', { user: userCredential.user });
                    setEmail("");
                    setPassword("");
                    setErrorMessage("");
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        } else {
            setErrorMessage("Please enter an email and password.")

        }
    }
    const handlePassword = () => {
        console.log("Forgot Password pressed");
        navigation.navigate('ForgotScreen')
    }
    const redirectRegister = () => {
        navigation.navigate('RegisterScreen')
    }

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >

            <Image
                source={require('./../assets/logo.png')}
                style={[styles.image, { height: height * 0.3 }]}
                resizeMode="contain"
            />
            <Text style={styles.header}>Log In</Text>

            <Text style={styles.errorText}>{errorMessage}</Text>
            <CustomInput
                placeholder="Enter Email"
                value={email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder="Enter Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <CustomButton
                text="Log In"
                onPress={handleLogin}
            />
            <CustomButton
                text="Forgot Password?"
                onPress={handlePassword}
                type="TERTIARY"
            />
            <CustomButton
                text="Don't have an Account? Register Here"
                onPress={redirectRegister}
                type="TERTIARY"
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#141e30',
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: '60%',
        maxHeight: 200,
        maxWidth: 300,
        marginBottom: 0
    },
    errorText: {
        color: 'red'
    },
    header: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 0,

    }

})

export default LoginScreen


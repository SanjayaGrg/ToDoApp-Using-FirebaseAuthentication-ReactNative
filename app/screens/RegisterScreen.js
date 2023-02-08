import { StyleSheet, Text, KeyboardAvoidingView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/customInput/CustomInput';
import CustomButton from '../components/customButton/CustomButton';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../../firebase';


const RegisterScreen = () => {
    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    let validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
            setValidationMessage("Password do not match");
        } else {
            setValidationMessage("")
        }
        setValue(value);
    }

    const handleRegister = () => {
        if (password === passwordRepeat) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    sendEmailVerification(auth.currentUser);;
                    navigation.navigate('MainScreen', { user: userCredential.user })
                    setEmail("");
                    setPassword("");
                    setPasswordRepeat("");
                    setValidationMessage("");
                })
                .catch((error) => {
                    setValidationMessage(error.message);
                });
        }

    }
    const redirectLogIn = () => {
        navigation.navigate('LoginScreen')
    }
    const onTermsOfUsePressed = () => {
        console.warn("Privacy policy");
    }

    return (

        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.errorText}>{validationMessage}</Text>
            <CustomInput
                placeholder="Enter Email"
                value={email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder="Enter Password"
                value={password}
                setValue={(value) => validateAndSet(value, passwordRepeat, setPassword)}
                secureTextEntry={true}
            />
            <CustomInput
                placeholder="Re-enter Password"
                value={passwordRepeat}
                setValue={(value) => validateAndSet(value, password, setPasswordRepeat)}
                secureTextEntry={true}
            />
            <CustomButton
                text="Register"
                onPress={handleRegister}
            />
            <Text style={styles.text}>By registering you confirm that you accept our {' '} <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of use</Text> {' '} and {' '} <Text style={styles.link} onPress={onTermsOfUsePressed}>Privacy policy.</Text></Text>
            <CustomButton
                text="Already have an Account? Login Here"
                onPress={redirectLogIn}
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
        width: '70%',
        maxHeight: 200,
        maxWidth: 300,
        marginBottom: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginHorizontal: 10,
        marginVertical: 20
    },
    text: {
        color: '#fff',
        marginVertical: 10
    },
    errorText: {
        color: 'red'
    },
    link: {
        color: '#fdb075'
    }

})

export default RegisterScreen


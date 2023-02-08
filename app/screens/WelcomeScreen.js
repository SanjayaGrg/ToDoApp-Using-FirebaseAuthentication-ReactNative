import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {

    const navigation = useNavigation();
    const redirectLogIn=()=>{
        navigation.navigate('LoginScreen')
    }
    const redirectSignIn=()=>{
        navigation.navigate('RegisterScreen')
    }
    
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#141e30', '#243b55']}
                style={styles.linearGradient}
            >
                <View style={styles.smallContainer}>
                    <View>
                        <Image source={require('./../assets/welcome.png')} style={styles.image} />
                    </View>
                    <Text style={styles.firstText}>Keep all your daily activity in one place.</Text>
                    <Text style={styles.secondText}>All the activity's are stored here. You can access it by logging in to this app.</Text>
                    <View style={styles.auth}>
                        <TouchableOpacity style={styles.pressableText}><Text style={styles.redirectText} onPress={redirectSignIn}>Sign Up</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.pressableText}><Text style={styles.redirectText} onPress={redirectLogIn}>Log In</Text></TouchableOpacity>
                    </View>
                </View>

            </LinearGradient>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#141e30"
    },
    image: {
        width: 280,
        height: 280,
        alignSelf: 'center'
    },
    firstText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 6,
        fontSize: 15
    },
    secondText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 12,
        width: "80%",
        alignSelf: 'center'
    },
    linearGradient: {
        flex: 1,
        borderRadius: 20,
    },
    pressableText: {
        backgroundColor: "#74b9ff",
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 4,
        marginVertical: 10,
        width: '50%',
        alignSelf: 'center'
    },
    auth: {
        marginTop: 25
    },
    redirectText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',

    },
    smallContainer:{
        marginHorizontal: 4,
        marginVertical: 18,
    }

})
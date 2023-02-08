import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgotPassword from '../screens/ForgotPassword';
import MainScreen from '../screens/MainScreen';

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name='WelcomeScreen' component={WelcomeScreen} />
                <Stack.Screen options={{ headerShown: false }} name='LoginScreen' component={LoginScreen} />
                <Stack.Screen options={{ headerShown: false }} name='HomeScreen' component={HomeScreen} />
                <Stack.Screen options={{ headerShown: false }} name='MainScreen' component={MainScreen} />
                <Stack.Screen options={{ headerShown: false }} name='RegisterScreen' component={RegisterScreen} />
                <Stack.Screen options={{ headerShown: false }} name='ForgotScreen' component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
export default RootNavigation;

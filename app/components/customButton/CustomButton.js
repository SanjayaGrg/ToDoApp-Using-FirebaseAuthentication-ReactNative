import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, type="PRIMARY"}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{
        
        width: '100%',
        padding: 15,
        marginVertical:15,
        alignItems: 'center',
        borderRadius: 4,
    },

    container_PRIMARY:{
        backgroundColor: '#3b71f3'
    },
    container_TERTIARY:{

    },

    text:
    {
        fontWeight:'bold',
        color: '#fff'
    },
    text_TERTIARY:{
        color: 'gray'
    }
})
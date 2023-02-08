import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    >
         <Icon 
            name='add'
            size={24}
            color='black'
         />
         <Text style={styles.title}>Add New ToDo</Text>
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d8e9a8',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20
    },
    title: {
        color: '#323232',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 5
    }
})
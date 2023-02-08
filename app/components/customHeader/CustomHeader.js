import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

const CustomHeader = ({deletePress, sortByAlpha}) => {

  const navigation = useNavigation();
  const onPressLogOut = ()=>{
    signOut(auth).then(() => {
      navigation.navigate('LoginScreen')
    });
  }

  return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          
          <Text style={styles.text}>To Do List</Text>
          <View style={styles.iconHeader}>
          <TouchableOpacity>
            <Icon
              name='sort-by-alpha'
              size={27}
              style={styles.icons}
              onPress={sortByAlpha}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name='delete'
              size={27}
              style={styles.icons}
              onPress={deletePress}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name='logout'
              size={27}
              style={styles.icons}
              onPress={onPressLogOut}
            />
          </TouchableOpacity>
          </View>
          

        </View>

      </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  container:{
    // paddingTop:StatusBar.currentHeight
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',

  },
  navbar:{
    marginTop:0,
    marginBottom: 10,
    height: 50,
    backgroundColor: '#d8e9a8',
    elevation: 3,
    borderRadius: 5,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconHeader:{
    flexDirection:'row',
    justifyContent:'space-between',

  },
  icons:{
    marginHorizontal: 7
  }
})
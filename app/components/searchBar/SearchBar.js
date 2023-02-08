import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({searchValue, value, containerStyle}) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <Icon 
        name='search'
        size={25}
        style={styles.icons}
      />
      <TextInput 
        style={styles.searchBar}
        placeholder='search'
        onChangeText={searchValue}
        value={value}
        // keyboardType="web-search"
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: '#95a5a6',
        backgroundColor: '#fff',
        borderRadius: 50,
        marginHorizontal: 20,
        height: 45,
    },
    icons:{
        marginLeft: 8,
        marginTop: 10
    },
    searchBar:{
        flex: 1,
        height: 40,
        paddingLeft: 5,
        fontSize: 18,
        marginTop: 5
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

const RoundButton = ({size, color, IconName, style, onPress}) => {
  return (
    <View style={styles.container}>
      <Icon
        name={IconName}
        size={size || 24}
        color={color || '#dbb2ff'}
        onPress={onPress}
        style={[styles.icons, {...style}]}

      />
    </View>
  )
}

export default RoundButton

const styles = StyleSheet.create({
  container:{
    // flex: 1
  },
  icons:{
    backgroundColor: '#ffff',
    padding: 20,
    borderRadius:50,
    elevation:5,
    shadowRadius: 20,
    margin: 15,
    
  }
})
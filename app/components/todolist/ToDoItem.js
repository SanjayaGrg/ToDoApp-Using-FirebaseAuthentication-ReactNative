import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db, updateDoc, doc, deleteDoc } from '../../../firebase';

// todo object
/*
1. id
2. title
3. isChecked
*/
const ToDoItem = (props) => {

  const [isChecked, setIsChecked] = useState(props.isChecked);

  const updateIsChecked = async () => {
    const todoRef = doc(db, "notes", props.id);

    // Set the "capital" field of the city 'DC'
    await updateDoc(todoRef, {
      isChecked: isChecked
    });
  }

  const deleteToDoItem = async () => {
    await deleteDoc(doc(db, "notes", props.id));
    props.getToDoList();
  }

  useEffect(() => {
    updateIsChecked();
  }, [isChecked])

  return (
    <SafeAreaView style={styles.container}>
      {/* checked Icon */}
      <TouchableOpacity
        onPress={() => setIsChecked(!isChecked)}
      >
        {
          isChecked ? <Icon
            name='check-circle'
            size={24}
            color='#000'
          /> : <Icon
            name='check-circle-outline'
            size={24}
            color='#000'
          />
        }


      </TouchableOpacity>


      {/* SHopping text */}
      <Text style={[styles.title, isChecked ? {textDecorationLine:'line-through'}:{textDecorationLine: 'none'}]}>{props.title}</Text>


      {/* Delete button */}
      <TouchableOpacity
      onPress={deleteToDoItem}
      >
        <Icon
          name='delete'
          size={24}
          color='#000'
        />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default ToDoItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '600',
    
    
  }
})
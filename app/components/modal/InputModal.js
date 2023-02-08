import { StyleSheet, Text, View, Modal, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import RoundButton from '../roundButton/RoundButton';

const InputModal = ({ onClose, onSubmit }) => {

  const [toDo, setToDo] = useState('');

  const handleChangeText = (text, valueFor) => {
    if (valueFor === 'toDo') setToDo(text);
  }

  const handleSubmit = () => {
    if (!toDo.trim()) return onClose()
    onSubmit(toDo);
    setToDo('');
    onClose();

  }
  const handleClose = () => {
    setToDo('');
    onClose();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add ToDo List</Text>
      <TextInput
        style={[styles.input, styles.toDo]}
        placeholder="Enter ToDos Here"
        value={toDo}
        onChangeText={(text) => handleChangeText(text, 'toDo')}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          {toDo.trim().length ? <RoundButton
            IconName="add"
            size={20}
            onPress={handleSubmit}

          /> : null}

        </TouchableOpacity>
        <TouchableOpacity>
          <RoundButton
            IconName="cancel"
            size={20}
            onPress={handleClose}

          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default InputModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    height: '60%'

  },
  header: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dbb2ff',
    fontSize: 20,
    color: '#000',
    marginHorizontal: 15
  },
  toDo: {
    height: 50,
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    marginVertical: 5,
    marginRight: 16,
  }
})
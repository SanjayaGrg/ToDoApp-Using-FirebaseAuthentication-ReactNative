import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Modal } from 'react-native'
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ToDoItem from '../components/todolist/ToDoItem';
import CustomHeader from '../components/customHeader';
import { app, auth, db, getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from './../../firebase';
import { query, where } from 'firebase/firestore';
import AddButton from '../components/addButton/AddButton';
import SearchBar from '../components/searchBar/SearchBar';

const MainScreen = () => {

  const [title, setTitle] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [dummyData, setDummyData] = useState(toDoList);
  const [masterData, setMasterData] = useState(toDoList);

  // search
  const handleSearch = (text) => {
    setDummyData(masterData);
    console.log('text',text)
    if (text){
      const newData = masterData.filter(item=>{
        const itemData = `${item.title}`
        const textData = text
        return itemData.indexOf(textData) > -1;
      })
      setDummyData(newData);
      setSearchQuery(text);
    }else{
      setDummyData(masterData);
      setSearchQuery(text);
    }

  }

  // sorting
  const sortByAlpha = ()=>{
    const sortedData = [...toDoList].sort((a,b)=>(a.key > b.key ? 1: -1));
    setToDoList(sortedData);
  }

  const addToDOItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        title: title,
        isChecked: false,
        userId: auth.currentUser.uid,

      });
      console.log("Document written with ID: ", docRef.id);
      getToDoList();
      setModalVisible(false);
      setTitle("");

    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  // fetch all list from firebase
  const getToDoList = async () => {
    const todoList = query(collection(db, "notes"), where("userId", "==", auth.currentUser.uid));
    const todoSnapshot = await getDocs(todoList);

    setToDoList(todoSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  // delete all list
  const deleteList = async () => {
    const todoList = query(collection(db, "notes"), where("userId", "==", auth.currentUser.uid));
    const todoSnapshot = await getDocs(todoList);

    todoSnapshot.docs.map((item) => deleteDoc(doc(db, "notes", item.id)));
    alert("All items deleted.");
    getToDoList();
  }

  const openModal = () => {
    setModalVisible(true);
  }
  const closeModal = () => {
    setModalVisible(false);
    setTitle("");
  }
  useEffect(() => {
    getToDoList();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        deletePress={deleteList}
        sortByAlpha={sortByAlpha}
      />
      {/* searchbar */}
      <SearchBar
        value={searchQuery}
        searchValue={(query) => handleSearch(query)}
      />

      {/* FlatList */}
      {toDoList.length > 0 ?
        <FlatList
          data={toDoList}
          refreshing={isRefreshing}
          onRefresh={()=>{
            getToDoList();
            setIsRefreshing(true);
          }}
          renderItem={({ item }) => <ToDoItem
            title={item.title}
            isChecked={item.isChecked}
            id={item.id}
            getToDoList={getToDoList}
          />}
          keyExtractor={item => item.id}
        /> : <ActivityIndicator
          size='large'
        />
      }


      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            {/* close modal button */}
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}
              onPress={closeModal}
            >
              <Icon
                name='cancel'
                size={30}
                color='#d8e9a8'
              />
            </TouchableOpacity>

            {/* text input */}
            <TextInput
              placeholder='add new list'
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={styles.inputModal}
              autoFocus
            />

            {/* add button */}
            <TouchableOpacity
              style={styles.button}
              onPress={addToDOItem}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>

      {/* open modal button */}
      <View>
        <AddButton
          onPress={openModal}
        />
      </View>


    </SafeAreaView>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  input: {
    backgroundColor: '#ddd',
    padding: 10,
    fontSize: 17,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 'auto',
    marginHorizontal: 10,
    // position: 'absolute',
    bottom: 0

  },
  button: {
    backgroundColor: '#d8e9a8',
    padding: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    fontSize: 17,
    color: '#000'
  },
  inputContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between'

  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: '#050504',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '40%'
  },
  inputModal: {
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 17,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20
  }

})
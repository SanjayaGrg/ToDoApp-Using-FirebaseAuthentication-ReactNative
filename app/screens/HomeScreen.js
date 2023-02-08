import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/customButton/CustomButton'
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { signOut, sendEmailVerification } from 'firebase/auth';
import RoundButton from '../components/roundButton/RoundButton';
import CustomHeader from '../components/customHeader/CustomHeader';
import SearchBar from '../components/searchBar/SearchBar';
import InputModal from '../components/modal/InputModal';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const Data = [
  { 'header': 'React Native', 'description': 'Today I did some css design for the todo app and collected some icons from vector icons and filled the card in the flatlist and called some items data in it.' },
  { 'header': 'Vue', 'description': 'Today I did some css design for the todo app and collected some icons from vector icons and filled the card in the flatlist and called some items data in it.' },
  { 'header': 'Python', 'description': 'Today I did some css design for the todo app and collected some icons from vector icons and filled the card in the flatlist and called some items data in it.' },
  { 'header': 'Django', 'description': 'Today I did some css design for the todo app and collected some icons from vector icons and filled the card in the flatlist and called some items data in it.' },
  { 'header': 'hint', 'description': 'Today I did some css design for the todo app and collected some icons from vector icons and filled the card in the flatlist and called some items data in it.' },
  { 'header': 'sorry', 'description': 'Today I did some css design for the todo app and collected some icons from vector icons and filled the card in the flatlist and called some items data in it.' },
  { 'header': 'sera', 'description': 'Today I did some css design for the todo app and collected some icons from vector icons and filled the card in the flatlist and called some items data in it.' },
]

const HomeScreen = () => {
  const navigation = useNavigation();

  //modal
  const [modalVisible, setModalVisible] = useState(false);

  const [toDos, setToDos] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isLoading, setIsLoading] = useState(false);




  //search
  const [searchQuery, setSearchQuery] = useState('')
  const [isFetching, setIsFetching] = useState(false);
  const [dummyData, setDummyData] = useState(Data);
  const [masterData, setMasterData] = useState(Data);
  const handleSearchQuery = (text) => {
    setDummyData(masterData);
    console.log("test", text);
    // setSearchQuery(text);
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = `${item.header}`
        const textData = text;
        return itemData.indexOf(textData) > -1;

      })
      setDummyData(newData);
      setSearchQuery(text)
    } else {
      setDummyData(masterData);
      setSearchQuery(text);
    }
  }
  //search end


  //refreshing
  const onRefresh = () => {
    setIsFetching(true);
    setDummyData(Data);
    setIsFetching(false);
  }


  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigation.navigate('LoginScreen')
    });

  }

  const redirectModal = () => {
    console.log("modal open!!")
    setModalVisible(true);
  }

  let loadToDoList = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let toDoList = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDoList.push(toDo);
    });
    setToDos(toDoList);
    setIsLoading(false);

  }

  if (isLoading) {
    loadToDoList();
  }

  let checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, 'todos', item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });

  }


  // const renderToDoItem = ({ item }) => {
  //   return (
  //     <View style={styles.rowContainer}>
  //       <BouncyCheckbox
  //         isChecked={item.completed}
  //         size={25}
  //         fillColor='#fff'
  //         text={item.text}
  //         iconStyle={{ borderColor: '#258ea6' }}
  //         onPress={(isChecked) => {
  //           checkToDoItem(item, isChecked);
  //         }}
  //       />

  //     </View>
  //   )
  // }
  let renderToDoItem = ({ item }) => {
    return (
      <View style={styles.rowContainer}>
        <View style={AppStyles.fillSpace}>
          <BouncyCheckbox
            isChecked={item.completed}
            size={25}
            fillColor="#258ea6"
            unfillColor='#ffffff'
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => { checkToDoItem(item, isChecked) }}
          />
        </View>
      </View>
    );
  }

  const showToDoList = () => {
    return (
      <FlatList
        data={toDos}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        // renderItem={(item) => <NoteCard header={item.text} />}
        renderItem={renderToDoItem}
        keyExtractor={item => item.id}
      />
    )
  }

  // SHowing contents
  const showContent = () => {
    return (
      <View>
        {isLoading ?
          <ActivityIndicator size='large' /> : showToDoList()}
        <TouchableOpacity>
          <RoundButton
            IconName='add'
            style={styles.icons}
            onPress={redirectModal}
            size={30}
          />
        </TouchableOpacity>
      </View>
    )

  }

  const handleSubmit = async (todo) => {
    let todoSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid
    }
    const docRef = await addDoc(collection(db, "todos"), todoSave);

    todoSave.id = docRef.id;

    let updatedToDos = [...toDos];
    updatedToDos.push(todoSave);
    setToDos(updatedToDos);

  }
  const showSendVerificationEmailContent = () => {
    return (
      <View>

        <Text> Please Verify your email to use this ToDo.</Text>
        <CustomButton
          text="Send Verification Email"
          onPress={() => sendEmailVerification(auth.currentUser)}
        />
      </View>

    )
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor='rgba(0,0,0,0.5)'
          barStyle='light-content'
        />
        <CustomHeader
          onPressLogOut={handleLogOut}
        />
        <SearchBar
          searchValue={(query) => handleSearchQuery(query)}
          value={searchQuery}
        />
        {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmailContent()}



      </SafeAreaView>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <InputModal
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmit}
        />
      </Modal>


    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:'center',
    // justifyContent:'center',
    // padding:16,
    backgroundColor: '#fff'
  },
  flatlist: {
    height: 500
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginVertical: 4
  },
  icons: {
    position: 'absolute',
    right: 15,
    elevation: 5
  }
})
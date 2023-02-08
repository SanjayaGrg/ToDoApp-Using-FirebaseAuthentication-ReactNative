import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc,getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_ucbpNmi2xg84IIOjXNDBjt5006rrivA",
    authDomain: "to-do-list-app-71237.firebaseapp.com",
    projectId: "to-do-list-app-71237",
    storageBucket: "to-do-list-app-71237.appspot.com",
    messagingSenderId: "191318147855",
    appId: "1:191318147855:web:85f7b9e822b5333cee347a",
    measurementId: "G-4DX37PC9PV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
    app,
    auth,
    db, getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc
}
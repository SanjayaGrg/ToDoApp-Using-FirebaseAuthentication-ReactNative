import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc,getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
    // put the firebase config here to run the project in firebase
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
    app,
    auth,
    db, getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc
}
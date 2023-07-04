import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const getSavedTestFromDatabase = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return false;
  }
};

export const saveTestToDatabase = async (data, title, time) => {
  try {
    const uploadData = {
      choices: JSON.stringify(data.choices),
      title: title,
      time: time,
    };
    const docRef = await addDoc(collection(db, "users"), uploadData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    return false;
  }
};

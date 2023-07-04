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
  apiKey: "AIzaSyAxvx5m6FpAqVryYF05CPzlbgh6C5NAs8I",
  authDomain: "peanut-18f1c.firebaseapp.com",
  projectId: "peanut-18f1c",
  storageBucket: "peanut-18f1c.appspot.com",
  messagingSenderId: "495683247041",
  appId: "1:495683247041:web:e7bc5175aa1236b8bf2d40",
  measurementId: "G-D1Y7Q1PXLY",
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

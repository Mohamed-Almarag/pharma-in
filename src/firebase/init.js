import firebase from "firebase/app";
import "@firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCRZy9p_IV-YjbHBxckpi-ZFjcjySYn9Vw",
  authDomain: "projectfirbase-43f4a.firebaseapp.com",
  databaseURL: "https://projectfirbase-43f4a-default-rtdb.firebaseio.com",
  projectId: "projectfirbase-43f4a",
  storageBucket: "projectfirbase-43f4a.appspot.com",
  messagingSenderId: "139810086450",
  appId: "1:139810086450:web:96269b6739f44fa9baa62b",
  measurementId: "G-ZK3JGT9GJ5",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();

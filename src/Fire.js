import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig1 = {
  apiKey: "AIzaSyCAsDVHGNFpgboBoohExEdttI-m8muMOw4",
  authDomain: "dbmywork-47005.firebaseapp.com",
  projectId: "dbmywork-47005",
  storageBucket: "dbmywork-47005.firebasestorage.app",
  messagingSenderId: "953150878401",
  appId: "1:953150878401:web:9ad597221fa1597b089a40",
  measurementId: "G-4D3Z6K5N2P",
};

const firebaseConfig2 = {
  apiKey: "AIzaSyA-teYBGhAa7KmYa2IW9wx66VUdmhsqzvI",
  authDomain: "billing-565b3.firebaseapp.com",
  databaseURL: "https://billing-565b3-default-rtdb.firebaseio.com",
  projectId: "billing-565b3",
  storageBucket: "billing-565b3.appspot.com",
  messagingSenderId: "1079915732213",
  appId: "1:1079915732213:web:eea86fe01231d9cba6f9bc",
};

const app1 = firebase.initializeApp(firebaseConfig1, "App1");
const app2 = firebase.initializeApp(firebaseConfig2, "App2");


export default app1.database().ref();
export const auth = app1.auth();
export const storage = app2.storage().ref();

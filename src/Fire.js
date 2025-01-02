import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig1 = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
  projectId:process.env.REACT_APP_PROJECT_ID,
  messagingSenderId:process.env.REACT_APP_MESSAGE_SENDER,
  appId:process.env.REACT_APP_APP_ID,
  measurementId:process.env.REACT_APP_MEASUREMENT_ID,
};
const firebaseConfig2 = {
  apiKey:process.env.REACT_APP_ANSH_API_KEY,
  authDomain:process.env.REACT_APP_ANSH_AUTH_DOMAIN,
  storageBucket:process.env.REACT_APP_ANSH_STORAGE_BUCKET,
  projectId:process.env.REACT_APP_ANSH_PROJECT_ID,
  messagingSenderId:process.env.REACT_APP_ANSH_MESSAGE_SENDER,
  appId:process.env.REACT_APP_ANSH_APP_ID,
  measurementId:process.env.REACT_APP_ANSH_MEASUREMENT_ID,
  databaseURL:process.env.REACT_APP_ANSH_DATABASE_ID,
};

const app1 = firebase.initializeApp(firebaseConfig1, "App1");
const app2 = firebase.initializeApp(firebaseConfig2, "App2");


export default app1.database().ref();
export const auth = app1.auth();
export const storage = app2.storage().ref();

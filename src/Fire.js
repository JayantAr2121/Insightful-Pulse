import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCAsDVHGNFpgboBoohExEdttI-m8muMOw4",
  authDomain: "dbmywork-47005.firebaseapp.com",
  projectId: "dbmywork-47005",
  storageBucket: "dbmywork-47005.firebasestorage.app",
  messagingSenderId: "953150878401",
  appId: "1:953150878401:web:9ad597221fa1597b089a40",
  measurementId: "G-4D3Z6K5N2P"
  };
  const app=firebase.initializeApp(firebaseConfig)
export default app.database().ref()
export const storage= app.storage().ref()
export const auth=app.auth()
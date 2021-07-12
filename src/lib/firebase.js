import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCWtwVxKNozmysHaDOVTSAl2M9SESeSPYg",
  authDomain: "instagram-clone-b6bd3.firebaseapp.com",
  projectId: "instagram-clone-b6bd3",
  storageBucket: "instagram-clone-b6bd3.appspot.com",
  messagingSenderId: "537032415671",
  appId: "1:537032415671:web:0e24827bbe6a6831573032",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };

import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAxZy5U4XxxyRGMwbvRReN7smNiyxJfnHg",
    authDomain: "crud-react-908b8.firebaseapp.com",
    databaseURL: "https://crud-react-908b8.firebaseio.com",
    projectId: "crud-react-908b8",
    storageBucket: "crud-react-908b8.appspot.com",
    messagingSenderId: "952054275638",
    appId: "1:952054275638:web:938799a9049d969b238297"
  };

  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();



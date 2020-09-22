import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDTBpWrJ0Gf7UieUMoQxPc1b6VnPafpfww",
  authDomain: "brascoffee-86dd7.firebaseapp.com",
  databaseURL: "https://brascoffee-86dd7.firebaseio.com",
  projectId: "brascoffee-86dd7",
  storageBucket: "brascoffee-86dd7.appspot.com",
  messagingSenderId: "123150048242",
  appId: "1:123150048242:web:7b23ea4db4ab4fc2d6a96b",
  measurementId: "G-TZT88XLN5L"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const db = firebase.firestore();


export default db;
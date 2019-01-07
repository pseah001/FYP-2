import firebase from "firebase";

export const FIREBASE_CONFIG = {
googleWebClientId: "572465756799-b58d3059rssbd1nbedstsrkbvnqkd4pk.apps.googleusercontent.com",

apiKey: "AIzaSyBCl09Q3sIo9WrYPOk98WSQ6QojOo7gg_o",
authDomain: "fyp2018-b5b8a.firebaseapp.com",
databaseURL: "https://fyp2018-b5b8a.firebaseio.com",
projectId: "fyp2018-b5b8a",
storageBucket: "fyp2018-b5b8a.appspot.com",
messagingSenderId: "572465756799"
};
firebase.initializeApp(FIREBASE_CONFIG);
firebase.firestore().settings({
  timestampsInSnapshots: true
})
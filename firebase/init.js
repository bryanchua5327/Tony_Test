import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import "firebase/messaging";

// Fill this in with your firebase details
var config = {
  apiKey: "AIzaSyDe91yMsx3TJ2qeyW4TsGlKT_8gMNw7uuE",
  authDomain: "studyhubasiaapp.firebaseapp.com",
  projectId: "studyhubasiaapp",
  storageBucket: "studyhubasiaapp.appspot.com",
  messagingSenderId: "597012893034",
  appId: "1:597012893034:web:baa0cf6770884112402913",
  measurementId: "G-1KF8ZXP4QS"
};

!firebase.apps.length ? firebase.initializeApp(config) : "";

export const auth = firebase.auth();
export const persistencetype = firebase.auth.Auth.Persistence.LOCAL;

//Comment this out if not using local emulator
// firebase.firestore().settings({
//   host: "localhost:8080",
//   ssl: false,
// });

//Specify the link to firestoreDB collection that you will be using, feel free to change, add, delete.
export const firestoreDB = firebase.firestore()

export const storage = firebase.app().storage("gs://YOUR_BUCKET_HERE");
// export const messaging = firebase.messaging();
// // Set VAPID KEY
// messaging.usePublicVapidKey(
//   "BDYE2EYHdIp8qHjTKcJYPvO4PgaAH2pSruP55FOtNs5jWsgdeg7YK6OgJ0daSu21kN7aSzU19NRXRqC4bfITZYQ"
// );
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const FacebookProvider = new firebase.auth.FacebookAuthProvider()
export const LinkedInProvider = new firebase.auth.OAuthProvider('linkedin.com');
LinkedInProvider.addScope('r_liteprofile');
LinkedInProvider.addScope('r_emailaddress');

export default firebase;

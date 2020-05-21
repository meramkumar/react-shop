import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDSAWh-CT8dYOsbeZ6JSKgBF0Qgbwf1CVQ",
  authDomain: "crown-db-7c4fb.firebaseapp.com",
  databaseURL: "https://crown-db-7c4fb.firebaseio.com",
  projectId: "crown-db-7c4fb",
  storageBucket: "crown-db-7c4fb.appspot.com",
  messagingSenderId: "461429544206",
  appId: "1:461429544206:web:a973fc7fe7626a2db1b35f",
  measurementId: "G-D72JJHN4GL"
};

export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    }
    catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;


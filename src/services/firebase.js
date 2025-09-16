import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const signInWithEmailAndPassword = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();

export const onAuthStateChanged = (callback) =>
  firebase.auth().onAuthStateChanged(callback);

export const onResetUserPassword = (email, route) =>
  firebase.auth().sendPasswordResetEmail(email, route);

export const logSessionWithToken = (token) =>
  firebase.auth().signInWithCustomToken(token);

export const signInWithGoogle = async () => {
  try {
    const provider = await new firebase.auth.GoogleAuthProvider();
    const res = await firebase.auth().signInWithPopup(provider);
    return res;
  } catch (error) {
    return error;
  }
};

export const logEvent = (event, params) =>
  firebase.analytics().logEvent(event, params);

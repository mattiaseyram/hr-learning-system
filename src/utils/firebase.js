import config from './firebaseConfig';
import firebase from 'firebase';
import 'firebase/functions';
import 'firebase/firestore';
import 'firebase/auth';

const local = false;
const app = firebase.initializeApp(config);

if (local)
    app.functions().useFunctionsEmulator('http://localhost:5000');

export default app;
export const functions = app.functions();
export const db = app.firestore();
export const auth = app.auth();
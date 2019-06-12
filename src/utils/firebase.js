import config from './firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/functions';

const app = firebase.initializeApp(config);
app.functions().useFunctionsEmulator('http://localhost:5000');

export default app;
export const functions = app.functions();

import config from './firebaseConfig';
import firebase from 'firebase/app';
import 'firebase/functions';

const app = firebase.initializeApp(config);
app.functions().useFunctionsEmulator('http://localhost:5001');

export default app;
export const functions = app.functions();

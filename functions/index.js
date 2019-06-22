const functions = require('firebase-functions');
const admin = require('firebase-admin');

// try to run locally, if not initialize firebase admin SDK default way
try {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} catch (err) {
    admin.initializeApp();
    console.warn('Initializing default firebase admin.');
}

const db = admin.firestore();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

//retrieve user from db with given username
exports.getUserByUsername = functions.https.onCall(async (data, context) => {

    try {

        const username = data.username.toLowerCase();

        const querySnapshot = await db.collection('users').where('username', '==', username).limit(1).get();
        const user = querySnapshot.docs[0].data();

        return { user };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getUser: ' + err.message);
    }

});
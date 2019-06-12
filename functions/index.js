const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('../hr-learning-system-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hr-learning-system.firebaseio.com"
});

const db = admin.firestore();

//retrieve user from db with given user_id
exports.getUser = functions.https.onCall(async (data, context) => {

    const { user_id } = data;

    try {

        const result = await db.collection('users').doc(user_id).get();
        const user = result.data();

        return { user };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getUser: ' + err.message);
    }

});
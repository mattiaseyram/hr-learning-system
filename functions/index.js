const functions = require('firebase-functions');
const admin = require('firebase-admin');

    admin.initializeApp();

const db = admin.firestore();

//retrieve user from db with given username
exports.getUserByUsername = functions.https.onCall(async (data, context) => {

    try {

        const username = data.username.toLowerCase();

        const query = await db.collection('users').where('username', '==', username).limit(1).get();
        const user = query.docs[0].data();
        const userId = query.docs[0].id;

        return { user, userId };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getUser: ' + err.message);
    }

});

//creates new user in the database
exports.createUser = functions.https.onCall(async (data, context) => {

    try {
        const user = data.user;
        const username = user.username.toLowerCase();

        const query = await db.collection('users').where('username', '==', username).limit(1).get();

        if (!query.exists) {

            const createdUser = await db.collection('users').add(user);
            const userId = createdUser.id;

            return { user, userId };
            
        } else {
            throw new Error('this username already exists.');
        }

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling createUser: ' + err.message);
    }
});

//updates user in the database
exports.updateUser = functions.https.onCall(async (data, context) => {

    try {
        const user = data.user;
        const userId = data.userId;

        const update = await db.collection('users').doc(userId).update({...user});
        const doc = await db.collection('users').doc(userId).get();
        const updatedUser = doc.data();

        return { user: updatedUser, userId };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling updateUser: ' + err.message);
    }
});

//deletes user by userId in the database
exports.deleteUser = functions.https.onCall(async (data, context) => {

    try {
        const userId = data.userId;

                console.log(JSON.stringify(userId));

        const del = await db.collection('users').doc(userId).delete();

        return { user: null, userId: null };

    } catch (err) {
        //console.error(err)
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling updateUser: ' + err.message);
    }
});

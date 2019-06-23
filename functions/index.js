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

/**
 * data should be a json object  { user: id , courses: [courseIds] } 
 * 
 * 
 */
exports.addCoursesToUser = functions.https.onCall(async (data, context) => {

    try {
        
        const {userId, courseIds} = data;
        
        const userSnapshot = await db.collection('users').doc(userId).get();

        let user = userSnapshot.data();

        for (let courseId of courseIds) {
            
            if (! (courseId in user.courses)) {

                const courseSnapshot = await db.collection('courses').doc(courseId).get();

                const course = courseSnapshot.data();

                

                let lessons = {};

                await course.lessons && course.lessons.forEach(lesson => {
                    lessons[lesson] = {
                        complete: 0,
                        answers: []
                    }
                });

                user.courses[courseId] = {
                    mandatory: Boolean(course.mandatory),
                    lessons
                };

            }

        }

        

        await db.collection('users').doc(userId).update({ ...user });
        return {  };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling addCourseToUser: ' + err.message);
    }

});
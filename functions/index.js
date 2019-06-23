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
 * data should be a json object  { userId: id , courseIds: [courseIds] } 
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

/**
 * data should be a json object  { userId: id } 
 * 
 * 
 */
exports.getCourseCatalog = functions.https.onCall(async (data, context) => {

    try {
        
        console.log(data);
        const { userId } = data;
        
        const userSnapshot = await db.collection('users').doc(userId).get();

        let user = userSnapshot.data();

        const coursesSnapshot = await db.collection('courses').get();
 
        let courses = {};

        coursesSnapshot.forEach(doc => {

            if (doc.id in user.courses) {
                courses[doc.id] = doc.data();
            }
        })

        return { courses };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getCourseCatalog: ' + err.message);
    }

});

/**
 * data should be a json object  { courseId: id } 
 * 
 * 
 */
exports.getLessonsByCourseId = functions.https.onCall(async (data, context) => {

    try {
        
        const { courseId } = data;
        
        const courseSnapshot = await db.collection('courses').doc(courseId).get();

        let course = courseSnapshot.data();

        const lessonsSnapshot = await db.collection('lessons').get();
 
        let lessons = {};

        lessonsSnapshot.forEach(doc => {

            if (course.lessons.includes(doc.id)) {
                lessons[doc.id] = doc.data();
            }
        })

        return { lessons };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getLessonsByCourseId: ' + err.message);
    }

});

/**
 * data should be a json object  { userId: id, lessonId: id, courseId: id} 
 * 
 * 
 */

exports.calculateLessonScore = functions.https.onCall(async (data, context) => {

    try {
        
        const { userId, lessonId, courseId } = data;
        var score = 0; 
        var completed = false;
        const userSnapshot = await db.collection('users').doc(userId).get();

        const lessonSnapshot = await db.collection('lessons').doc(lessonId).get();

        let user = userSnapshot.data();

        //Actual answers
        let quiz = lessonSnapshot.data().questions;

        //Lesson attempt from user 
        let lessonAttempt = user.courses[courseId].lessons[lessonId].answers;

        //Want to check if each lessonAttempt 
  
        for(let i = 0; i < lessonAttempt.length; i++){

            if(quiz[i].answer == lessonAttempt[i]){
                score+=1;
            }
        }
        if(score == lessonAttempt.length){
            completed = true;
        }

        //Update user with the score 
        user.courses[courseId].lessons[lessonId].total= score;
        user.courses[courseId].lessons[lessonId].complete = completed;

        await db.collection('users').doc(userId).update({ ...user });

        return { user }

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling addCourseToUser: ' + err.message);
    }

});

/**
 * data should be a json object  { userId: id }  
 * 
 * 
 */

exports.getSubordinates= functions.https.onCall(async (data, context) => {

    try {
        
        const { userId } = data;
        
        const userSnapshot = await db.collection('users').doc(userId).get();

        const allUsersSnapshot = await db.collection('users').get();

        let user = userSnapshot.data();

        var subordinates = {}; 
        allUsersSnapshot.forEach(doc => {
            if(doc.id in user.manages){
                subordinates[doc.id] = doc;
            }
        });


        return { subordinates }    

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getSubordinates: ' + err.message);
    }

});

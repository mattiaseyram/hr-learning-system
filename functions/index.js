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
 * Adds course ids to given user
 * data should be a json object  { userId: id , courseIds: [courseIds] } 
 */
exports.addCoursesToUser = functions.https.onCall(async (data, context) => {

    try {

        const { userId, courseIds } = data;

        const userSnapshot = await db.collection('users').doc(userId).get();

        let user = userSnapshot.data();

        if (!user.courses) user.courses = {};

        for (let courseId of courseIds) {

            if ( !(courseId in user.courses)) {

                const courseSnapshot = await db.collection('courses').doc(courseId).get();

                const course = courseSnapshot.data();

                let lessons = {};

                await course.lessons && course.lessons.forEach(lesson => {
                    lessons[lesson] = {
                        complete: false,
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
        return {};

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling addCourseToUser: ' + err.message);
    }

});

/**
 * Gets courses (assigned to user id, or all)
 * data should be a json object  { userId: id } 
 */
exports.getCourses = functions.https.onCall(async (data, context) => {

    try {

        const { userId, all = false } = data;
       
        const userSnapshot = await db.collection('users').doc(userId).get();

        let user = userSnapshot.data();

        const coursesSnapshot = await db.collection('courses').get();

        let courses = {};

        if (!user.courses) return { courses };

        coursesSnapshot.forEach(doc => {

            if (all || doc.id in user.courses) {

                courses[doc.id] = doc.data();
            }
        })

        return { courses };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getCourses: ' + err.message);
    }

});

/**
 * Gets lessons (by course id, or all)
 * data should be a json object  { courseId: id } 
 */
exports.getLessons = functions.https.onCall(async (data, context) => {

    try {

        const { courseId = null } = data;

        const lessonsSnapshot = await db.collection('lessons').get();
        let lessons = {};

        if (courseId) {

            const courseSnapshot = await db.collection('courses').doc(courseId).get();

            let course = courseSnapshot.data();

            if (!course.lessons) return { lessons };

            lessonsSnapshot.forEach(doc => {

                if (course.lessons.includes(doc.id)) {
                    lessons[doc.id] = doc.data();
                }
            })

        } else {
            lessonsSnapshot.forEach(doc => {
                lessons[doc.id] = doc.data();
            });
        }

        return { lessons };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getLessons: ' + err.message);
    }

});

/**
 * Calculates the user's score on the quiz
 * data should be a json object  { userId: id, lessonId: id, courseId: id} 
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

        for (let i = 0; i < lessonAttempt.length; i++) {

            if (quiz[i].answer === lessonAttempt[i]) {
                score += 1;
            }
        }
        if (score === quiz.length) {
            completed = true;
        }
        
        //Update user with the score 
        user.courses[courseId].lessons[lessonId].total = score;
        user.courses[courseId].lessons[lessonId].complete = completed;
        var courseCompleted = true; 
        for(li in user.courses[courseId].lessons){

            if(!user.courses[courseId].lessons[li].complete){
                courseCompleted = false;
            }
        }
        user.courses[courseId].completed = courseCompleted;
        await db.collection('users').doc(userId).update({ ...user });

        return { user };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling addCourseToUser: ' + err.message);
    }

});

/**
 * Gets the user's subordinate users
 * data should be a json object  { userId: id }  
 */
exports.getSubordinates = functions.https.onCall(async (data, context) => {

    try {

        const { userId } = data;

        const userSnapshot = await db.collection('users').doc(userId).get();

        const allUsersSnapshot = await db.collection('users').get();

        let user = userSnapshot.data();
      
        let subordinates = {};
      
        if (!user.manages) return { subordinates };

        allUsersSnapshot.forEach(doc => {

            if (user.manages.includes(doc.id)) {
                subordinates[doc.id] = doc.data();
            }
        });

        return { subordinates };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getSubordinates: ' + err.message);
    }

});

exports.getAllUsers = functions.https.onCall(async (data,context)=>{
    
    try{
        const userSnapshot = await db.collection('users').get();
        var allUsers ={};
        userSnapshot.forEach(user =>{
            allUsers[user.id] = user.data();
        });
        return { allUsers}
    } catch(err){
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling getAllUsers: ' + err.message);
    }
    
});
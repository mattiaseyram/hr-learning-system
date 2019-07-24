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

const auth = admin.auth();
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

            if (!(courseId in user.courses)) {

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
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling addCoursesToUser: ' + err.message);
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

        const user = userSnapshot.data();

        const usersSnapshot = all && user && user.is_admin ? await db.collection('users').get() : null;

        const coursesSnapshot = await db.collection('courses').get();

        let courses = {};

        if (!user.courses) return { courses };

        coursesSnapshot.forEach(doc => {

            if (all || doc.id in user.courses) {
                courses[doc.id] = doc.data();
            }
        })

        if (!usersSnapshot) return { courses };

        Object.keys(courses).forEach(courseId => {

            courses[courseId].num_users = 0;
            courses[courseId].num_users_completed = 0;

            usersSnapshot.forEach(doc => {

                const user2 = doc.data();

                if (user2 && user2.courses && user2.courses[courseId])
                    courses[courseId].num_users += 1;

                if (user2 && user2.courses && user2.courses[courseId] && user2.courses[courseId].complete)
                    courses[courseId].num_users_completed += 1;

            });
        });

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
        let score = 0;
        let complete = false;
        const userSnapshot = await db.collection('users').doc(userId).get();

        const lessonSnapshot = await db.collection('lessons').doc(lessonId).get();

        let user = userSnapshot.data();

        //Actual answers
        let quiz = lessonSnapshot.data().questions;

        //Lesson attempt from user 
        let lessonAttempt = user.courses[courseId].lessons[lessonId].answers;

        //Want to check if each lessonAttempt 

        for (let i = 0; i < lessonAttempt.length; i++) {

            if (quiz[i].answer == lessonAttempt[i]) {
                score += 1;
            }
        }
        if (score === quiz.length) {
            complete = true;
        }

        //Update user with the score 
        user.courses[courseId].lessons[lessonId].score = score;
        user.courses[courseId].lessons[lessonId].complete = complete;
        let courseCompleted = true;
        for (li in user.courses[courseId].lessons) {

            if (!user.courses[courseId].lessons[li].complete) {
                courseCompleted = false;
            }
        }

        user.courses[courseId].complete = courseCompleted;
        await db.collection('users').doc(userId).update({ ...user });

        return { user };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling calculateLessonScore: ' + err.message);
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

exports.importUsersFromRecruitment = functions.https.onCall(async (data, context) => {

    try {

        const firebase = require('firebase');

        const config = {
            apiKey: "AIzaSyCNkrsI8P9HH63yxZSDmvAEL4-vu6c8wl0",
            authDomain: "recruitment-6cae5.firebaseapp.com",
            databaseURL: "https://recruitment-6cae5.firebaseio.com",
            projectId: "recruitment-6cae5",
            storageBucket: "recruitment-6cae5.appspot.com",
            messagingSenderId: "307067666683",
            appId: "1:307067666683:web:39e93a69988eacbc"
        }

        const recruitmentApp = firebase.initializeApp(config, "recruit");

        const employeesRef = recruitmentApp.database().ref('employees');

        const employeesSnapshot = await employeesRef.once('value');

        const employees = employeesSnapshot.val();
        for (let employee in employees) {

            const data = {
                id: employee,
                name: employees[employee].name,
                email: employees[employee].email,
                password: 'default',
                phone: employees[employee].phone,
                role: employees[employee].role,
                salary: employees[employee].salary,
                currently_employed: employees[employee].currently_employed,
                superior: employees[employee].superior,
            };

            if (!data || !data.name || !data.email) continue;

            try {

                console.log(data.name);

                const newUser = await admin.auth().createUser({
                    email: data.email,
                    emailVerified: true,
                    password: data.password,
                    displayName: data.name || 'name',
                    disabled: false
                });

                const newUserData = {
                    first_name: data.name || 'first_name',
                    last_name: '',
                    email: data.email,
                    role: '',
                    is_admin: false,
                    manages: [],
                    courses: {}
                };

                await db.collection('users').doc(newUser.uid).set({ ...newUserData });

            } catch (err2) {}

        }

        return {
            numNewUsers: employeesSnapshot.numChildren()
        };

    } catch (err) {
        throw new functions.https.HttpsError('unknown', 'Something went wrong calling importUsersFromRecruitment: ' + err.message);
    }

});

import { SET_COURSE, SET_COURSES } from '../actionTypes';
import { functions, db, auth } from '../../utils/firebase';
import { setLoading, setWarning } from './ui';
import { fetchLessons } from './lesson';

/**
 * Creates course in the db
 * @param {*} courseData 
 */
export const createCourse = (courseData) => async dispatch => {

    await dispatch(setLoading(true));

    try {

        const user = auth.currentUser;
        const created_by = user.uid;

        const doc = await db.collection('courses').add({
            ...courseData,
            created_by
        });

        await fetchCourse(doc.id);

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong creating course, please try again.'));
    }

    await dispatch(setLoading(false));

}

/**
 * Listens for updates to course with given id in the db
 * @param {String} id 
 */
export const fetchCourse = (id) => async dispatch => {

    await dispatch(setLoading(true));

    try {

        db.collection('courses').doc(id).onSnapshot(doc => {
            
            dispatch({
                type: SET_COURSE,
                course: doc.data(),
                id: doc.id
            });

            dispatch(fetchLessons(doc.id));

        });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong fetching course, please try again.'));
    }

    await dispatch(setLoading(false));

}

/**
 * Updates course by id in the db
 * @param {String} id 
 * @param {*} courseData 
 */
export const updateCourse = (id, courseData) => async dispatch => {

    await dispatch(setLoading(true));

    try {

        await db.collection('courses').doc(id).update({ ...courseData });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong updating course, please try again.'));
    }

    await dispatch(setLoading(false));
};

/**
 * Deletes course with given id from the db
 * @param {String} id 
 */
export const deleteCourse = (id) => async dispatch => {

    await dispatch(setLoading(true));

    try {

        await db.collection('courses').doc(id).delete();

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong deleting course, please try again.'));
    }

    await dispatch(setLoading(false));
};

/**
 * gets courses related to the user
 * @param {String} courseId 
 */
export const fetchCourses = (all = false) => async dispatch => {

    await dispatch(setLoading(true));

    dispatch({
        type: SET_COURSES
    });

    try {

        const user = auth.currentUser;
        const userId = user.uid;

        const result = await functions.httpsCallable('getCourses')({ userId, all });

        const { courses } = result.data;

        dispatch({
            type: SET_COURSES,
            courses
        });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong retrieving courses, please try again.'));
    }

    await dispatch(setLoading(false));

}
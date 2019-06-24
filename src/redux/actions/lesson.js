import { SET_LESSON, SET_LESSONS } from '../actionTypes';
import { setLoading, setWarning } from './ui';
import { functions, db, auth } from '../../utils/firebase';

/**
 * Creates lesson in the db
 * @param {*} lessonData 
 */
export const createLesson = (lessonData) => async dispatch => {

    dispatch(setLoading(true));

    try {

        const user = auth.currentUser;
        const created_by = user.uid;

        const doc = await db.collection('lessons').add({
            ...lessonData,
            created_by
        });

        await fetchLesson(doc.id);

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong creating lesson, please try again.'));
    }

    dispatch(setLoading(false));

}

/**
 * Listens for updates to lesson with given id in the db
 * @param {String} id 
 */
export const fetchLesson = (id) => async dispatch => {

    dispatch(setLoading(true));

    try {

        db.collection('lessons').doc(id).onSnapshot(doc => {
            dispatch({
                type: SET_LESSON,
                lesson: doc.data(),
                id: doc.id
            });
        });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong fetching lesson, please try again.'));
    }

    dispatch(setLoading(false));

}

/**
 * Updates lesson by id in the db
 * @param {String} id 
 * @param {*} lessonData 
 */
export const updateLesson = (id, lessonData) => async dispatch => {

    dispatch(setLoading(true));

    try {

        await db.collection('lessons').doc(id).update({ ...lessonData });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong updating lesson, please try again.'));
    }

    dispatch(setLoading(false));
};

/**
 * Deletes lesson with given id from the db
 * @param {String} id 
 */
export const deleteLesson = (id) => async dispatch => {

    dispatch(setLoading(true));

    try {

        await db.collection('lessons').doc(id).delete();

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong deleting lesson, please try again.'));
    }

    dispatch(setLoading(false));

};

/**
 * gets lessons related to course id
 * @param {String} courseId 
 */
export const fetchLessons = (courseId = null) => async dispatch => {

    dispatch(setLoading(true));

    dispatch({
        type: SET_LESSONS
    });

    try {

        const result = await functions.httpsCallable('getLessons')({ courseId });
        const { lessons } = result.data;

        dispatch({
            type: SET_LESSONS,
            lessons
        });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong retrieving lessons, please try again.'));
    }

    dispatch(setLoading(false));

}
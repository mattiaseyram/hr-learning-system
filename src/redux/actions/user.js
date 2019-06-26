import { SET_USER, SET_USERS } from '../actionTypes';
import { functions, db, auth } from '../../utils/firebase';
import { setLoading, setWarning } from './ui';

/**
 * Logs in the user with the given email and password
 * @param {*} email 
 * @param {*} password 
 */
export const loginUser = (email, password) => async dispatch => {

    await dispatch(setLoading(true));

    try {

        await auth.signInWithEmailAndPassword(email, password);

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong signing in, please try again.'));
    }

    await dispatch(setLoading(false));
};

/**
 * Creates a listener to the current user's data the database
 */
export const fetchUser = () => dispatch => {

    try {

        const unsubscribe = auth.onAuthStateChanged(user => {

            if (user) {

                db.collection('users').doc(user.uid).onSnapshot(doc => {

                        dispatch({
                            type: SET_USER,
                            user: doc.data()
                        });

                        dispatch(fetchUsers());

                });

            } else {

                dispatch({
                    type: SET_USER
                });
            }

        });

        return unsubscribe;

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong fetching account, please try again.'));
    }

};

/**
 * Creates a new user with the given userData (which must contain keys username and password)
 * @param {*} userData 
 */
export const createUser = (userData) => async dispatch => {

    await dispatch(setLoading(true));

    try {

        const email = userData.email;
        const password = userData.password;
        delete userData.password;

        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await db.collection('users').doc(user.uid).set(userData);

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong creating account, please try again.'));
    }

    await dispatch(setLoading(false));
};

/**
 * Creates a new user with the given userData
 * @param {*} userData 
 */
export const updateUser = (userData) => async dispatch => {

    await dispatch(setLoading(true));

    try {

        const user = auth.currentUser;

        await db.collection('users').doc(user.uid).update({ ...userData });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong updating account, please try again.'));
    }

    await dispatch(setLoading(false));
};

/**
 * Deletes the current user
 */
export const deleteUser = () => async dispatch => {

    await dispatch(setLoading(true));

    try {

        const user = auth.currentUser;

        await db.collection('users').doc(user.uid).delete();

        await user.delete();

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong deleting account, please try again.'));
    }

    await dispatch(setLoading(false));
};

/**
 * Logs out the current user
 */
export const logoutUser = () => async dispatch => {

    await dispatch(setLoading(true));

    try {

        await auth.signOut();

        dispatch({
            type: SET_USER
        });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong signing out, please try again.'));
    }

    await dispatch(setLoading(false));
};

/**
 * Adds course to user
 */
export const addCoursesToUser = (userIdToAdd, courseIds) => async dispatch => {

    await dispatch(setLoading(true));

    try {

        const user = auth.currentUser;
        const userId = userIdToAdd ? userIdToAdd : user.uid;

        await functions.httpsCallable('addCoursesToUser')({ userId, courseIds });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong adding course to user please try again.'));
    }

    await dispatch(setLoading(false));

}

/**
 * Fetches the signed in user's subordinates
 */
export const fetchUsers = () => async dispatch => {

    await dispatch(setLoading(true));

    try {

        const user = auth.currentUser;
        const userId = user.uid;

        const result = await functions.httpsCallable('getSubordinates')({ userId });

        const { subordinates } = result.data;

        dispatch({
            type: SET_USERS,
            users: subordinates
        });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong retrieving users, please try again.'));

        dispatch({
            type: SET_USERS
        });
    }

    await dispatch(setLoading(false));

}
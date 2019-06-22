import { SET_USER } from '../actionTypes';
import { setLoading, setWarning } from './ui';
import { db, auth } from '../../utils/firebase';

/**
 * Logs in the user with the given email and password
 * @param {*} email 
 * @param {*} password 
 */
export const loginUser = (email, password) => async dispatch => {

    dispatch(setLoading(true));

    try {

        await auth.signInWithEmailAndPassword(email, password);

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong signing in, please try again.'));
    }

    dispatch(setLoading(false));
};

/**
 * Creates a listener to the current user's data the database
 */
export const fetchUser = () => dispatch => {

    try {

        const unsubscribe = auth.onAuthStateChanged(user => {

            dispatch(setLoading(true));

            if (user) {

                db.collection('users').doc(user.uid).onSnapshot(doc => {
                    dispatch({
                        type: SET_USER,
                        user: doc.data()
                    });
                });

            } else {

                dispatch({
                    type: SET_USER
                });
            }

            dispatch(setLoading(false));

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

    dispatch(setLoading(true));

    try {

        const email = userData.email;
        const password = userData.password;
        delete userData.email;
        delete userData.password;

        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await db.collection('users').doc(user.uid).set(userData);

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong creating account, please try again.'));
    }

    dispatch(setLoading(false));
};

/**
 * Creates a new user with the given userData
 * @param {*} userData 
 */
export const updateUser = (userData) => async dispatch => {

    dispatch(setLoading(true));

    try {

        const user = auth.currentUser;

        await db.collection('users').doc(user.uid).update({ ...userData });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong updating account, please try again.'));
    }

    dispatch(setLoading(false));
};

/**
 * Deletes the current user
 */
export const deleteUser = () => async dispatch => {

    dispatch(setLoading(true));

    try {

        const user = auth.currentUser;

        await db.collection('users').doc(user.uid).delete();

        await user.delete();

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong deleting account, please try again.'));
    }

    dispatch(setLoading(false));
};

/**
 * Logs out the current user
 */
export const logoutUser = () => async dispatch => {

    dispatch(setLoading(true));

    try {

        await auth.signOut();

        dispatch({
            type: SET_USER
        });

    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong signing out, please try again.'));
    }

    dispatch(setLoading(false));
};
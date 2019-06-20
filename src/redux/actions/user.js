import { SET_USER } from '../actionTypes';
import { setLoading, setWarning } from './ui';
import { functions } from '../../utils/firebase';

/**
 * calls the cloud function to login the user
 * @param {*} username 
 */
export const loginUser = (username) => async dispatch => {

    dispatch(setLoading(true));

    try {

        const result = await functions.httpsCallable('getUserByUsername')({ username });

        const user = result.data.user;
        const userId = result.data.userId;

        dispatch({
            type: SET_USER,
            user,
            userId
        });
        
    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong signing in, please try again.'));
    }

    dispatch(setLoading(false));
};

/**
 * Calls the cloud function to create the given user
 * @param {*} user 
 */
export const createUser = (user) => async dispatch => {

    dispatch(setLoading(true));

    try {

        const result = await functions.httpsCallable('createUser')({ user });

        const retUser = result.data.user;
        const userId = result.data.userId;

        dispatch({
            type: SET_USER,
            user: retUser,
            userId
        });
        
    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong creating user, please try again.'));
    }

    dispatch(setLoading(false));
};

/**
 * Calls the cloud function to update the given user by id
 * @param {*} user 
 * @param {*} userId 
 */
export const updateUser = (user, userId) => async dispatch => {

    dispatch(setLoading(true));

    try {

        const result = await functions.httpsCallable('updateUser')({ user, userId });

        const retUser = result.data.user;
        const retUserId = result.data.userId;

        dispatch({
            type: SET_USER,
            user: retUser,
            userId: retUserId
        });
        
    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong creating user, please try again.'));
    }

    dispatch(setLoading(false));
};

/**
 * Calls the cloud function to delete the user by id
 * @param {*} userId 
 */
export const deleteUser = (userId) => async dispatch => {

    dispatch(setLoading(true));

    try {

        const result = await functions.httpsCallable('deleteUser')({ userId });

        const retUser = result.data.user;
        const retUserId = result.data.userId;

        dispatch({
            type: SET_USER,
            user: retUser,
            userId: retUserId
        });
        
    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong creating user, please try again.'));
    }

    dispatch(setLoading(false));
};

/**
 * Wipes local user state
 */
export const logoutUser = () => ({
    type: SET_USER
});
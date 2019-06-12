import { SET_USER } from '../actionTypes';

import { functions } from '../../utils/firebase';

export const loginUser = (user_id) => async dispatch => {

    try {

        const result = await functions.httpsCallable('getUser')({user_id});
        const user = result.data.user;

        dispatch({
            type: SET_USER,
            payload: {
                user
            }
        });

    } catch (err) {
        console.error(err);
    }
};

export const logoutUser = () => ({
    type: SET_USER,
    payload: {}
});
import { SET_USER } from '../actionTypes';
import { setLoading, setWarning } from './ui';
import { functions } from '../../utils/firebase';

export const loginUser = (username) => async dispatch => {

    dispatch(setLoading(true));

    try {

        const result = await functions.httpsCallable('getUserByUsername')({ username });

        const user = result.data.user;

        dispatch({
            type: SET_USER,
            user
        });
    } catch (err) {
        console.error(err);
        dispatch(setWarning('Something went wrong signing in, please try again.'));
    }

    dispatch(setLoading(false));
};

export const logoutUser = () => ({
    type: SET_USER
});
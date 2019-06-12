import { SET_USER } from '../actionTypes';

import { functions } from '../../utils/firebase';

export const retrieveUser = async (user_id) => {

    console.log('RETRIEVE_USER');
    try {

        const result = await functions.httpsCallable('getUser')({user_id});
        const user = result.data;

        return {
            type: SET_USER,
            payload: {
                user
            }
        };

    } catch (err) {
        console.error(err);
    }
    
};

export default {
    retrieveUser
};
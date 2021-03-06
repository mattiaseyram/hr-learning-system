import { SET_LOADING, SET_WARNING, SET_TITLE } from '../actionTypes';

/**
 * Toggles the loading modal
 * @param {Boolean} loading 
 */
export const setLoading = (loading = false) => ({
    type: SET_LOADING,
    loading
});

/**
 * Toggles the warning modal with given warning string
 * @param {String} warning 
 */
export const setWarning = (warning = '') => dispatch => {
    console.warn('WARNING MODAL', warning);
    return dispatch({
        type: SET_WARNING,
        warning
    });
};

/**
 * Sets the page title
 * @param {String} title 
 */
export const setTitle = (title) => ({
    type: SET_TITLE,
    title
});
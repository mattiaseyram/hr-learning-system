import { SET_LOADING, SET_WARNING } from '../actionTypes';

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
export const setWarning = (warning = '') => ({
    type: SET_WARNING,
    warning
});
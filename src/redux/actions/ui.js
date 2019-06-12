import { SET_LOADING, SET_WARNING } from '../actionTypes';

export const setLoading = (loading = false) => ({
    type: SET_LOADING,
    loading
});

export const setWarning = (warning = '') => ({
    type: SET_WARNING,
    warning
});
import { SET_LOADING, SET_WARNING } from '../actionTypes';

const initialState = {
    loading: true,
    warning: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING: {
            const { loading = false } = action;
            return {
                ...state,
                loading: Boolean(loading)
            };
        }
        case SET_WARNING: {
            const { warning = '' } = action;
            return {
                ...state,
                warning: String(warning)
            };
        }
        default:
            return state;
    };
};

export default reducer;
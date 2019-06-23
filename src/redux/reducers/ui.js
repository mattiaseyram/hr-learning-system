import { SET_LOADING, SET_WARNING, SET_TITLE } from '../actionTypes';

const initialState = {
    loading: true,
    warning: '',
    title: 'HR Learning System'
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
        case SET_TITLE: {
            const { title = 'HR Learning System' } = action;
            return {
                ...state,
                title: String(title)
            };
        }
        default:
            return state;
    };
};

export default reducer;
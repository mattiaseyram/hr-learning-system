import { SET_USER } from '../actionTypes';

const initialState = {
    first_name: '',
    last_name: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
          const { user } = action.payload;
          return {
            ...state,
            first_name: user.first_name,
            last_name: user.last_name
          };
        }
        default:
            return state;
    };
};

export default reducer;
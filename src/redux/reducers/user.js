import { SET_USER } from '../actionTypes';

const initialState = {
  user: null,
  users: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user = null } = action.payload;
      return {
        ...state,
        user
      };
    }
    default:
      return state;
  };
};

export default reducer;
import { SET_USER, SET_USERS } from '../actionTypes';

const initialState = {
  user: null,
  users: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user = null } = action;
      return {
        ...state,
        user
      };
    }
    case SET_USERS: {
      const { users = {} } = action;
      return {
        ...state,
        users
      };
    }
    default:
      return state;
  };
};

export default reducer;
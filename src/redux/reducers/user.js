import { SET_USER } from '../actionTypes';

const initialState = {
  user: null,
  userId: null,
  users: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      const { user = null, userId = null } = action;
      return {
        ...state,
        user,
        userId
      };
    }
    default:
      return state;
  };
};

export default reducer;
import { SET_LESSON, SET_LESSONS } from '../actionTypes';

const initialState = {
  lesson: null,
  id: null,
  lessons: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LESSON: {
      const { lesson = null, id = null } = action;
      return {
        ...state,
        lesson,
        id
      };
    }
    case SET_LESSONS: {
      const { lessons = {} } = action;
      return {
        ...state,
        lessons
      };
    }
    default:
      return state;
  };
};

export default reducer;
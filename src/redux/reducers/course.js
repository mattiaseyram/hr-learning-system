import { SET_COURSE, SET_COURSES } from '../actionTypes';

const initialState = {
  course: null,
  id: null,
  courses: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COURSE: {
      const { course = null, id = null } = action;
      return {
        ...state,
        course,
        id
      };
    }
    case SET_COURSES: {
      const { courses = [] } = action;
      return {
        ...state,
        courses
      };
    }
    default:
      return state;
  };
};

export default reducer;
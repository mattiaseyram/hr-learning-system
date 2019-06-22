import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';
import course from './course';
import lesson from './lesson';

export default combineReducers({ user, ui, course, lesson });
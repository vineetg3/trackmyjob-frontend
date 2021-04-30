import { combineReducers } from '@reduxjs/toolkit';
import userjobsReducer from './userjobs';

export default combineReducers({
  userjobs:userjobsReducer
});

//edit this if there are more entities


import { combineReducers } from '@reduxjs/toolkit';
import userjobsReducer from './userjobs';

export default combineReducers({
  userjobs:userjobsReducer
});

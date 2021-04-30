import { combineReducers } from '@reduxjs/toolkit';
import dashboardUIReducer from './dashboard';

export default combineReducers({
  dashboardUI:dashboardUIReducer
});

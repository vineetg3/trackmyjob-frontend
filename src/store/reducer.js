import { combineReducers } from 'redux';
import UIreducer from './ui/UIReducer';
import entitiesReducer from './entities/entitiesReducer';
import auth from './auth/auth';


export default combineReducers({
  entities: entitiesReducer,
  auth:auth,
  ui:UIreducer
});

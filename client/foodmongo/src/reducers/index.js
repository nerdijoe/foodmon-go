import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import NavReducer from './NavReducer';

const FoodMongoApp = combineReducers({
  UserReducer,
  NavReducer,
});

export default FoodMongoApp;

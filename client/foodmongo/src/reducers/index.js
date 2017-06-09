import { combineReducers } from 'redux';

import UserReducer from './UserReducer';

const FoodMongoApp = combineReducers({
  UserReducer,
});

export default FoodMongoApp;

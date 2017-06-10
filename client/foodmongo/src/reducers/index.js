import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import NavReducer from './NavReducer';
import interests from './InterestReducer';

const FoodMongoApp = combineReducers({
  UserReducer,
  NavReducer,
  interests,
});

export default FoodMongoApp;

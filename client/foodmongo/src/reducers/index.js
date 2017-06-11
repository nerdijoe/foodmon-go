import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import NavReducer from './NavReducer';
import interests from './InterestReducer';
import restaurants from './restaurantReducer';

const FoodMongoApp = combineReducers({
  UserReducer,
  NavReducer,
  interests,
  restaurants,
});

export default FoodMongoApp;

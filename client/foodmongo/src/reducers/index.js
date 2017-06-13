import { combineReducers } from 'redux';

import UserReducer from './UserReducer';
import NavReducer from './NavReducer';
import interests from './InterestReducer';
import restaurants from './restaurantReducer';
import directions from './MapDirectionsReducer';

const FoodMongoApp = combineReducers({
  UserReducer,
  NavReducer,
  interests,
  restaurants,
  directions,
});

export default FoodMongoApp;

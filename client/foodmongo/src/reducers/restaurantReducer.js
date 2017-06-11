import * as actionType from '../actions/constants';

const restaurantReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.FETCH_ZOMATO_SUCCESS:
      return [...action.restaurants];
    default:
      return state;
  }
};

export default restaurantReducer;

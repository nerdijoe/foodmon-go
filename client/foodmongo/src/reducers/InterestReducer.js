import { FETCH_INTERESTS_SUCCESS } from '../actions/constants';

const InterestReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_INTERESTS_SUCCESS:
      return [...action.interests];
    default:
      return state;
  }
};

export default InterestReducer;

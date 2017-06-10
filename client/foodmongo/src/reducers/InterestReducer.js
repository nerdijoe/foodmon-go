import * as actionType from '../actions/constants';

const InterestReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.FETCH_INTERESTS_SUCCESS:
      return [...action.interests];
    default:
      return state;
  }
};

export default InterestReducer;

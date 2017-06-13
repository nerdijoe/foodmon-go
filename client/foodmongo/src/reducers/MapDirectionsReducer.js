import * as actionType from '../actions/constants';

const initialState = {
  coords: [],
};

const MapDirectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_COORDINATES:
      return { ...state, coords: action.coords };
    default:
      return state;
  }
};

export default MapDirectionsReducer;

import * as actionType from '../actions/constants';

const initialState = {
  counter: 0,
};

const NavReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_COUNTER: {
      return { ...state, counter: state.counter + 1 };
    }
    case actionType.SUBTRACT_COUNTER: {
      return { ...state, counter: state.counter - 1 };
    }
    case actionType.RESET_COUNTER: {
      return { ...state, counter: 0 };
    }
    default: return state;
  }
};

export default NavReducer;

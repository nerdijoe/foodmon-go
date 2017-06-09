import {
  ADD_COUNTER,
  SUBTRACT_COUNTER,
  RESET_COUNTER,
} from '../actions/constants';

const initialState = {
  counter: 0,
};

const NavReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTER: {
      return { ...state, counter: state.counter + 1 };
    }
    case SUBTRACT_COUNTER: {
      return { ...state, counter: state.counter - 1 };
    }
    case RESET_COUNTER: {
      return { ...state, counter: 0 };
    }
    default: return state;
  }
};

export default NavReducer;

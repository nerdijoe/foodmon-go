import {
  SIGN_UP,
} from '../actions/constants';

const initialState = {
  name: '',
  username: '',
  email: '',
  interestArr: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP: {
      return {
        ...state,
        name: action.data.name,
        username: action.data.username,
        email: action.data.email,
      };
    }
    default: return state;
  }
};

export default UserReducer;

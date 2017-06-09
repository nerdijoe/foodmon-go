import {
  SIGN_UP, SIGN_IN, FETCH_LOGIN, UPDATE_USER_SUCCESS,
} from '../actions/constants';

const initialState = {
  name: '',
  username: '',
  email: '',
  interestArr: [],
  login: {
    _id: '',
    username: '',
    token: '',
  },
};

const signin = (state, payload) => {
  console.log('data', payload.response.data)
  const newData = {
    username: payload.response.data.username,
    token: payload.response.data.token,
    _id: payload.response.data._id,
  };
  const newState = {
    ...state,
    login: { ...state.login, ...newData },
  };
  return newState;
};

const fetch_login = (state, payload) => {
	let newData = {
		username: payload.data.username,
		token: payload.data.token,
    _id: payload.data._id,
	}
	let newState = {
	 	...state,
		login: { ...state.login, ...newData }
  }
	return newState
}

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
    case SIGN_IN: {
      return signin(state, action)
      break;
    }
    case UPDATE_USER_SUCCESS: {
      return action.user;
    }
    case FETCH_LOGIN: {
      return fetch_login(state, action)
      break;
    }

    default: return state;
  }
};

export default UserReducer;

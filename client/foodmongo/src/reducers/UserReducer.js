import {
  SIGN_UP, SIGN_IN
} from '../actions/constants';

const initialState = {
  name: '',
  username: '',
  email: '',
  interestArr: [],
  login : {
    _id: '',
		username: '',
		token: ''
	}
};

const signin = (state, payload) => {
  console.log('data', payload.response.data)
	let newData = {
		username: payload.response.data.username,
		token: payload.response.data.token,
    _id: payload.response.data._id,
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
    default: return state;
  }
};

export default UserReducer;

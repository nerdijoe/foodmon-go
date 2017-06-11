import * as actionType from '../actions/constants';
import { Actions } from 'react-native-router-flux';

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
  const newData = {
    username: payload.data.username,
    token: payload.data.token,
    _id: payload.data._id,
  };
  const newState = {
    ...state,
    login: { ...state.login, ...newData },
  };
  return newState;
};

const reset_login = (state, payload) => {
  return {};
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SIGN_UP: {

      return {
        ...state,
        name: action.data.name,
        username: action.data.username,
        email: action.data.email,
      };
    }
    case actionType.SIGN_IN: {
      return signin(state, action);
    }
    case actionType.ADD_INTEREST_SUCCESS: {
      const updatedUser = {};
      updatedUser.name = state.name;
      updatedUser.username = state.username;
      updatedUser.email = state.email;
      updatedUser.interestArr = [...state.interestArr, action.interest];
      return updatedUser;
    }
    case actionType.REMOVE_INTEREST_SUCCESS: {
      const updatedUser = {};
      updatedUser.name = state.name;
      updatedUser.username = state.username;
      updatedUser.email = state.email;
      updatedUser.interestArr = [
        ...state.interestArr.filter(interest => interest._id !== action.interest._id)
      ];
      return updatedUser;
    }
    case actionType.FETCH_USER_SUCCESS: {
      const activeUser = {};
      activeUser.name = action.user.name;
      activeUser.username = action.user.username;
      activeUser.email = action.user.email;
      activeUser.interestArr = action.user.interestArr;
      return activeUser;
    }
    case actionType.FETCH_LOGIN: {
      return fetch_login(state, action);
    }
    case actionType.RESET_LOGIN: {
      return reset_login(state, action);
    }

    default: return state;
  }
};

export default UserReducer;

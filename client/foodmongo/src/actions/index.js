import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  SIGN_UP, SIGN_IN, ADD_COUNTER, SUBTRACT_COUNTER, RESET_COUNTER, FETCH_LOGIN, UPDATE_USER_SUCCESS, RESET_LOGIN,
} from './constants';
import { Toast } from 'native-base';

export const SignUp = data => ({
  type: SIGN_UP,
  data,
});


export const signin = (data) => {
	return dispatch => {
    axios.post('http://5d5e7777.ngrok.io/auth/signin', {
      username: data.username,
      password: data.password,
    })
    .then(response => {
      console.log('response',response)
      return dispatch({
  			type : SIGN_IN,
  			response
  		})
    })
    .catch((err) => {
      console.log(err);
      Toast.show({
        text: 'Username and Password is not correct !',
        position: 'bottom',
        buttonText: 'Okay',
        type: 'warning',
      });
    });
  }
};

export const fetch_login = data => {
	return dispatch => {
    return dispatch({
			type : FETCH_LOGIN,
			data
		})
  }
}

export const reset_login = () => {
	return dispatch => {
    let data = true;
    return dispatch({
			type : RESET_LOGIN,
			data
		})
  }
}

export const actionSignUp = data => ((dispatch) => {
  axios.post('https://aafca6e0.ngrok.io/auth/signup', {
    name: data.name,
    email: data.email,
    username: data.username,
    password: data.password,
  })
  .then((res) => {
    console.log('actionSignUp', res);
    dispatch(SignUp(data));
  })
  .catch((err) => {
    console.log(err);
  });
});


const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

export const addInterest = (interest, user) => ((dispatch) => {
  axios.put(`https://aafca6e0.ngrok.io/users/${user._id}`, {
    interestArr: [],
  }, {
    headers: {
      token: AsyncStorage.getItem('Token'),
    },
  }).then((res) => {
    dispatch(updateUserSuccess(res.data));
  });
});

export const removeInterest = (interest, user) => ((dispatch) => {
  axios.put(`https://aafca6e0.ngrok.io/users/${user._id}`, {
    interestArr: [],
  }, {
    headers: {
      token: AsyncStorage.getItem('Token'),
    },
  }).then((res) => {
    dispatch(updateUserSuccess(res.data));
  });
});

export const addCounter = () => {
  return {
    type: ADD_COUNTER,
  };
};

export const subractCounter = () => {
  return {
    type: SUBTRACT_COUNTER,
  };
};

export const resetCounter = () => {
  return {
    type: RESET_COUNTER,
  };
};

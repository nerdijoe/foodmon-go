import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  SIGN_UP, SIGN_IN, ADD_COUNTER, SUBTRACT_COUNTER, RESET_COUNTER, FETCH_LOGIN, UPDATE_USER_SUCCESS, RESET_LOGIN, FETCH_USER_SUCCESS
} from './constants';
import { Toast } from 'native-base';

export const SignUp = data => ({
  type: SIGN_UP,
  data,
});


export const signin = (data) => {
	return dispatch => {
    axios.post('http://39ac0423.ngrok.io/auth/signin', {
      username: data.username,
      password: data.password,
    })
    .then(response => {
      AsyncStorage.setItem('token', response.data.token)
      AsyncStorage.setItem('_id', response.data._id)
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

export const fetchUser = () => ((dispatch) => {
  AsyncStorage.getItem('token', (err1, token) => {
    AsyncStorage.getItem('_id', (err2, id) => {
      console.log(id);
      axios.get(`http://39ac0423.ngrok.io/users/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          user: res.data,
        });
      });
    });
  });
});

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
  axios.post('https://39ac0423.ngrok.io/auth/signup', {
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
  axios.put(`https://39ac0423.ngrok.io/users/${user._id}`, {
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
  axios.put(`https://39ac0423.ngrok.io/users/${user._id}`, {
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

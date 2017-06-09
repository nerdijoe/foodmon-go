import axios from 'axios';
import {
  SIGN_UP, SIGN_IN, ADD_COUNTER, SUBTRACT_COUNTER, RESET_COUNTER, FETCH_LOGIN,
} from './constants';

export const SignUp = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

export const signin = data => {
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
    });
  }
}

export const fetch_login = data => {
	return dispatch => {
    return dispatch({
			type : FETCH_LOGIN,
			data
		})
  }
}

export const actionSignUp = (data) => {
  return (dispatch) => {
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


    // fetch('https://aafca6e0.ngrok.io/auth/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then(res => res.json())
    // .then((res) => {
    //   console.log('actionSignUp', res);
    //   dispatch(SignUp(data));
    // })
    // .catch((err) => {
    //   return err;
    // })
  };
};

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

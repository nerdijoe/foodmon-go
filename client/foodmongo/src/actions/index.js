import axios from 'axios';
import {
  SIGN_UP,
} from './constants';

export const SignUp = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

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

import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';

import * as actionType from './constants';

// export const SignUp = data => ({
//   type: actionType.SIGN_UP,
//   data,
// });

export const SignUp = data => ((dispatch) => {
  dispatch({
    type: actionType.SIGN_UP,
    data,
  });
  dispatch({
    type: actionType.ADD_COUNTER,
  });
  Actions.signin();
});

export const signin = data => ((dispatch) => {
  axios.post('http://foodmongo-dev.us-west-2.elasticbeanstalk.com/auth/signin', {
    username: data.username,
    password: data.password,
  })
  .then((response) => {
    AsyncStorage.setItem('token', response.data.token, (err) => {
      AsyncStorage.setItem('_id', response.data._id, (err) => {
        dispatch({
          type: actionType.ADD_COUNTER,
        });
        Actions.profile();
        Toast.show({
          text: 'Login successfully !',
          position: 'bottom',
          type: 'success',
          duration: 3000,
        });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
});

export const fetchUser = () => ((dispatch) => {
  AsyncStorage.getItem('token', (err1, token) => {
    AsyncStorage.getItem('_id', (err2, id) => {
      axios.get(`http://foodmongo-dev.us-west-2.elasticbeanstalk.com/users/${id}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        dispatch({
          type: actionType.FETCH_USER_SUCCESS,
          user: res.data,
        });
      });
    });
  });
});


export const reset_login = () => {
	return dispatch => {
    let data = true;
    return dispatch({
			type : actionType.RESET_LOGIN,
			data
		})
  }
}

export const actionSignUp = data => ((dispatch) => {
  axios.post('http://foodmongo-dev.us-west-2.elasticbeanstalk.com/auth/signup', {
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

export const fetchInterests = () => ((dispatch) => {
  axios.get('http://foodmongo-dev.us-west-2.elasticbeanstalk.com/interest/')
  .then((res) => {
    dispatch({
      type: actionType.FETCH_INTERESTS_SUCCESS,
      interests: res.data,
    });
  });
});


export const addInterest = (interest, user) => ((dispatch) => {
  AsyncStorage.getItem('token', (err1, token) => {
    AsyncStorage.getItem('_id', (err2, id) => {
      axios.put(`http://foodmongo-dev.us-west-2.elasticbeanstalk.com/users/${id}`, {
        interestArr: [...user.interestArr, interest._id],
      }, {
        headers: {
          token,
        },
      }).then((res) => {
        dispatch({
          type: actionType.ADD_INTEREST_SUCCESS,
          interest,
        });
      });
    });
  });
});

export const removeInterest = (interest, user) => ((dispatch) => {
  AsyncStorage.getItem('token', (err1, token) => {
    AsyncStorage.getItem('_id', (err2, id) => {
      axios.put(`http://foodmongo-dev.us-west-2.elasticbeanstalk.com/users/${id}`, {
        interestArr: [...user.interestArr.filter(userInterest => userInterest._id !== interest._id)],
      }, {
        headers: {
          token,
        },
      }).then((res) => {
        dispatch({
          type: actionType.REMOVE_INTEREST_SUCCESS,
          interest,
        });
      });
    });
  });
});

export const addCounter = () => {
  return {
    type: actionType.ADD_COUNTER,
  };
};

export const subractCounter = () => {
  return {
    type: actionType.SUBTRACT_COUNTER,
  };
};

export const resetCounter = () => {
  return {
    type: actionType.RESET_COUNTER,
  };
};

export const fetchZomato = (latitude, longitude) => ((dispatch) => {
  axios.get(`https://developers.zomato.com/api/v2.1/search?lat=${latitude}&lon=${longitude}&radius=500&sort=rating&order=desc`, {
    headers: {
      user_key: '2b958b1e249a2a26c68081cafe451194',
    },
  })
  .then((res) => {
    dispatch({
      type: actionType.FETCH_ZOMATO_SUCCESS,
      restaurants: res.data.restaurants,
    });
  });
});

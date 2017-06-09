/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';

import App from './src/App';

//import store from './src/store';
import store from './src/store/manageStore';

export default class foodmongo extends Component {
  
  render() {
    AsyncStorage.getItem('Token', (err, result) => {
      console.log(result);
    });
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('foodmongo', () => foodmongo);

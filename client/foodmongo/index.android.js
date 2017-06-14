import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';

import App from './src/App';
import commonColor from './native-base-theme/variables/commonColor';
import getTheme from './native-base-theme/components';

import store from './src/store/manageStore';

export default class foodmongo extends Component {

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Provider store={store}>
          <App />
        </Provider>
      </StyleProvider>
    );
  }
}

AppRegistry.registerComponent('foodmongo', () => foodmongo);

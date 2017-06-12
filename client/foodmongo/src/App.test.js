import renderer from 'react-test-renderer';
import React from 'react';
import { StyleProvider } from 'native-base';
import { Provider } from 'react-redux';

import connectedApp, { App } from './App';
import store from './store/manageStore';
import commonColor from '../native-base-theme/variables/commonColor';
import getTheme from '../native-base-theme/components';

describe('App', () => {

  it('renders and match to snapshot', () => {
    // const tree = renderer.create(<StyleProvider style={getTheme(commonColor)}><Provider store={store}>          <App /></Provider></StyleProvider> );
    const tree = renderer.create(<App />);
    expect(tree).toMatchSnapshot();
  })
});

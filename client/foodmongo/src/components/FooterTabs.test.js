import renderer from 'react-test-renderer';
import React from 'react';

import { FooterTabs } from './FooterTabs'

describe('FooterTabs', () => {

  it('renders and match to snapshot', () => {
    const tree = renderer.create(<FooterTabs user_login={{ username: '' }} nav_counter={0} addCounter={() => {}} subtractCounter={() => {}} resetCounter={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
});

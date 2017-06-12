import renderer from 'react-test-renderer';
import React from 'react';

import { Profile } from './Profile'

describe('Profile', () => {

  it('renders and match to snapshot', () => {
    const tree = renderer.create(<Profile user={{ username: '' }} interests={[]} reset_login={() => {}} addCounter={() => {}} fetchUser={() => {}} removeInterest={(interest, user) => {}} />);
    expect(tree).toMatchSnapshot();
  });
});

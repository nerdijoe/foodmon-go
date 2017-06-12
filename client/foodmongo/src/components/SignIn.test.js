import renderer from 'react-test-renderer';
import React from 'react';

import { SignIn } from './SignIn'

describe('SignIn', () => {

  it('renders and match to snapshot', () => {
    const tree = renderer.create(<SignIn userLogin={{}} interests={[]} signin={(data) => {}} addCounter={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
});

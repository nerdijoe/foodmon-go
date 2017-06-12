import renderer from 'react-test-renderer';
import React from 'react';

import { SignUp } from './SignUp'

describe('SignUp', () => {

  it('renders and match to snapshot', () => {
    const tree = renderer.create(<SignUp signUp={(data) => {}} />);
    expect(tree).toMatchSnapshot();
  });
});

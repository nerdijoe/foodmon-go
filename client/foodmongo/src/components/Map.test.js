import renderer from 'react-test-renderer';
import React from 'react';

import { Map } from './Map'

describe('Map', () => {

  it('renders and match to snapshot', () => {
    const tree = renderer.create(<Map restaurants={[]} fetchZomato={(latitude, longitude) => {}} />);
    expect(tree).toMatchSnapshot();
  });
});

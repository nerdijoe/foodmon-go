import renderer from 'react-test-renderer';
import React from 'react';

import { InterestItem } from './InterestItem'

describe('InterestItem', () => {

  it('renders and match to snapshot', () => {
    const interests = [
      {
        _id: '593a4f628767cb7b789e1ffc',
        cuisine_name: 'Aceh',
        cuisine_id: '237',
        __v: 0,
      },
      {
        _id: '593a4f768767cb7b789e1ffd',
        cuisine_name: 'American',
        cuisine_id: '1',
        __v: 0,
      },
    ];

    const cuisine = {
      _id: '593a4f628767cb7b789e1ffc',
      cuisine_name: 'Aceh',
      cuisine_id: '237',
      __v: 0
    };

    const tree = renderer.create(<InterestItem user={{ interestArr: interests }} cuisine={cuisine} addInterest={(interest, user) => {}} removeInterest={(interest, user) => {}} />);
    expect(tree).toMatchSnapshot();
  });
});

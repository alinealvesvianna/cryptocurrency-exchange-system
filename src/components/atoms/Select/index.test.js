import React from 'react';
import {shallow} from 'enzyme';
import Select from '.';

const wrap = (props = {}) => shallow(<Select {...props} />).dive();

it('renders props invalid when passed in', () => {
  const wrapper = wrap({invalid: true});
  expect(wrapper.findWhere(node => node.props().invalid === true));
});

it('renders select by default', () => {
  const wrapper = wrap();
  expect(wrapper.find('select')).toHaveLength(1);
});

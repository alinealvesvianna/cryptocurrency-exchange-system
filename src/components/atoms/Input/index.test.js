import React from 'react';
import {shallow} from 'enzyme';
import Input from '.';

const wrap = (props = {}) => shallow(<Input {...props} />).dive();

it('renders props invalid when passed in', () => {
  const wrapper = wrap({invalid: true});
  expect(wrapper.findWhere(node => node.props().invalid === true));
});

it('renders input by default', () => {
  const wrapper = wrap();
  expect(wrapper.find('input')).toHaveLength(1);
});

import React from 'react';
import {storiesOf} from '@storybook/react';
import Select from '.';

storiesOf('Select', module)
  .add('default', () => (
    <Select />
  ))
  .add('invalid', () => (
    <Select invalid />
  ));

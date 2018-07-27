import React from 'react';
import {storiesOf} from '@storybook/react';
import Input from '.';

storiesOf('Input', module)
  .add('default', () => (
    <Input />
  ))
  .add('invalid', () => (
    <Input invalid />
  ))
;
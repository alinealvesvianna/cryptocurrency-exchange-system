import React from 'react';
import PropTypes from 'prop-types';

import {Label, Input, Select} from '../../../components';

const Field = ({
  name, label, type, selectLabel, nameSelect, options, ...props
}) => {
  const inputProps = {
    id: name,
    name,
    type,
    ...props
  };

  const selectProps = {
    id: nameSelect,
    name: nameSelect,
    options,
    ...props
  };

  return (
    <React.Fragment>
      <Label htmlFor={inputProps.id}>{label}</Label>
      <Input {...inputProps} />
      <Select {...selectProps} />
    </React.Fragment>
  );
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  selectLabel: PropTypes.string,
  nameSelect: PropTypes.string,
  options: PropTypes.array,
  type: PropTypes.string
};

Field.defaultProps = {
  type: 'number'
};

export default Field;
export {Field};

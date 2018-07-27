import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {ifProp} from 'styled-tools';

const styles = css`
border: none;
outline: none;
background: transparent;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
border-radius: 0;
margin: 0;
display: block;
width: 100%;
padding: 12px 55px 15px 15px;
font-size: 14px;
color: #714BB9;

&:after{
    content: "&#x2228";
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 100%;
    line-height: 38px;
    text-align: center;
    color: #714BB9;
    font-size: 24px;
    border-left: 1px solid #3C1C78;
    z-index: -1;
}

  background: ${ifProp('invalid', '#f00')};
`;

const StyledSelect = styled.select`
  ${styles};
`;

const Select = ({options, value,selected, ...props}) => {
  const onChange = (event) => {
    props.onChange(event);
  };

  return (
    <StyledSelect {...props} value={value}>
      {options.map((option) => (
       selected === option.symbol ? (
          <option
            name={props.name}
            onChange={onChange}
            key={option.websiteSlug}
            value={option.symbol}
            selected
          >
            {`${props.name}: ${option.symbol} - ${option.websiteSlug}`}
          </option>
        ) : (
          <option
            name={props.name}
            onChange={onChange}
            key={option.websiteSlug}
            value={option.symbol}
          >
          {`${props.name}:: ${option.symbol} - ${option.websiteSlug}`}
          </option>
        ) 
      ))}
    </StyledSelect>
  );
};

Select.propTypes = {
  invalid: PropTypes.bool,
  options: PropTypes.array.isRequired
};

export default Select;
export {Select};

import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {ifProp} from 'styled-tools';
import {breakpoints} from '../../../config';


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
border: 1px solid #3C1C78;
background-color: rgba(255, 255, 255, 0.9);
background: ${ifProp('invalid', '#f00')};
margin: 1rem auto;

&::-webkit-input-placeholder {
    color: #714BB9;
  }
&::-moz-placeholder {
    color: #714BB9;
  }
  &:-ms-input-placeholder { 
    color: #714BB9;
  }
  &:-moz-placeholder { 
    color: #714BB9;
  }
  @media (min-width: ${breakpoints.phone}) {
  width: 50%   
}

`;

const StyledInput = styled.input`${styles}`;

const Input = ({...props}) => {
  return (
    <StyledInput {...props} />
  );
};

Input.defaultProps = {
  type: 'number'
};


Input.propTypes = {
  invalid: PropTypes.bool
};


export default Input;
export {Input};

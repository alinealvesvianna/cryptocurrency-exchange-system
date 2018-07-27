import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {ifProp} from 'styled-tools';


const styles = css`
    display: block;
    width: 100%;
    padding: 1rem;
    color: #fff;
    margin: 0;
    box-sizing: border-box;
    border-radius: 2px;
    background: transparent;
    margin-right: 10px;
`;

const StyledButton = styled.button`${styles}`;

const Button = ({...props}) => {
  return (
    <StyledButton {...props} />
  );
};


export default Button;
export {Button};

import styled, {withTheme, css} from 'styled-components';
import {switchProp} from 'styled-tools';
import React from 'react';
import PropTypes from 'prop-types';
import {breakpoints} from '../../../config/styles/variables';

const ContainerIcon = styled.span`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  vertical-align: middle;
  z-index:10;
  position: relative;
  display: inline-block;
  
  ${switchProp('component.kind', {
    iconHeader: css`
    display: block;
    width: 200px;
    margin: 0 auto;
    height: 201px;
    fill: #fff;
  }
    `
  })}
  
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const Icon = (props) => {
  const svg = require(`!raw-loader!./icons/${props.icon}.svg`);
  return <ContainerIcon {...props} dangerouslySetInnerHTML={{__html: svg}} />;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default withTheme(Icon);

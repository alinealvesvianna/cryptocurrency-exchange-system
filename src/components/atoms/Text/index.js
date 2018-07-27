import styled, {css} from 'styled-components';
import {switchProp} from 'styled-tools';

const Text = styled.p`
  color: #ccc
  font-family: Arial;
  font-size: 1.125rem;
`;

Text.p = Text.extend`
  ${switchProp('component.kind', {
    totalPrice: css`
      color: #fff;
      font-size: 1.5em;
      text-align: center;
      line-height: 1.2;
    `,
    labelOption: css`
    color: #fff;
    font-size: 1.166em;
    font-weight: bold;
  `,
    labelInformations: css`
  color: #fff;
  font-size: 1.066em;
`,
    loadingText: css`
    font-size: 2em;
    text-align: center;
    color: #fff;
    position: relative;
    top: 25vh;
    `,
    error: css`
    font-size: 2em;
    text-align: center;
    color: #fff;
    `,
    toggleChart: css`
    font-size: 2em;
    text-align: center;
    color: #fff;
    border: 1px solid #fff;
    padding: 0.5em;
    `
  })}
`;

Text.h1 = Text.withComponent('h1').extend`
  color: #ccc;
  ${switchProp('component.kind', {
    headerPage: css`
    margin: ${props => props.theme.text.title.margin};
    font-size:${props => props.theme.text.title.fontSize};
    line-height: 1.2;
    color:  ${props => props.theme.text.title.color};
    text-align: center;

    @media(max-width: 768px){
      font-size: 1.5rem;
      line-height: 1.75rem;
      margin-bottom: 1.75rem;
    }
`
  })}
`;


Text.label = Text.withComponent('label').extend`
  font-family: Arial;
  ${switchProp('component.kind', {
    labelSimulatorPrice: css`
      font-size: 3rem;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.2rem;
`
  })}
`;

Text.bold = Text.withComponent('strong').extend`
  display: inline-block;
  font-size: inherit;
  font-weight: bolder;
  color: #fff;
`;

Text.small = Text.withComponent('small').extend` 
  font-size: 1rem;
  text-align: center;
  color: #fff;
`;

Text.span = Text.withComponent('span').extend`
  display: inline-block;
  font-size: inherit;
  text-transform: uppercase;
  ${switchProp('component.kind', {
    loaderAnimation: css`
    color: #fff;
    font-size: 11px;
    text-indent: -99999em;
    margin: 0 auto;
    display: block;
    width: 10em;
    height: 10em;
    box-shadow: inset 0 0 0 1em;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    will-change: contents;
    border-radius: 100%;

    &:after{
        position: absolute;
        content: '';
        width: 5.2em;
        height: 10.2em;
        background: #60338e;
        border-radius: 0 10.2em 10.2em 0;
        top: -0.1em;
        left: 5.1em;
        -webkit-transform-origin: 0px 5.1em;
        transform-origin: 0px 5.1em;
        -webkit-animation: load2 2s infinite ease;
        animation: load2 2s infinite ease;
    
    }

    &:before{
        position: absolute;
        content: '';
        width: 5.2em;
        height: 10.2em;
        background: #60338e;
        border-radius: 10.2em 0 0 10.2em;
        top: -0.1em;
        left: -0.1em;
        -webkit-transform-origin: 5.2em 5.1em;
        transform-origin: 5.2em 5.1em;
        -webkit-animation: load2 2s infinite ease 1.5s;
        animation: load2 2s infinite ease 1.5s;
    }

    @-webkit-keyframes load2 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    
    @keyframes load2 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    `
  })}
`;

export default Text;
export {Text};

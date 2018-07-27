import styled, {css} from 'styled-components';
import {switchProp} from 'styled-tools';
// import {breakpoints} from '../../../config';


const List = styled.ul` 
  list-style-type: none;
  width: 100%;
  padding: 0;
  
  ${switchProp('component.kind', {
    defaultList: css`
      list-style: circle;
    `,
    navigationBanner: css`
    padding:0;
    margin:0;

    @media(min-height:768px){
      height: 280px;
    }
    `,
    navigationMenu: css`
    padding: 0px;
    `
  })}
  `;

export default List;
export {List};

import styled, {css} from 'styled-components';
import {switchProp} from 'styled-tools';
import {breakpoints} from '../../../config';

const Col = styled.div`
  flex: ${props => props.theme.grid.column.flex};
  align-self: ${props => props.theme.grid.column.alignSelf};
  order: ${props => props.theme.grid.column.order};

  ${switchProp('component.kind', {
    colSelectCurrency: css`
      flex: 0 1 100%;
      margin-bottom: 1rem;
      @media(min-width:${breakpoints.phone}){
        flex: 0 1 49%;
      }
    `,
    colButtonOrder: css`
      flex: 0 1 100%;
      margin-bottom: 1rem;
      
      @media(min-width:${breakpoints.phone}){
        flex: 0 1 20%;

        &:first-child{
            margin-right: 10px;
        }
      }
    `
  })}
  `;

export default Col;
export {Col};
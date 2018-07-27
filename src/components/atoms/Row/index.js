import styled, {css} from 'styled-components';
import {switchProp} from 'styled-tools';
import {breakpoints} from '../../../config';

const Row = styled.div`
  display: ${props => props.theme.grid.row.display};
  flex-direction: ${props => props.theme.grid.row.flexDirection};
  flex-wrap: ${props => props.theme.grid.row.flexWrap};
  justify-content: ${props => props.theme.grid.row.justifyContent};
  align-items: ${props => props.theme.grid.row.alignItems};
  align-content:  ${props => props.theme.grid.row.alignContent};
  height: ${props => props.theme.grid.row.height};
  padding: ${props => props.theme.grid.row.padding};
  margin: ${props => props.theme.grid.row.margin};
  width: ${props => props.theme.grid.row.width};

  ${switchProp('component.kind', {
    orderButtonsRow: css`
      @media(min-width:${breakpoints.phone}){
        justify-content: flex-end;
      }
    `
  })}
  `;

export default Row;
export {Row};

import styled, {css} from 'styled-components';
import {switchProp} from 'styled-tools';
// import {breakpoints} from '../../../config';


const ItemList = styled.li`
  display: block;
  ${switchProp('component.kind', {
    itemSelected: css`
    background: #381e69
    padding: 1em;
    color: #fff;
    `,
    item: css`
        padding: 1em;
        color: #fff;
        border-bottom: 1px solid #311565;
    `
  })}
  `;

export default ItemList;
export {ItemList};

import React from 'react';
import styled from 'styled-components';
import {Text} from '../../atoms/Text';


const Container = styled.div`
    position: absolute;
    height: 100%;
    background:#60338e;
    opacity: 0.9;
    width: 100%;
    z-index: 1000;
    top:0;
    right: 0;
`;


const Loader = ({...props}) => {
  return (
    <Container>
      <Text.p
        component={{kind: 'loadingText'}}
      >
        <Text.span
          component={{kind: 'loaderAnimation'}}
          />
        Carregando
      </Text.p>
    </Container>

  );
};


export default Loader;
export {Loader};

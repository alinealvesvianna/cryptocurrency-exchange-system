import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
    position: relative;
    display: block;
    margin: 0 auto;
    border: 1px solid #3c1c78;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 10;
`;

Label.propTypes = {
  disable: PropTypes.bool
};

export default Label;
export {Label};

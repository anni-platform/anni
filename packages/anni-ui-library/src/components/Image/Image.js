import styled from 'styled-components';
import utils from '../../utils';

export const Image = styled.img`
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  ${utils.margin};
  margin: ${props => props.center && '0 auto'};
  width: ${props => (props.width ? `${props.width}px` : '100%')};
`;

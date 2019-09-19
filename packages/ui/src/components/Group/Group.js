import styled from 'styled-components';
import utils from '../../utils';

export const Group = styled.div`
  ${utils.margin};
  display: flex;
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
  button {
    margin: 0 8px 8px 0;
  }
`;

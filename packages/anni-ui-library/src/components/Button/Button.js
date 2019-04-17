import styled from 'styled-components';
import utils from '../../utils';
import { EASE_OUT_EXPO } from '../../constants';

export const Button = styled.button`
  align-items: center;
  backface-visibility: hidden;
  background: ${props =>
    !props.primary || props.link ? 'none' : `${props.theme.colorPrimary}`};
  border: ${props =>
    props.noBorder || props.link
      ? 'none'
      : `2px solid ${props.theme.colorPrimary}`};
  border: ${props => props.stacked && 'none'};
  border-radius: 80px;
  color: ${props => props.theme.textPrimary};
  cursor: pointer;
  display: inline-flex;
  flex-direction: ${props => props.stacked && 'column'};
  font-family: 'Apercu Bold', sans-serif;
  font-size: ${props => (props.stacked ? '12px' : '13px')};
  justify-content: center;
  letter-spacing: 1px;
  line-height: 1;
  outline: none;
  padding: ${props => (props.full ? '0' : '12px 24px')};
  text-decoration: none;
  text-transform: uppercase;
  transition: 400ms ${EASE_OUT_EXPO};
  z-index: 2;
  ${utils.margin};

  &:active {
    transform: scale(0.998);
  }

  &:focus,
  &:hover {
    transform: scale(1.02);

    &:disabled,
    &[disabled] {
      cursor: default;
      transform: scale(1);
    }
  }
`;

export const NakedButton = styled(Button)`
  background: none;
  border: none;
  display: flex;
  flex-direction: column;

  span {
    margin: 4px 0 0 0;
  }
`;

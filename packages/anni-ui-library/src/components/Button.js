import styled from 'styled-components';
import utils from '../utils';
import { CHARCOAL, COPPER, EASE_OUT_EXPO } from '../constants';

export const Button = styled.button`
  align-items: center;
  backface-visibility: hidden;
  background: ${props => (!props.primary || props.link ? 'none' : `${COPPER}`)};
  border: ${props =>
    props.noBorder || props.link ? 'none' : `2px solid ${COPPER}`};
  border: ${props => props.stacked && 'none'};
  border-radius: 80px;
  color: ${CHARCOAL};
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

  svg {
    ${utils.padding};
    fill: ${props => (props.fill ? `${CHARCOAL}` : 'transparent')};
    height: ${props => (props.iconSize ? `${props.iconSize}px` : '18px')};
    margin-right: ${props => (props.stacked ? '0' : '6px')};
    margin-bottom: ${props => (props.stacked ? '6px' : '0')};
    stroke: ${props => (props.fill ? 'transparent' : `${CHARCOAL}`)};
    stroke: ${props => props.stacked && `${CHARCOAL}`};
    stroke-width: ${props =>
      props.strokeWidth ? `${props.strokeWidth}px` : '6px'};
    stroke-width: ${props => props.fill && '6px'};
    transition: 400ms ${EASE_OUT_EXPO};
    width: ${props => (props.iconSize ? `${props.iconSize}px` : '18px')};
  }
`;

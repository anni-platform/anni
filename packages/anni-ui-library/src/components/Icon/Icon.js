import styled from 'styled-components';
import { Icons } from './IconDefinitions';

export const SolidIcon = styled(Icons)`
  fill: ${props =>
    props.color ? `${props.theme.colorPrimary}` : `${props.theme.iconPrimary}`};
  stroke: transparent;
`;
export const OutlineIcon = styled(Icons)`
  fill: none;
  stroke: ${props =>
    props.color ? `${props.theme.colorPrimary}` : `${props.theme.iconPrimary}`};
  stroke-width: ${props =>
    props.strokeWidth ? `${props.strokeWidth}px` : '2px'};

  &#logo {
    stroke: ${({ theme }) => theme.colorPrimary};
    height: 50px;
    stroke-width: 1;
    width: 50px;

    > :nth-child(4) {
      fill: ${({ theme }) => theme.colorPrimary};
      stroke: none;
    }

    > :nth-child(5) {
      fill: ${({ theme }) => theme.colorPrimary};
      stroke: none;
    }
  }

  &#more {
    > :nth-child(2) {
      stroke: ${props =>
        props.color
          ? `${props.theme.colorPrimary}`
          : `${props.theme.iconPrimary}`};
      stroke-width: 3;
    }

    > :nth-child(3),
    > :nth-child(4) {
      stroke: ${({ theme }) => theme.iconPrimary};
      stroke-width: 3;
    }
  }

  &#view {
    > :nth-child(2) {
      fill: ${({ theme }) => theme.iconPrimary};
    }
  }
`;

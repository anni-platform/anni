import { css } from 'styled-components';
import { breakpointSizes as sizes } from './constants';

export default {
  margin: (...args) => css`
    margin-top: ${({ mt }) => (mt ? `${mt}px` : '0')};
    margin-right: ${({ mr }) => (mr ? `${mr}px` : '0')};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};
    margin-left: ${({ ml }) => (ml ? `${ml}px` : '0')};
  `,

  padding: (...args) => css`
    padding-top: ${({ pt }) => (pt ? `${pt}px` : '0')};
    padding-right: ${({ pr }) => (pr ? `${pr}px` : '0')};
    padding-bottom: ${({ pb }) => (pb ? `${pb}px` : '0')};
    padding-left: ${({ pl }) => (pl ? `${pl}px` : '0')};
  `,
};

// Media Templates
export const Above = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

import { css } from 'styled-components';

/*
 * Easing
 */

export const EASE_OUT_BACK = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
export const EASE_OUT_EXPO = 'cubic-bezier(0.19, 1, 0.22, 1)';

/*
 * Viewport Breakpoint
 */
export const breakpointSizes = {
  xl: 1600,
  lg: 1200,
  md: 960,
  sm: 570,
};

/*
 * Media Templates
 */
export const Above = Object.keys(breakpointSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpointSizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

import { createGlobalStyle } from 'styled-components';

/*
 * Font Definitions
 */

import ApercuRegular from './fonts/ApercuTrial-Regular.woff';
import ApercuMedium from './fonts/ApercuTrial-Medium.woff';
import ApercuBold from './fonts/ApercuTrial-Bold.woff';
import ApercuMono from './fonts/ApercuTrial-Mono.woff';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Apercu';
    src: url(${ApercuRegular});
    font-weight: normal;
  }
  @font-face {
    font-family: 'Apercu Medium';
    src: url(${ApercuMedium});
    font-weight: 600;
  }
  @font-face {
    font-family: 'Apercu Bold';
    src: url(${ApercuBold});
    font-weight: 800;
  }
  @font-face {
    font-family: 'Apercu Mono';
    src: url(${ApercuMono});
  }

  html {
    -webkit-font-smoothing: antialiased;
  }

  body {
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgB};
  }
`;

export default GlobalStyles;

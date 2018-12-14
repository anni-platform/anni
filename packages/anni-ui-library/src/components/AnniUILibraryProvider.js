import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { GlobalStyles } from '../GlobalStyles';
import defaultTheme from '../themes/default';
import darkTheme from '../themes/dark';

export const AnniUILibraryProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <GlobalStyles />
      {children}
    </div>
  </ThemeProvider>
);

export default AnniUILibraryProvider;

AnniUILibraryProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf([defaultTheme, darkTheme]),
};

AnniUILibraryProvider.defaultProps = {
  theme: defaultTheme,
};

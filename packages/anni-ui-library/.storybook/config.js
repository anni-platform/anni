import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { GlobalStyles } from '../src/GlobalStyles';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import defaultTheme from '../src/themes/default';
import darkTheme from '../src/themes/dark';

const req = require.context('../src/components', true, /\.stories\.js/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const StoryWrapper = storyFn => {
  return (
    <>
      <GlobalStyles />
      {storyFn()}
    </>
  );
};

addDecorator(StoryWrapper);
addDecorator(withThemesProvider([defaultTheme, darkTheme]));

configure(loadStories, module);

import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { GlobalStyles } from '../src/globalStyles';

const req = require.context('../src/components', true, /\.stories\.js/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const StoryWrapper = (storyFn) => {
  return (
    <>
      <GlobalStyles />
      {storyFn()}
    </>
  )
}

addDecorator(StoryWrapper);

configure(loadStories, module);
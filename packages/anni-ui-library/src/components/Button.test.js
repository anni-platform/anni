import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from './Button';
import defaultTheme from '../themes/default';

test('Button default', () => {
  expect(
    renderer
      .create(<Button theme={defaultTheme}>Perform action</Button>)
      .toJSON()
  ).toMatchSnapshot();
});

test('Button primary', () => {
  expect(
    renderer
      .create(
        <Button theme={defaultTheme} primary>
          Perform action
        </Button>
      )
      .toJSON()
  ).toMatchSnapshot();
});

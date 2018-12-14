import React from 'react';
import renderer from 'react-test-renderer';
import { ButtonGroup } from './ButtonGroup';
import { Button } from './Button';
import defaultTheme from '../themes/default';

test('ButtonGroup default', () => {
  expect(
    renderer
      .create(<ButtonGroup theme={defaultTheme}>Perform action</ButtonGroup>)
      .toJSON()
  ).toMatchSnapshot();
});

test('ButtonGroup center', () => {
  expect(
    renderer
      .create(
        <ButtonGroup theme={defaultTheme} center>
          <Button>Perform action</Button>
        </ButtonGroup>
      )
      .toJSON()
  ).toMatchSnapshot();
});

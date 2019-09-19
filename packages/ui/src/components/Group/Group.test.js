import React from 'react';
import renderer from 'react-test-renderer';
import { Group } from './Group';
import { Button } from '../Button/Button';
import defaultTheme from '../../themes/default';

test('Group default', () => {
  expect(
    renderer.create(<Group theme={defaultTheme}>Perform action</Group>).toJSON()
  ).toMatchSnapshot();
});

test('Group center', () => {
  expect(
    renderer
      .create(
        <Group theme={defaultTheme} center>
          <Button>Perform action</Button>
        </Group>
      )
      .toJSON()
  ).toMatchSnapshot();
});

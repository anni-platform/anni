import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

storiesOf('Controls/ButtonGroup', module)
  .add('default', () => (
    <ButtonGroup>
      <Button onClick={action('clicked')}>Button A</Button>
      <Button onClick={action('clicked')}>Button B</Button>
    </ButtonGroup>
  ))
  .add('center', () => (
    <ButtonGroup center>
      <Button onClick={action('clicked')}>Button A</Button>
      <Button onClick={action('clicked')}>Button B</Button>
    </ButtonGroup>
  ));

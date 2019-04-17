import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, NakedButton } from './Button';
import { OutlineIcon } from '../Icon/Icon';

storiesOf('Form/Buttons', module)
  .add('default', () => (
    <Button onClick={action('clicked')}>Default Button</Button>
  ))
  .add('primary', () => (
    <Button onClick={action('clicked')} primary>
      Primary Button
    </Button>
  ))
  .add('naked', () => (
    <NakedButton onClick={action('clicked')}>
      <OutlineIcon name="logo" />
    </NakedButton>
  ));

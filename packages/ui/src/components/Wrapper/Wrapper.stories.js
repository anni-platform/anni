import React from 'react';
import { storiesOf } from '@storybook/react';

import { Wrapper } from './Wrapper';
import { Button } from '../Button/Button';
import { Group } from '../Group/Group';

storiesOf('Layout/Wrapper', module).add('default', () => (
  <Wrapper>
    <Group>
      <Button>Button A</Button>
      <Button>Button B</Button>
    </Group>
  </Wrapper>
));

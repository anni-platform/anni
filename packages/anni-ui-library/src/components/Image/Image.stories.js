import React from 'react';
import { storiesOf } from '@storybook/react';
import { Image } from './Image';

storiesOf('Image', module).add('image', () => (
  <Image src="https://github.com/anni-platform/anni-platform/blob/master/src/media/01.png?raw=true" />
));

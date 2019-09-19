import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageCollection from '.';

const req = require.context('./images', true, /\.png/);
const images = req.keys().map(filename => req(filename));

storiesOf('ImageCollection', module)
  .add('empty', () => <ImageCollection />)
  .add('with images', () => (
    <ImageCollection
      defaultCollection={images.map(url => ({ url, title: url }))}
    />
  ));

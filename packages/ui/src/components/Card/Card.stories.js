import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Card, CardControls, CardDetails } from './Card';
import { Grid } from '../Grid/Grid';
import { SolidIcon, OutlineIcon } from '../Icon/Icon';
import { Image } from '../Image/Image';

storiesOf('Layout/Card', module)
  .add('default', () => (
    <Grid>
      <Card />
      <div />
    </Grid>
  ))
  .add('active', () => (
    <Grid>
      <Card onClick={action('clicked')} active>
        <Image src="https://github.com/anni-platform/anni-platform/blob/master/src/media/01.png?raw=true" />
      </Card>
      <div />
    </Grid>
  ))
  .add('with tray', () => (
    <Grid>
      <Card onClick={action('clicked')} active>
        <Image src="https://github.com/anni-platform/anni-platform/blob/master/src/media/01.png?raw=true" />
        <CardDetails>
          <p>Microsoft</p>
        </CardDetails>
        <CardControls>
          <OutlineIcon name="view" size={24} />
          <OutlineIcon name="delete" size={24} />
          <SolidIcon name="share" size={24} />
        </CardControls>
      </Card>
      <div />
    </Grid>
  ));

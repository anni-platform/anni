import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grid, GridItem } from './Grid';

storiesOf('Layout/Grid', module).add('default', () => (
  <Grid small>
    <GridItem full solid />
    <GridItem solid />
    <GridItem long solid />
    <GridItem tall solid />
    <GridItem solid />
    <GridItem solid />
    <GridItem solid />
  </Grid>
));

import React from 'react';
import { storiesOf } from '@storybook/react';
import { OutlineIcon, SolidIcon } from './Icon';

storiesOf('Icons', module)
  .add('logo', () => <OutlineIcon name="logo" />)
  .add('add', () => <OutlineIcon name="add" />)
  .add('arrow-back', () => <OutlineIcon name="arrow-back" />)
  .add('audio', () => <OutlineIcon name="audio" />)
  .add('cancel', () => <OutlineIcon name="cancel" />)
  .add('confirm', () => <OutlineIcon name="confirm" />)
  .add('delete', () => <OutlineIcon name="delete" />)
  .add('more', () => <OutlineIcon name="more" />)
  .add('notification', () => <SolidIcon name="notification" />)
  .add('popout', () => <OutlineIcon name="popout" />)
  .add('video', () => <OutlineIcon name="video" />)
  .add('view', () => <OutlineIcon name="view" />)
  .add('chevron-down', () => <SolidIcon name="chevron-down" />)
  .add('share', () => <SolidIcon name="share" />)
  .add('prev-frame', () => <SolidIcon name="prev-frame" />)
  .add('play', () => <SolidIcon name="play" />)
  .add('pause', () => <SolidIcon name="pause" />)
  .add('next-frame', () => <SolidIcon name="next-frame" />)
  .add('sound', () => <SolidIcon name="sound" />);

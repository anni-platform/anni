import React from 'react';
import { render } from 'react-testing-library';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';

export function renderWithLocation(path = '/', children) {
  const source = createMemorySource(path);
  const history = createHistory(source);

  const renderResult = render(
    <LocationProvider history={history}>{children}</LocationProvider>
  );

  return {
    ...renderResult,
    history,
  };
}

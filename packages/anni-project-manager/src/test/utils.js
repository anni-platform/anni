import React from 'react';
import { render } from 'react-testing-library';
import ApplicationProvider from 'Providers';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
} from '@reach/router';

export function renderWithLocation(path = '/', children) {
  const source = createMemorySource(path);
  const history = createHistory(source);

  const renderResult = render(
    <ApplicationProvider>
      <LocationProvider history={history}>{children}</LocationProvider>
    </ApplicationProvider>
  );

  return {
    ...renderResult,
    history,
  };
}

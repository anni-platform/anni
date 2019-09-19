import React from 'react';
import { DropboxProvider } from 'shared';

export default function Providers({ children }) {
  return <DropboxProvider>{children}</DropboxProvider>;
}

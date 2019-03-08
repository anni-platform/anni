import createDropboxProvider from 'dbdbdb-provider';
import { homepage } from '../../package.json';
export * from './project';

const authRedirect =
  process.env.NODE_ENV === 'production' ? homepage : undefined;

export const {
  DropboxContext,
  DropboxProvider,
  useDropboxClient,
} = createDropboxProvider({
  clientId: 'swbiv6r9kwfs4os',
  authRedirect,
});

import createDropboxProvider from 'dbdbdb-provider';

export * from './project';

export const {
  DropboxContext,
  DropboxProvider,
  useDropboxClient,
} = createDropboxProvider({
  clientId: 'swbiv6r9kwfs4os',
});

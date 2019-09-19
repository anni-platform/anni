import createDropboxProvider from 'dbdbdb-provider';
export * from './project';
const { REACT_APP_INTEG_TEST } = process.env;
let clientId = process.env.REACT_APP_DROPBOX_CLIENT_ID;
let defaultAccessToken;

if (REACT_APP_INTEG_TEST) {
  const { integClientId, integAccessToken } = require('.ignore/integ-config');
  clientId = integClientId;
  defaultAccessToken = integAccessToken;
}

export const {
  DropboxContext,
  DropboxProvider,
  useDropboxClient,
} = createDropboxProvider({
  clientId,
  authRedirect: process.env.PUBLIC_URL || window.location.origin,
  defaultAccessToken,
});

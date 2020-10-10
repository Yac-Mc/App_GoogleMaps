import { SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };
const urlREST = 'http://localhost:5000';

export const environment = {
  production: true,
  sokectConfig: config,
  url: urlREST
};

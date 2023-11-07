const DEV_PORT = '5000';
const localDomains = [
  '[::1]',
  'localhost',
  '127.0.0.1',
];

const location = window.location.hostname;
const prodUrl = `api.${location}`;

export const devMode = localDomains.includes(location);

export const API_PATH = `http://${devMode ? `${location}:${DEV_PORT}` : prodUrl}`;
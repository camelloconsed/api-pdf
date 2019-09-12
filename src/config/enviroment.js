import dotenv from 'dotenv';
import CONSTS from './constants';

export default () => {
  const consts = CONSTS();
  dotenv.config();
  let Env = {};

  switch (process.env.API_ENV) {
    case consts.ENV.PROD:
      Env = {
        api: {
          name: process.env.API_NAME,
          env: process.env.API_ENV,
          version: process.env.API_VERSION,
        },
      };
      break;
    case consts.ENV.DEV:
      Env = {
        api: {
          name: process.env.API_NAME,
          env: process.env.API_ENV,
          version: process.env.API_VERSION,
        },
      };
      break;
    default:
      Env = {
        api: {
          name: process.env.API_NAME,
          env: process.env.API_ENV,
          version: process.env.API_VERSION,
        },
      };
      break;
  }

  return Env;
};

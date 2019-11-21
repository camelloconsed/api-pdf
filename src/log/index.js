import axios from 'axios';
import Env from '../config/enviroment';

export default () => {
  const env = Env();
  const logger = {};

  logger.error = async (method, actionType, idMachine, err) => {
    try {
      /* LOG API CALL */
      const logData = await axios.post(
        `${env.api.network.log.endpoints.url}/log`, {
          type: 'error',
          idMachine,
          method,
          actionType,
          apiId: 'api_pdf',
          message: err.message,
          date: new Date(),
          user: '',
        },
      );
      return logData;
    } catch (error) {
      return error.message;
    }
  };

  return logger;
};

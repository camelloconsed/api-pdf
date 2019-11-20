import Validator from 'fastest-validator';
import { ValidationError } from '../errors';
import Log from '../log';

const logger = Log();

export default async (schema, params, fn) => {
  const validator = new Validator({
    messages: {
      rut: 'The "{field}" field must be a valid RUT! Actual: {actual}',
    },
  });

  validator.add('rut', value => {
    let rut = value;
    let dv = rut.slice(-1);

    if (typeof rut !== 'string') {
      return validator.makeError('rut', null, value);
    }
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
      return validator.makeError('rut', null, value);
    }

    rut = typeof rut === 'string'
      ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
      : '';

    const cuerpo = rut.slice(0, -1);
    let suma = 0;
    let multiplo = 2;
    let index = 0;

    for (let i = 1; i <= cuerpo.length; i += 1) {
      index = multiplo * rut.charAt(cuerpo.length - i);
      suma += index;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);

    dv = (dv === 'K') ? 10 : parseInt(dv, 10);
    dv = (dv === 0) ? 11 : parseInt(dv, 10);

    return dv === dvEsperado ? true : validator.makeError('rut', null, value);
  });

  const check = validator.compile(schema);
  const validationResult = check(params);

  if (validationResult === true) {
    if (fn) {
      return fn(params);
    }
  } else {
    await logger.error('POST', 'Store Document', params.idMachine, { message: 'Validation rut Error' });
    return new ValidationError(validationResult.map(vr => vr.message));
  }
};

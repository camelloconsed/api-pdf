export default () => {
  const rutValidator = {};

  rutValidator.validate = (value, validator) => {
    let rut = value;

    if (typeof rut !== 'string') {
      return validator.makeError('rut', null, value);
    }
    if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
      return validator.makeError('rut', null, value);
    }

    rut = typeof rut === 'string'
      ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
      : '';

    let t = parseInt(rut.slice(0, -1), 10);
    let m = 0;
    let s = 1;

    while (t > 0) {
      s = (s + (t % 10) * ((9 - m) % 6)) % 11;
      m += 1;
      t = Math.floor(t / 10);
    }

    const v = s > 0 ? `${(s - 1)}` : 'K';
    return v === rut.slice(-1);
  };

  rutValidator.message = 'The "{field}" field must be a valid RUT! Actual: {actual}';

  return rutValidator;
};

export const errorHanlder = (err, req, res, next) => {
  try {
    if (err.name === 'PropertyError') return (err = handlePropertyError(err, res));
    if (err.name === 'ValidationError') return (err = handleValidationError(err, res));
    if (err.code && err.code == 11000) return (err = handleDuplicateKeyError(err, res));
  } catch (err) {
    res.status(500).send('An unknown error occurred.');
  }
};
export const validObjectReq = (validationKey, req, res) => {
  for (let i = 0; i < validationKey.length; i++) {
    if (!req.body.hasOwnProperty(validationKey[i]) || !req.body[validationKey[i]]) {
      const code = 409;
      const error = `value ${validationKey[i]} `;
      res.status(code).send({ messages: error, fields: validationKey[i] });
      return false;
    }
  }
  return true;
};

const handlePropertyError = (err, res) => {
  const code = 409;
  const error = `value ${err.key} `;
  res.status(code).send({ messages: error, fields: err.key });
};
//handle email or usename duplicates
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `An account with that ${field} already exists.`;
  res.status(code).send({ messages: error, fields: field });
};
//handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join('');
    res.status(code).send({ messages: formattedErrors, fields: fields });
  } else {
    res.status(code).send({ messages: errors, fields: fields });
  }
};

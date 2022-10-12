export const errorHanlder = (err, req, res, next) => {
  try {
    if (err.name === 'LoginError') return (err = handleLoginError(err, res));
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
      res.status(code).send({ messages: error, fields: validationKey[i], status: false });
      return false;
    }
  }
  return true;
};
const handleLoginError = (err, res) => {
  const code = 401;
  const error = `Incorrect Username or Password`;
  res.status(code).send({ messages: error, status: false });
};
const handlePropertyError = (err, res) => {
  const code = 409;
  const error = `required value ${err.key} `;
  res.status(code).send({ messages: error, fields: err.key, status: false });
};
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `An account with that ${field} already exists.`;
  res.status(code).send({ messages: error, fields: field, status: false });
};

const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join('');
    res.status(code).send({ messages: formattedErrors, fields: fields, status: false });
  } else {
    res.status(code).send({ messages: errors, fields: fields, status: false });
  }
};

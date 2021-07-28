const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../config');

const UnauthorizedError = require('../errors/unauthorized-err');
const { messageError } = require('../constants');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(messageError.unauthorizedError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError(messageError.unauthorizedError);
  }

  req.user = payload;
  // console.log(authorization, payload);

  next();
  return true;
};

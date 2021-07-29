const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

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
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(messageError.unauthorizedError);
  }

  req.user = payload;
  // console.log(authorization, payload);

  next();
  return true;
};

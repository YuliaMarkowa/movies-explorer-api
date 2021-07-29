const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const { messageError, messageLuck } = require('../constants');

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => res.status(200).send({ message: messageLuck.register }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(messageError.badRequestError);
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictingRequestError(messageError.conflictingRequestError);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError(messageError.notValidRequest);
    })
    .catch(next);
};

const getActualUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.outFoundError);
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const updateActualUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messageError.outFoundError);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError(messageError.badRequestError);
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictingRequestError(messageError.conflictingRequestError);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getActualUserInfo,
  updateActualUserInfo,
};

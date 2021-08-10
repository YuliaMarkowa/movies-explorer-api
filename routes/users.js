const usersRouter = require('express').Router();

const {
  getActualUserInfo,
  updateActualUserInfo,
} = require('../controllers/users');

const {
  joiUpdateActualUserInfo,
} = require('../middlewares/joiValidation');

usersRouter.get('/users/me', getActualUserInfo);
usersRouter.patch('/users/me', joiUpdateActualUserInfo, updateActualUserInfo);

module.exports = usersRouter;

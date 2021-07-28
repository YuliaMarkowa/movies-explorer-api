const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { joiCreateUser, joiLogin } = require('../middlewares/joiValidation');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', joiCreateUser, createUser);
router.post('/signin', joiLogin, login);
router.use('/', auth, moviesRouter);
router.use('/', auth, usersRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

module.exports = router;

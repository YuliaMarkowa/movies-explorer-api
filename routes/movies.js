const moviesRouter = require('express').Router();

const {
  getMoviesCards,
  createMovieCard,
  removeMovieCard,
} = require('../controllers/movies');

const {
  joiCreateMovieCard,
  joiRemoveMovieCard,
} = require('../middlewares/joiValidation');

moviesRouter.get('/movies', getMoviesCards);
moviesRouter.post('/movies', joiCreateMovieCard, createMovieCard);
moviesRouter.delete('/movies/:movieId', joiRemoveMovieCard, removeMovieCard);

module.exports = moviesRouter;

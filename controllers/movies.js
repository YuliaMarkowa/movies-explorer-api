const Movie = require('../models/movie');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const { messageError, messageLuck } = require('../constants');

const getMoviesCards = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovieCard = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(messageError.badRequestError);
      } else {
        next(err);
      }
    })
    .catch(next);
};

const removeMovieCard = (req, res, next) => {
  const id = req.params.movieId;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messageError.notFoundError);
      }
      if (req.user._id === String(movie.owner)) {
        return Movie.findByIdAndRemove(id)
          .then(() => res.status(200).send({ message: messageLuck.removeCard }));
      }
      throw new ForbiddenError(messageError.forbiddenError);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(messageError.notValidRequest);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  getMoviesCards,
  createMovieCard,
  removeMovieCard,
};

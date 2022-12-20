import { Movie } from '../models/movie.js';
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  ConflictError,
} from '../errors/index.js';
import { UniqueErrorCode } from './users.js';

// POST-запрос для создания новой карточки
export const createMovieCard = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((cardDocument) => {
      const card = cardDocument.toObject();
      card.owner = { _id: req.user._id };
      res.send(card);
    })
    .catch((err) => {
      if (err.code === UniqueErrorCode) {
        next(new ConflictError('Такой фильм уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

//  GET-запрос для загрузки всех сохранённых текущим пользователем фильмов;
export const findMovieCards = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// DELETE-запрос на удаление карточки по id
export const deleteMovieCard = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Фильм не найден');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Доступ запрещен');
      } else {
        return card.remove().then(() => { res.send(card); });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

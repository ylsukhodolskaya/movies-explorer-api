import { Movie } from '../models/movie.js';
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  messages,
} from '../errors/index.js';

// POST-запрос для создания новой карточки
export const createMovieCard = (req, res, next) => {
  req.body.owner = req.user._id;
  Movie.create(req.body)
    .then((cardDocument) => {
      // const card = cardDocument.toObject();
      // card.owner = { _id: req.user._id };
      res.send(cardDocument);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.movie.validation` ${err.message}`));
      } else {
        next(err);
      }
    });
};

//  GET-запрос для загрузки всех сохранённых текущим пользователем фильмов;
export const findMovieCards = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// DELETE-запрос на удаление карточки по id
export const deleteMovieCard = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(messages.movie.notFound);
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(messages.movie.anotherOwner);
      } else {
        return card.remove().then(() => { res.send(card); });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(messages.movie.validation` ${err.message}`));
      } else {
        next(err);
      }
    });
};

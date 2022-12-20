import { constants } from 'http2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import { ConflictError, BadRequestError, NotFoundError } from '../errors/index.js';

export const UniqueErrorCode = 11000;

// GET-запрос пользователя
export const findCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректные данные для пользователя. ${err.message}`));
      } else {
        next(err);
      }
    });
};

// PATCH-запрос по обновлению профиля
export const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Некорректные данные для пользователя. ${err.message}`));
      } else {
        next(err);
      }
    });
};

// POST Авторизация пользователя
export const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOneAndValidatePassword({ password, email })
    .then((user) => {
      const { JWT_SALT } = req.app.get('config');
      const token = jwt.sign({ _id: user._id }, JWT_SALT, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

// POST Регистрация пользователя
export const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      return User.create(req.body);
    })
    .then((document) => {
      const { password: removed, ...user } = document.toObject();
      res.status(constants.HTTP_STATUS_CREATED).send(user);
    })
    .catch((err) => {
      if (err.code === UniqueErrorCode) {
        next(new ConflictError('Пользователь с такой почтой уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(`Некорректные данные для пользователя. ${err.message}`));
      } else {
        next(err);
      }
    });
};

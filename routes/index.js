import { Router } from 'express';
import { userRoutes } from './users.js';
import { movieRoutes } from './movies.js';
import { authRouter } from './auth.js';
import { auth } from '../middlewares/auth.js';
import {
  NotFoundError,
  messages,
} from '../errors/index.js';

export const router = Router();

router.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error(messages.app.serverError);
  }, 0);
});

// Роутинг авторизации
router.use('/', authRouter);

router.use(auth);

// Вызываем роутинг пользователя
router.use('/users', userRoutes);

// Роутинг карточек
router.use('/movies', movieRoutes);

// Обработка нееправильного пути
router.all('/*', (req, res, next) => {
  next(new NotFoundError(messages.app.noPage));
});

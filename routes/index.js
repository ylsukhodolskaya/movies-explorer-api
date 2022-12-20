import { Router } from 'express';
import { userRoutes } from './users.js';
import { movieRoutes } from './movies.js';
import { authRouter } from './auth.js';
import { auth } from '../middlewares/auth.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export const router = Router();

router.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
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
  next(new NotFoundError('Такой страницы не существует'));
});
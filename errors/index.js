export { ConflictError } from './ConflictError.js';
export { NotFoundError } from './NotFoundError.js';
export { BadRequestError } from './BadRequestError.js';
export { UnauthorizedError } from './UnauthorizedError.js';
export { ForbiddenError } from './ForbiddenError.js';

export const UniqueErrorCode = 11000;
export const messages = {
  app: {
    unauthorized: 'Необходима авторизация',
    rateLimit: 'Слишком много запросов с вашего IP, попробуйте повторить попытку позже',
    unknown: 'Неизвестная ошибка',
    noPage: 'Такой страницы не существует',
    serverError: 'Сервер сейчас упадёт',
    notURL: 'Ссылка должна быть http(s)-URL',
    notEmail: 'Почта должна быть вида a@b.c',
  },
  user: {
    alreadyExist: 'Пользователь с такой почтой уже существует',
    validation: 'Некорректные данные для пользователя.',
    notFound: 'Пользователь не найден',
    incorrect: 'Неправильный логин или пароль',
  },
  movie: {
    validation: 'Введены некорректные данные',
    notFound: 'Фильм не найден',
    anotherOwner: 'Доступ запрещен',
  },
};

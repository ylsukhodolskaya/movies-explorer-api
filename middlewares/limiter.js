import rateLimit from 'express-rate-limit';
import { messages } from '../errors/index.js';

// лимитируем запросы на сервер
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: messages.app.rateLimit,
});

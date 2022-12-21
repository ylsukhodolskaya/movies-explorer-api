import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import process from 'process';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { errors } from 'celebrate';
import { router } from './routes/index.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import { limiter } from './middlewares/limiter.js';
import { errHandler } from './middlewares/ErrHandler.js';

const config = dotenv.config({
  path: path
    .resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common'),
})
  .parsed;

const app = express();
app.set('config', config);

const { PORT = 3002 } = process.env;

mongoose.set({ runValidators: true });

// подключаемся к базе данных
mongoose.connect(config.DB_URL); // не забыть исправить на сервере в env

// подключаем логгер запросов
app.use(requestLogger);

// подключаем Cors
app.use(cors({
  origin: '*',
  allowedHeaders: ['content-type', 'authorization'],
}));

// настраиваем заголовки
app.use(helmet());

// ограничиваем количество запросов на сервер
app.use(limiter);

// для собирания JSON-формата
app.use(bodyParser.json());

// для приёма веб-страниц внутри POST-запроса
app.use(bodyParser.urlencoded({ extended: true }));

// подключаем роуты
app.use(router);

// подключаем логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use(errHandler);

// слушаем порт
app.listen(PORT);

# movies-explorer-api
# Бэкенд диплома студента web факультета Яндекс практикума Фокс Юлии.

## Описание дипломной работы 
Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

## Функционал:
- Роуты для пользователей:
  - GET /users/me — возвращает информацию о пользователе (email и имя);
  - PATCH /users/me — обновляет информацию о пользователе (email и имя);

- Роуты для фильмов:
  - GET /movies — возвращает все сохранённые текущим  пользователем фильмы;
  - POST /movies — создает фильм с переданными данными {country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId};
  - DELETE /movies/:cardId — удаляет фильм по _id.

## Стек технологий:
- JavaScript:
  - Промисы (Promise);
  - Асинхронность и оптимизация;
  - Rest API;
- Node.js;
- Express;
- MongoDB.

## Директории
* `/controllers` – содержит файлы описания моделей пользователя и карточки;
* `/models` – содержит файлы описания схем пользователя и карточки;
* `/routes` — содержит описание основных роутов для пользователя и карточки;
* `/errors` – содержит описание ошибок.
* `/middlewares` – содержит миделвары авторизации, логгера, валидации, лимитера, обработки ошибок сервера.

## Установка и запуск проекта:
Клонировать репозиторий:

    git clone https://github.com/ylsukhodolskaya/movies-explorer-api.git

Установить зависимости:

    npm install

Запустить сервер:

    npm run start

Запустить сервер с hot-reload:

    npm run dev

## Языки:
- JavaScript

## Библиотеки:
- express
- cors
- mongoose
- crypto
- dotenv
- celebrate
- helmet
- jsonwebtoken
- Winston
- express-winston
- bcrypt
- validator
- body-parser
- express-rate-limit

## База данных:
- MongoDB

## Ссылка на домен сервера:
https://api-movies-explorer.nomoredomains.club

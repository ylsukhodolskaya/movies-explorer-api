import { constants } from 'http2';
import { messages } from '../errors/index.js';

export const errHandler = (err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = status === constants.HTTP_STATUS_INTERNAL_SERVER_ERROR ? `${messages.app.unknown}` : err.message;
  res.status(status).send({ message });
  next();
};

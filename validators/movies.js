import validator from 'validator';
import { Joi, Segments } from 'celebrate';
import { celebrate, schemaObjectId } from './common.js';
import { messages } from '../errors/index.js';

export const schemaRouteId = schemaObjectId;
export const schemaString = Joi.string().required();
export const schemaNumber = Joi.number().required();
export const schemaLink = Joi.string().custom((value, helper) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helper.message(messages.app.notURL);
}).required();

export const schemaObjectRouteId = Joi.object({
  cardId: schemaRouteId.required(),
}).required();
export const schemaObjectCard = Joi.object({
  country: schemaString,
  director: schemaString,
  duration: schemaNumber,
  year: schemaString,
  description: schemaString,
  image: schemaLink,
  trailerLink: schemaLink,
  thumbnail: schemaLink,
  nameRU: schemaString,
  nameEN: schemaString,
  movieId: schemaNumber,
}).required();

export const segmentBodyCard = { [Segments.BODY]: schemaObjectCard };
export const segmentParamsRouteMe = { [Segments.PARAMS]: schemaObjectRouteId };

export const celebrateBodyCard = celebrate(segmentBodyCard);
export const celebrateParamsRouteId = celebrate(segmentParamsRouteMe);

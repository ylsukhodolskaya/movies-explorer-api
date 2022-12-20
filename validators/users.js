import { Joi, Segments } from 'celebrate';
import {
  celebrate,
} from './common.js';

export const schemaEmail = Joi.string().email().required();
const schemaPassword = Joi.string().required();
// необязательные поля без required
const schemaName = Joi.string().min(2).max(30);

const schemaObjectProfile = Joi.object({
  name: schemaName,
}).required();
const schemaObjectProfileRequired = Joi.object({
  name: schemaName.required(),
  email: schemaEmail.required(),
}).required();
const schemaObjectAuth = Joi.object({
  email: schemaEmail,
  password: schemaPassword,
}).required();
const schemaObjectUser = schemaObjectAuth // объединяем несколько схем в одну
  .concat(schemaObjectProfile);

const segmentBodyAuth = { [Segments.BODY]: schemaObjectAuth };
const segmentBodyUser = { [Segments.BODY]: schemaObjectUser };
const segmentBodyProfileRequired = { [Segments.BODY]: schemaObjectProfileRequired };

export const celebrateBodyAuth = celebrate(segmentBodyAuth);
export const celebrateBodyUser = celebrate(segmentBodyUser);
export const celebrateBodyProfileRequired = celebrate(segmentBodyProfileRequired);

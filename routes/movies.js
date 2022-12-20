import { Router } from 'express';
import {
  createMovieCard,
  findMovieCards,
  deleteMovieCard,
} from '../controllers/movies.js';
import { celebrateBodyCard, celebrateParamsRouteId } from '../validators/movies.js';

export const movieRoutes = Router();

movieRoutes.post('/', celebrateBodyCard, createMovieCard);
movieRoutes.get('/', findMovieCards);
movieRoutes.delete('/:cardId', celebrateParamsRouteId, deleteMovieCard);

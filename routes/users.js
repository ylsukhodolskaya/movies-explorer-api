import { Router } from 'express';
import {
  updateUserProfile,
  findCurrentUser,
} from '../controllers/users.js';
import { celebrateBodyProfileRequired } from '../validators/users.js';

export const userRoutes = Router();

userRoutes.patch('/me', celebrateBodyProfileRequired, updateUserProfile);
userRoutes.get('/me', findCurrentUser);

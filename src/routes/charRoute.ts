import { Router } from 'express';
import charController from '../controllers/charController';

export const charRoute = Router();

charRoute.get('/characters', charController.listChars);
charRoute.get('/allCharacters', charController.listAllChars);
charRoute.get('/characters/:id', charController.listChar);
charRoute.post('/character', charController.createChar);
charRoute.put('/character/:id', charController.updateChar);
charRoute.delete('/character/:id', charController.deleteChar);
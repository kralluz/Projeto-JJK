import { Router} from 'express';
import charController from '../controllers/charController';

export const charRoute = Router();

charRoute.get('/characters', charController.listChars);  // Rota para listar todos os personagens
charRoute.get('/allCharacters', charController.listAllChars);  // Rota para listar todos os personagens
charRoute.get('/characters/:id', charController.listChar);  // Rota para listar um personagem
charRoute.post('/character', charController.createChar); // Rota para criar um personagem
charRoute.put('/character/:id', charController.updateChar); // Rota para atualizar um personagem
charRoute.delete('/character/:id', charController.deleteChar); // Rota para deletar um personagem
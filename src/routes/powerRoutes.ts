import { Router} from 'express';
import powerController from '../controllers/powerController';


export const powerRoutes = Router();


powerRoutes.get('/powers', powerController.listPowers);  // Rota para listar todos os poderes
powerRoutes.get('/power/:id', powerController.listPower);  // Rota para listar um poder
powerRoutes.post('/power', powerController.createPower);  // Rota para criar um poder
powerRoutes.put('/power/:id', powerController.updatePower);  // Rota para atualizar um poder
powerRoutes.delete('/power/:id', powerController.deletePower);  // Rota para deletar um poder
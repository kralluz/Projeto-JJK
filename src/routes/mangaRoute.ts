import { Router } from 'express';
import mangaController from '../controllers/mangaController';
import upload from '../middleware/upload'; // Middleware para upload de arquivos

export const mangaRoute = Router();

// Rotas para Mangás
mangaRoute.get('/mangas', mangaController.listMangas); // Listar todos os mangás
mangaRoute.get('/mangas/:id', mangaController.getManga); // Obter detalhes de um mangá específico
mangaRoute.post('/mangas', mangaController.createManga); // Criar um novo mangá
mangaRoute.put('/mangas/:id', mangaController.updateManga); // Atualizar um mangá existente
mangaRoute.delete('/mangas/:id', mangaController.deleteManga); // Deletar um mangá existente

// Rotas para Capítulos
mangaRoute.get('/mangas/:id/chapters', mangaController.listChapters); // Listar capítulos de um mangá com paginação
mangaRoute.post(
  '/mangas/:mangaId/chapters', 
  upload.array('images', 10), // Permitir upload de até 10 imagens
  mangaController.createChapter // Criar um novo capítulo
);

// Nova Rota para Obter Imagens de um Capítulo
mangaRoute.get('/chapters/:chapterId/images', mangaController.getChapterImages); // Obter imagens de um capítulo específico

export default mangaRoute;

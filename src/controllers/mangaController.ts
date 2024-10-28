// src/controllers/mangaController.ts
import { Request, Response } from "express";
import prisma from '../client';
import { z, ZodError } from "zod";
import path from 'path';

// Schemas de validação usando Zod
const mangaCreateSchema = z.object({
  name: z.string().min(3).max(255),
  language: z.string().min(2).max(50),
});

const mangaUpdateSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  language: z.string().min(2).max(50).optional(),
});

// Atualizado: Removido .uuid()
const mangaParamsSchema = z.object({
  id: z.string(),
});

const chaptersPageSchema = z.object({
  page: z.string().optional(),
});

// Schema para validação de criação de capítulo
const chapterCreateSchema = z.object({
  number: z.string().regex(/^\d+$/, "Número do capítulo deve ser um número inteiro positivo."),
  title: z.string().min(1).max(255),
});

// Atualizado: Removido .uuid()
const chapterParamsSchema = z.object({
  chapterId: z.string(),
});


class MangaController {
  // Listar todos os mangás com a contagem de capítulos
  async listMangas(req: Request, res: Response) {
    try {
      const mangas = await prisma.manga.findMany({
        include: {
          chapters: {
            select: { id: true },
          },
        },
      });

      const result = mangas.map(manga => ({
        id: manga.id,
        name: manga.name,
        language: manga.language,
        totalChapters: manga.chapters.length,
      }));

      return res.status(200).json(result);
    } catch (error) {
      console.error("Erro em listMangas:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Obter detalhes de um mangá específico
  async getManga(req: Request, res: Response) {
    try {
      const { id } = mangaParamsSchema.parse(req.params);

      const manga = await prisma.manga.findUnique({
        where: { id },
        include: {
          chapters: true,
        },
      });

      if (!manga) {
        return res.status(404).json({ error: "Mangá não encontrado." });
      }

      return res.status(200).json(manga);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "ID inválido." });
      }
      console.error("Erro em getManga:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Criar um novo mangá
  async createManga(req: Request, res: Response) {
    try {
      const data = mangaCreateSchema.parse(req.body);

      const manga = await prisma.manga.create({
        data,
      });

      return res.status(201).json(manga);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Dados inválidos." });
      }
      if ((error as any).code === 'P2002') { // Prisma: Violação de restrição única
        return res.status(409).json({ error: "Mangá com este nome já existe." });
      }
      console.error("Erro em createManga:", error);
      return res.status(500).json({ error: "Erro ao criar o mangá." });
    }
  }

  // Atualizar um mangá existente
  async updateManga(req: Request, res: Response) {
    try {
      const { id } = mangaParamsSchema.parse(req.params);
      const data = mangaUpdateSchema.parse(req.body);

      const manga = await prisma.manga.update({
        where: { id },
        data,
      });

      return res.status(200).json(manga);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Dados inválidos." });
      }
      if ((error as any).code === 'P2025') { // Prisma: Registro não encontrado
        return res.status(404).json({ error: "Mangá não encontrado." });
      }
      console.error("Erro em updateManga:", error);
      return res.status(500).json({ error: "Erro ao atualizar o mangá." });
    }
  }

  // Deletar um mangá existente
  async deleteManga(req: Request, res: Response) {
    try {
      const { id } = mangaParamsSchema.parse(req.params);

      // Deletar também capítulos e imagens associados
      await prisma.image.deleteMany({
        where: {
          chapter: {
            mangaId: id,
          },
        },
      });

      await prisma.chapter.deleteMany({
        where: {
          mangaId: id,
        },
      });

      const manga = await prisma.manga.delete({
        where: { id },
      });

      return res.status(200).json({ message: "Mangá deletado com sucesso.", manga });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "ID inválido." });
      }
      if ((error as any).code === 'P2025') { // Prisma: Registro não encontrado
        return res.status(404).json({ error: "Mangá não encontrado." });
      }
      console.error("Erro em deleteManga:", error);
      return res.status(500).json({ error: "Erro ao deletar o mangá." });
    }
  }

  // Listar capítulos de um mangá com paginação
  async listChapters(req: Request, res: Response) {
    try {
      const { id } = mangaParamsSchema.parse(req.params);
      const { page = "1" } = chaptersPageSchema.parse(req.query);
      const currentPage = Number(page);
      const limit = 10; // Número de capítulos por página

      const manga = await prisma.manga.findUnique({
        where: { id },
        include: { chapters: true },
      });

      if (!manga) {
        return res.status(404).json({ error: "Mangá não encontrado." });
      }

      const totalChapters = manga.chapters.length;
      const lastPage = Math.ceil(totalChapters / limit);

      if (currentPage < 1 || currentPage > lastPage) {
        return res.status(400).json({ error: "Página inválida." });
      }

      const chapters = await prisma.chapter.findMany({
        where: { mangaId: id },
        orderBy: { number: 'asc' },
        skip: (currentPage - 1) * limit,
        take: limit,
        include: { images: true },
      });

      const chaptersData = chapters.map(chapter => ({
        id: chapter.id,
        number: chapter.number,
        title: chapter.title,
        images: chapter.images
          .sort((a, b) => a.order - b.order)
          .map(image => `${req.protocol}://${req.get('host')}/images/${manga.id}/${chapter.number}/${path.basename(image.url)}`),
      }));

      const pagination = {
        path: `/mangas/${id}/chapters`,
        currentPage,
        nextPage: currentPage < lastPage ? currentPage + 1 : undefined,
        prevPage: currentPage > 1 ? currentPage - 1 : undefined,
        lastPage,
        totalChapters,
      };

      return res.status(200).json({ pagination, chapters: chaptersData });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Dados inválidos." });
      }
      console.error("Erro em listChapters:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Criar um novo capítulo com imagens
  async createChapter(req: Request, res: Response) {
    try {
      const { mangaId } = req.params;

      // Validar os parâmetros da rota
      const mangaParams = z.object({
        mangaId: z.string().uuid(),
      }).parse(req.params);

      // Validar o corpo da requisição
      const chapterData = chapterCreateSchema.parse(req.body);
      const chapterNumber = parseInt(chapterData.number, 10);

      // Verificar se o mangá existe
      const manga = await prisma.manga.findUnique({
        where: { id: mangaId },
      });

      if (!manga) {
        return res.status(404).json({ error: "Mangá não encontrado." });
      }

      // Verificar se o número do capítulo já existe para este mangá
      const existingChapter = await prisma.chapter.findUnique({
        where: {
          mangaId_number: {
            mangaId,
            number: chapterNumber,
          },
        },
      });

      if (existingChapter) {
        return res.status(409).json({ error: "Número do capítulo já existe para este mangá." });
      }

      // Criar o capítulo
      const chapter = await prisma.chapter.create({
        data: {
          number: chapterNumber,
          title: chapterData.title,
          manga: {
            connect: { id: mangaId },
          },
        },
      });

      // Se imagens foram enviadas, processar o upload
      if (req.files && Array.isArray(req.files)) {
        const files = req.files as Express.Multer.File[];

        // Loop para criar cada imagem individualmente
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const imageOrder = index + 1;

          // A URL agora inclui o ID do mangá e o número do capítulo
          const imageUrl = `${manga.id}/${chapter.number}/${file.filename}`;

          await prisma.image.create({
            data: {
              url: imageUrl,
              order: imageOrder,
              chapterId: chapter.id,
            },
          });
        }
      }

      // Obter o capítulo com as imagens incluídas
      const createdChapter = await prisma.chapter.findUnique({
        where: { id: chapter.id },
        include: { images: true },
      });

      return res.status(201).json({ chapter: createdChapter });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors.map(e => e.message).join(", ") });
      }
      console.error("Erro em createChapter:", error);
      return res.status(500).json({ error: "Erro ao criar o capítulo." });
    }
  }

  // Novo Método para Obter Imagens de um Capítulo Específico
  async getChapterImages(req: Request, res: Response) {
    try {
      const { chapterId } = chapterParamsSchema.parse(req.params);

      // Verificar se o capítulo existe e obter as imagens
      const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
        include: { images: true, manga: true },
      });

      if (!chapter) {
        return res.status(404).json({ error: "Capítulo não encontrado." });
      }

      // Construir as URLs das imagens
      const imageUrls = chapter.images
        .sort((a, b) => a.order - b.order)
        .map(image => {
          return `${req.protocol}://${req.get('host')}/images/${chapter.manga.id}/${chapter.number}/${path.basename(image.url)}`;
        });

      return res.status(200).json({ images: imageUrls });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "ID inválido." });
      }
      console.error("Erro em getChapterImages:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}

export default new MangaController();

// src/controllers/charController.ts

import { Request, Response } from "express";
import prisma from '../client';
import { z, ZodError } from "zod";

// Esquemas de validação usando Zod
const pageSchema = z.object({
  page: z.string().optional(),
});

const paramsSchema = z.object({
  id: z.string().uuid(), // O ID do Character é um UUID
});

const charUpdateSchema = z.object({
  name: z.string().min(3).max(255),
  age: z.number().min(0),
  image: z.string().min(3).max(255),
  bio: z.string().min(3).max(255),
});

const powerCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

const domainExpansionCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

const charCreateSchema = z.object({
  name: z.string().min(3).max(255),
  age: z.number().min(0),
  image: z.string().min(3).max(255),
  bio: z.string().min(3).max(255),
  powers: z.array(powerCreateSchema).optional(),
  domainExpansions: z.array(domainExpansionCreateSchema).optional(),
});

class CharController {
  // Listar personagens com paginação
  async listChars(req: Request, res: Response) {
    try {
      const { page = "1" } = pageSchema.parse(req.query);
      const currentPage = Number(page);
      const limit = 6;
      const countChars = await prisma.character.count();
      console.log("🚀 ~ CharController ~ listChars ~ countChars:", countChars)

      if (countChars === 0) {
        return res.status(200).json({ message: "Não há personagens cadastrados" });
      }

      const lastPage = Math.ceil(countChars / limit);
      const allChars = await prisma.character.findMany({
        include: { powers: true, domainExpansions: true },
        skip: (currentPage - 1) * limit,
        take: limit,
      });

      const pagination = {
        path: "/characters",
        currentPage: currentPage,
        nextPage: currentPage < lastPage ? currentPage + 1 : undefined,
        prevPage: currentPage > 1 ? currentPage - 1 : undefined,
        lastPage: lastPage,
        totalChars: countChars,
      };

      return res.status(200).json({ pagination, allChars });
    } catch (error) {
      console.error("Erro em listChars:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Listar todos os personagens sem paginação
  async listAllChars(req: Request, res: Response) {
    try {
      const allChars = await prisma.character.findMany({
        include: { powers: true, domainExpansions: true },
      });
      return res.status(200).json(allChars);
    } catch (error) {
      console.error("Erro em listAllChars:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Obter um personagem específico pelo ID
  async listChar(req: Request, res: Response) {
    try {
      const { id } = paramsSchema.parse(req.params);
      const char = await prisma.character.findUnique({
        where: { id },
        include: { powers: true, domainExpansions: true },
      });

      if (!char) {
        return res.status(404).json({ error: 'Personagem não encontrado.' });
      }

      return res.status(200).json({ char });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "ID inválido." });
      }
      console.error("Erro em listChar:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  // Atualizar um personagem existente
  async updateChar(req: Request, res: Response) {
    try {
      const { id } = paramsSchema.parse(req.params);
      const body = charUpdateSchema.parse(req.body);

      const char = await prisma.character.update({
        where: { id },
        data: body,
      });

      return res.status(200).json({ char });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Dados inválidos." });
      }
      if ((error as any).code === 'P2025') { // Prisma: Registro não encontrado
        return res.status(404).json({ error: "Personagem não encontrado." });
      }
      console.error("Erro em updateChar:", error);
      return res.status(500).json({ error: "Erro ao atualizar o personagem." });
    }
  }

  // Criar um novo personagem
  async createChar(req: Request, res: Response) {
    try {
      const body = charCreateSchema.parse(req.body);

      const { name, age, bio, image, powers, domainExpansions } = body;

      const char = await prisma.character.create({
        data: {
          name,
          age,
          bio,
          image,
          powers: powers && powers.length > 0 ? {
            create: powers
          } : undefined,
          domainExpansions: domainExpansions && domainExpansions.length > 0 ? {
            create: domainExpansions
          } : undefined,
        },
        include: { powers: true, domainExpansions: true },
      });

      return res.status(201).json(char);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Dados inválidos." });
      }
      console.error("Erro em createChar:", error);
      return res.status(500).json({ error: "Erro ao criar o personagem." });
    }
  }

  // Deletar um personagem existente
  async deleteChar(req: Request, res: Response) {
    try {
      const { id } = paramsSchema.parse(req.params);
      const char = await prisma.character.delete({
        where: { id },
      });
      return res.status(200).json({ char });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "ID inválido." });
      }
      if ((error as any).code === 'P2025') { // Prisma: Registro não encontrado
        return res.status(404).json({ error: 'Personagem não encontrado.' });
      }
      console.error("Erro em deleteChar:", error);
      return res.status(500).json({ error: "Erro ao deletar o personagem." });
    }
  }
}

export default new CharController();

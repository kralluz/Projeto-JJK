import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { allchars } from "../data/characters";

const prisma = new PrismaClient();

class charController {
  constructor() {}

  // função para listar os personagens
  async listChars(req: Request, res: Response) {
    // paginação dos personagens
    const pageSchema = z.object({
      page: z.string().optional(),
    });

    // variavel para paginação inicializada com 1
    let { page = 1 } = pageSchema.parse(req.query);
    // converte a variavel page para number
    page = Number(page);

    // limite de personagens por pagina
    const limit = 6;

    // ultima pagina
    let lastPage = 1;

    // conta o total de personagens cadastrados
    const countChars = await prisma.character.count();

    // verifica se há personagens cadastrados
    if (countChars != 0) {
      // calcula o total de paginas
      lastPage = Math.ceil(countChars / limit);
    } else {
      // retorna uma mensagem caso não haja personagens cadastrados
      return res
        .status(200)
        .json({ message: "Não há personagens cadastrados" });
    }

    const allChars = await prisma.character.findMany({
      include: {
        powers: true,
        domainExpansions: true,
      },
      // verifica se a pagina é valida
      skip: page * limit - limit,
      // limite de personagens por pagina
      take: limit,
    });

    const pagination = {
      // caminho para a paginação
      path: "/characters",
      // pagina atual
      Current_Page: Number(page),
      // proxima pagina
      Next_Page: Number(page) < lastPage ? Number(page) + 1 : undefined,
      // pagina anterior
      prev_page: Number(page) > 1 ? Number(page) - 1 : undefined,
      // ultima pagina
      Last_Page: lastPage,
      // total de personagens
      total_Chars: countChars,
    };
    return res.status(200).json({ pagination, allChars });
  }

  // função para listar todos os personagens
  async listAllChars(req: Request, res: Response) {
    // lista todos os personagens
    const allChars = allchars;

    // retorna todos os personagens
    return res.status(200).json({ allChars });
  }

  // função para listar um personagem
  async listChar(req: Request, res: Response) {
    // verifica se o id é valido
    const paramsSchema = z.object({
      id: z.string().cuid(),
    });

    // verifica se o id é valido
    const { id } = paramsSchema.parse(req.params);

    // verifica se o personagem existe
    const char = await prisma.character.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        powers: true,
        domainExpansions: true,
      },
    });

    // retorna o personagem
    return res.status(200).json({ char });
  }

  //função para atualizar um personagem
  async updateChar(req: Request, res: Response) {
    // verifica se o id é valido
    const paramsSchema = z.object({
      id: z.string().cuid(),
    });

    // verifica se o id é valido
    const { id } = paramsSchema.parse(req.params);

    // verifica se o corpo da requisição é valido
    const bodySchema = z.object({
      name: z.string().min(3).max(255),
      age: z.number().min(0),
      image: z.string().min(3).max(255),
      bio: z.string().min(3).max(255),
    });
    const { name, age, bio, image } = bodySchema.parse(req.body);

    // verifica se o personagem existe
    const char = await prisma.character.update({
      where: { id },
      data: {
        name,
        age,
        bio,
        image,
      },
    });

    // retorna o personagem atualizado
    return res.status(200).json({ char });
  }

  // função para criar um personagem
  async createChar(req: Request, res: Response) {
    // verifica se o corpo da requisição é valido
    const domainExpansionsSchema = z.object({
      id: z.string().cuid(),
    });

    // verifica se o corpo da requisição é valido
    const powersSchema = z.object({
      id: z.string().cuid(),
    });

    // verifica se o corpo da requisição é valido
    const bodySchema = z.object({
      name: z.string().min(3).max(255),
      age: z.number().min(0),
      image: z.string().min(3).max(255),
      bio: z.string().min(3).max(255),
      powers: z.array(powersSchema),
      domainExpansions: z.array(domainExpansionsSchema),
    });

    if (!req.body) {
      return res
        .status(400)
        .json({ error: "Corpo da solicitação ausente ou inválido." });
    }

    try {
      const { name, age, bio, image, powers, domainExpansions } =
        bodySchema.parse(req.body);

      // verifica se o personagem já existe
      const char = await prisma.character.create({
        data: {
          name,
          age,
          bio,
          image,
          powers: {
            connect: powers,
          },
          domainExpansions: {
            connect: domainExpansions,
          },
        },
      });

      // retorna o personagem criado
      return res.status(201).json({
        name: char.name,
        age: char.age,
        bio: char.bio,
        image: char.image,
        powers: powers,
        domainExpansions: domainExpansions,
      });
    } catch (error) {
      // retorna erro caso não seja possivel criar o personagem
      console.error(error);
      return res
        .status(400)
        .json({ error: "Erro ao processar a solicitação." });
    }
  }

  async deleteChar(req: Request, res: Response) {
    // verifica se o id é valido
    const paramsSchema = z.object({
      id: z.string().cuid(),
    });

    // verifica se o id é valido
    const { id } = paramsSchema.parse(req.params);

    // verifica se o personagem existe
    const char = await prisma.character.delete({
      where: { id },
    });

    // retorna o personagem deletado
    return res.status(200).json({ char });
  }
}

export default new charController();

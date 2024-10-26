import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';


const prisma = new PrismaClient();


class powerController {

	// funcao para listar todos os poderes
	async listPowers(req:Request, res:Response) {

		// valida a varivel page
		const pagePowerSchema = z.object({
			page: z.string().optional(),
		});
	
		// paginação dos poderes
		let { page = 1} = pagePowerSchema.parse(req.query);
		page = Number(page);

		// limite de poderes por pagina
		const limitPowers = 6;

		// ultima pagina
		let lastPowerPage = 1;

		// conta o total de poderes cadastrados
		const countPowers = await prisma.powers.count();

		if(countPowers != 0){
			// calcula o total de paginas
			lastPowerPage = Math.ceil(countPowers / limitPowers);
		}else{
			// retorna uma mensagem caso não haja poderes cadastrados
			return res.status(200).json({message: 'Não há poderes cadastrados'});
		}

		// lista todos os poderes
		const allPowers = await prisma.powers.findMany({
			// lista os personagens que possuem o poder
			include: {
				Character: true,
			},
			// verifica se a pagina é valida
			skip: (page * limitPowers)-limitPowers,
			// limite de poderes por pagina
			take: limitPowers,
		});

		// retorna todos os poderes
		const paginationPowers = {
			// caminho para a paginação
			path: '/powers',
			// pagina atual
			Current_Page: Number(page),
			// proxima pagina
			Next_Page: Number(page) < lastPowerPage ? Number(page) + 1 : undefined,
			// pagina anterior
			prev_page: Number(page) > 1 ? Number(page) - 1 : undefined,
			// ultima pagina
			Last_Page: lastPowerPage,
			// total de poderes
			Total_Powers: countPowers,
		};
		return res.status(200).json({paginationPowers,allPowers});
	}

	// funcao para listar um poder
	async listPower(req:Request, res:Response) {
		
		// verifica se o id é valido
		const paramsSchema = z.object({
			id: z.string().cuid(),
		});

		// verifica se o id é valido
		const { id } = paramsSchema.parse(req.params);

		// verifica se o poder existe
		const power = await prisma.powers.findUnique({
			where: {
				id,
			},
		});

		// retorna o poder
		return res.status(200).json({power});
	}
	// funcao para atualizar um poder
	async updatePower(req:Request, res:Response) {

		// verifica se o id é valido
		const paramsSchema = z.object({
			id: z.string().cuid()
		});

		// verifica se o id é valido
		const {id} = paramsSchema.parse(req.params);


		// verifica se o corpo da requisição é valido
		const bodySchema = z.object({
			name: z.string().min(3).max(255),
			description: z.string().min(3).max(255)
		});


		//verifica se o corpo da requisição é valido
		const {name, description}= bodySchema.parse(req.body);
		
		// verifica se o poder existe
		const power = await prisma.powers.update({
			where: {
				id
			},
			data: {
				name, 
				description
			}
		});

		// retorna o poder atualizado
		return res.status(200).json({power});
	}

	// funcao para criar um poder
	async createPower(req:Request,res: Response){
		// verifica se o corpo da requisição é valido
		const bodyPowerSchema = z.object({
			name: z.string().min(3).max(255),
			description: z.string().min(3).max(255),
		});

		// verifica se o corpo da requisição é valido
		const { name, description } = bodyPowerSchema.parse(req.body);

		// cria o poder
		const power = await prisma.powers.create({
			data: {
				name,
				description,
			}
		});

		// retorna o poder criado
		return res.status(201).json({power});
	}


	// funcao para deletar um poder	
	async deletePower (req:Request, res:Response) {
		const paramsPowerSchema = z.object({
			id: z.string().cuid(),
		});

		// verifica se o id é valido
		const { id } = paramsPowerSchema.parse(req.params);


		// verifica se o poder existe
		const power = await prisma.powers.delete({
			where: {
				id
			}
		});

		// retorna o poder deletado
		return res.status(200).json({power});
	}
}


export default new powerController;

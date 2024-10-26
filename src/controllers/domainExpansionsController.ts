import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

class domainsExpansionController {

	constructor() {}
 
	// função para listar todos os domínios de expansão
	async listAllDomainsExpansion(req:Request, res:Response) {

		// valida a variavel page
		const pageDomainSchema = z.object({
			page: z.string().optional(),
		});

		// variavel para paginação inicializada com 1
		let {page = 1} = pageDomainSchema.parse(req.query);
		// converte a variavel page para number
		page = Number(page);

		// limite de domínios de expansão por pagina
		const limitDomains = 10;

		// ultima pagina
		let lastDomainPage = 1;

		// conta o total de domínios de expansão cadastrados
		const countDomains = await prisma.domainExpansion.count();

		// verifica se há domínios de expansão cadastrados
		if(countDomains != 0){
			// calcula o total de paginas
			lastDomainPage = Math.ceil(countDomains / limitDomains);
		}else{
			// retorna uma mensagem caso não haja domínios de expansão cadastrados
			return res.status(200).json({message: 'Não há domínios de expansão cadastrados'});
		}

		// lista todos os domínios de expansão
		const allDomainsExpansion = await prisma.domainExpansion.findMany({
			include: {
				// lista os personagens que possuem o domínio de expansão
				Character: {
					// seleciona apenas o nome do personagem
					select: {
						name: true,
					}
				}
			},
			skip: (page * limitDomains)-limitDomains,
			// limite de domínios de expansão por pagina
			take: limitDomains,
		});
		const paginationDomains = {	
			// caminho para a paginação
			path: '/DomainsExpansion',
			// pagina atual
			Current_Page: Number(page),
			// proxima pagina
			Next_Page: Number(page) < lastDomainPage? Number(page) + 1 : undefined,
			// pagina anterior
			prev_page: Number(page) > 1 ? Number(page) - 1 : undefined,
			// ultima pagina
			Last_Page: lastDomainPage,
			// total de personagens
			total_Domains: countDomains,
		};
		// retorna todos os domínios de expansão
		return res.status(200).json({paginationDomains,allDomainsExpansion});
	}

	// função para listar um domínio de expansão
	async listDomainsExpansion(req:Request, res:Response){

		// verifica se o id é valido
		const paramsSchema = z.object({
			id: z.string().cuid(),
		});

		const {id} = paramsSchema.parse(req.params);

		// verifica se o domínio de expansão existe
		const domainsExpansion = await prisma.domainExpansion.findUniqueOrThrow({
			where: {
				id,
			},
			include: {
				Character: true,
			}
		});

		// retorna o domínio de expansão
		return res.status(200).json({domainsExpansion});
	}

	//função para criar um domínio de expansão
	async createDomainExpansion(res:Response, req:Request){
		
		// verifica se o corpo da requisição é valido
		const bodySchema = z.object({
			name: z.string().min(3).max(255),
			description: z.string().min(3).max(255),
		});

		// verifica se o corpo da requisição é valido
		const {name, description,} = bodySchema.parse(req.body);

		// cria o domínio de expansão
		const newDomainExpansion = await prisma.domainExpansion.create({
			data: {
				name,
				description,
			}
		});

		// retorna o domínio de expansão criado
		return res.status(201).json({newDomainExpansion});
	}
}


export default new domainsExpansionController();
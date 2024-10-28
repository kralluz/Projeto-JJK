import { Request, Response } from 'express';
import { z } from 'zod';

import prisma from '../client';


const pagePowerSchema = z.object({
	page: z.string().optional(),
});

const paramsSchema = z.object({
	id: z.string().cuid(),
});

const powerCreateSchema = z.object({
	name: z.string().min(3).max(255),
	description: z.string().min(3).max(255),
});

const powerUpdateSchema = z.object({
	name: z.string().min(3).max(255),
	description: z.string().min(3).max(255),
});

class PowerController {
	async listPowers(req: Request, res: Response) {
		const { page = "1" } = pagePowerSchema.parse(req.query);
		const currentPage = Number(page);
		const limit = 6;
		const countPowers = await prisma.powers.count();

		if (countPowers === 0) {
			return res.status(200).json({ message: 'Não há poderes cadastrados' });
		}

		const lastPage = Math.ceil(countPowers / limit);
		const allPowers = await prisma.powers.findMany({
			include: { Character: true },
			skip: (currentPage - 1) * limit,
			take: limit,
		});

		const pagination = {
			path: '/powers',
			Current_Page: currentPage,
			Next_Page: currentPage < lastPage ? currentPage + 1 : undefined,
			prev_page: currentPage > 1 ? currentPage - 1 : undefined,
			Last_Page: lastPage,
			Total_Powers: countPowers,
		};

		return res.status(200).json({ pagination, allPowers });
	}

	async listPower(req: Request, res: Response) {
		const { id } = paramsSchema.parse(req.params);
		const power = await prisma.powers.findUnique({
			where: { id },
			include: { Character: true },
		});

		if (!power) {
			return res.status(404).json({ message: 'Poder não encontrado' });
		}

		return res.status(200).json({ power });
	}

	async updatePower(req: Request, res: Response) {
		const { id } = paramsSchema.parse(req.params);
		const body = powerUpdateSchema.safeParse(req.body);

		if (!body.success) {
			return res.status(400).json({ error: 'Dados inválidos.' });
		}

		try {
			const updatedPower = await prisma.powers.update({
				where: { id },
				data: body.data,
			});
			return res.status(200).json({ power: updatedPower });
		} catch (error) {
			return res.status(400).json({ error: 'Erro ao atualizar o poder.' });
		}
	}

	async createPower(req: Request, res: Response) {
		const body = powerCreateSchema.safeParse(req.body);
		if (!body.success) {
			return res.status(400).json({ error: 'Dados inválidos.' });
		}

		try {
			const newPower = await prisma.powers.create({
				data: body.data,
			});
			return res.status(201).json({ power: newPower });
		} catch (error) {
			return res.status(400).json({ error: 'Erro ao criar o poder.' });
		}
	}

	async deletePower(req: Request, res: Response) {
		const { id } = paramsSchema.parse(req.params);

		try {
			const deletedPower = await prisma.powers.delete({
				where: { id },
			});
			return res.status(200).json({ power: deletedPower });
		} catch (error) {
			return res.status(404).json({ error: 'Poder não encontrado.' });
		}
	}
}

export default new PowerController();

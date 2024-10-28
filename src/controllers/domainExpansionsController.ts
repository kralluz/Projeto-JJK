// src/controllers/domainExpansionsController.ts

import { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import prisma from '../client';

const pageDomainSchema = z.object({
    page: z.string().optional(),
});

const paramsSchema = z.object({
    id: z.string().cuid(),
});

const domainCreateSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
});

class DomainsExpansionController {
    async listAllDomainsExpansion(req: Request, res: Response) {
        try {
            const { page = "1" } = pageDomainSchema.parse(req.query);
            const currentPage = Number(page);
            const limit = 10;
            const countDomains = await prisma.domainExpansion.count();

            if (countDomains === 0) {
                return res.status(200).json({ message: 'Não há domínios de expansão cadastrados' });
            }

            const lastPage = Math.ceil(countDomains / limit);
            const allDomainsExpansion = await prisma.domainExpansion.findMany({
                include: { Character: { select: { name: true } } },
                skip: (currentPage - 1) * limit,
                take: limit,
            });

            const pagination = {
                path: '/domainExpansions',
                Current_Page: currentPage,
                Next_Page: currentPage < lastPage ? currentPage + 1 : undefined,
                prev_page: currentPage > 1 ? currentPage - 1 : undefined,
                Last_Page: lastPage,
                total_Domains: countDomains,
            };

            return res.status(200).json({ pagination, allDomainsExpansion });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ error: 'Parâmetros inválidos.' });
            }
            console.error("Erro em listAllDomainsExpansion:", error);
            return res.status(500).json({ error: 'Erro no servidor.' });
        }
    }

    async createDomainExpansion(req: Request, res: Response) {
        const body = domainCreateSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({ error: 'Dados inválidos.' });
        }

        try {
            const { name, description } = body.data;
            const newDomain = await prisma.domainExpansion.create({
                data: { name, description },
            });
            return res.status(201).json(newDomain);
        } catch (error) {
            console.error("Erro em createDomainExpansion:", error);
            return res.status(400).json({ error: 'Erro ao criar o domínio de expansão.' });
        }
    }
}

export default new DomainsExpansionController();

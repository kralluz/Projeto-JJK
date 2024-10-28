// src/tests/charController.test.ts

import request from 'supertest';
import prisma from '../client';
import app from '../serve';

describe('Character Routes', () => {
    let characterId: string;
    let powerId: string;
    let domainExpansionId: string;

    // Antes de todos os testes, limpar o banco de dados
    beforeAll(async () => {
        await prisma.domainExpansion.deleteMany();
        await prisma.powers.deleteMany();
        await prisma.character.deleteMany();
    });

    // Após todos os testes, limpar os dados criados e desconectar o Prisma
    afterAll(async () => {
        await prisma.character.deleteMany();
        await prisma.powers.deleteMany();
        await prisma.domainExpansion.deleteMany();
        await prisma.$disconnect();
    });

    // Popular o banco de dados antes dos testes que precisam de dados
    beforeEach(async () => {
        // Criar um poder e uma expansão de domínio
        const power = await prisma.powers.create({
            data: { name: 'Super Strength', description: 'Incredible strength' },
        });
        powerId = power.id;

        const domain = await prisma.domainExpansion.create({
            data: { name: 'Space Domain', description: 'Control over space' },
        });
        domainExpansionId = domain.id;

        // Criar um personagem
        const character = await prisma.character.create({
            data: {
                name: 'Test Character',
                age: 25,
                bio: 'A test character',
                image: 'http://example.com/image.png',
                powers: {
                    connect: { id: powerId },
                },
                domainExpansions: {
                    connect: { id: domainExpansionId },
                },
            },
        });
        characterId = character.id; // Salvar o ID do personagem criado para uso posterior
    });

    // Testes para a rota POST /character
    describe('POST /character', () => {
        it('Deve criar um novo personagem', async () => {
            const res = await request(app)
                .post('/character')
                .send({
                    name: 'Another Test Character',
                    age: 30,
                    image: 'http://example.com/another-image.png',
                    bio: 'Another test character',
                    powers: [
                        { name: 'Flight', description: 'Ability to fly' },
                    ],
                    domainExpansions: [
                        { name: 'Time Domain', description: 'Manipulation of time' },
                    ],
                });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.name).toBe('Another Test Character');
            expect(res.body.powers.length).toBe(1);
            expect(res.body.domainExpansions.length).toBe(1);
        });

        it('Deve retornar 400 para dados inválidos', async () => {
            const res = await request(app)
                .post('/character')
                .send({
                    name: 'Te', // Nome muito curto
                    age: -5, // Idade inválida
                    image: 'img', // URL inválida
                    bio: 'bi', // Bio muito curta
                    powers: [{ name: '', description: '' }], // Dados inválidos
                    domainExpansions: [{ name: '', description: '' }], // Dados inválidos
                });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error');
        });
    });

    // Testes para a rota GET /characters com paginação
    describe('GET /characters', () => {
        it('Deve listar personagens com paginação', async () => {
            const res = await request(app).get('/characters?page=1');

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('pagination');
            expect(res.body).toHaveProperty('allChars');
            expect(Array.isArray(res.body.allChars)).toBe(true);
            expect(res.body.allChars.length).toBeGreaterThan(0); // Deve ter pelo menos um personagem
        });
    });

    // Testes para a rota GET /allCharacters
    describe('GET /allCharacters', () => {
        it('Deve listar todos os personagens', async () => {
            const res = await request(app).get('/allCharacters');

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0); // Deve ter pelo menos um personagem
        });
    });

    // Testes para a rota GET /characters/:id
    describe('GET /characters/:id', () => {
        it('Deve obter um personagem pelo ID', async () => {
            const res = await request(app).get(`/characters/${characterId}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('char');
            expect(res.body.char.id).toBe(characterId);
        });

        it('Deve retornar 400 para ID inválido', async () => {
            const res = await request(app).get('/characters/invalid-uuid');

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error', 'ID inválido.');
        });

        it('Deve retornar 404 para personagem não encontrado', async () => {
            const res = await request(app).get('/characters/00000000-0000-0000-0000-000000000000'); // UUID inexistente

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('error', 'Personagem não encontrado.');
        });
    });

    // Testes para a rota PUT /character/:id
    describe('PUT /character/:id', () => {
        it('Deve atualizar um personagem existente', async () => {
            const res = await request(app)
                .put(`/character/${characterId}`)
                .send({
                    name: 'Updated Character',
                    age: 30,
                    image: 'http://example.com/newimage.png',
                    bio: 'An updated test character',
                });

            expect(res.status).toBe(200);
            expect(res.body.char.name).toBe('Updated Character');
            expect(res.body.char.age).toBe(30);
        });

        it('Deve retornar 400 para dados inválidos na atualização', async () => {
            const res = await request(app)
                .put(`/character/${characterId}`)
                .send({
                    name: 'Up', // Nome muito curto
                    age: -10, // Idade inválida
                    image: 'im', // URL inválida
                    bio: 'bi', // Bio muito curta
                });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error');
        });
    });

    // Testes para a rota DELETE /character/:id
    describe('DELETE /character/:id', () => {
        it('Deve deletar um personagem existente', async () => {
            const res = await request(app).delete(`/character/${characterId}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('char');
            expect(res.body.char.id).toBe(characterId);
        });

        it('Deve retornar 404 ao tentar deletar um personagem inexistente', async () => {
            const nonExistentId = '00000000-0000-0000-0000-000000000000'; // UUID que você sabe que não existe
            const res = await request(app).delete(`/character/${nonExistentId}`);

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('error', 'Personagem não encontrado.');
        });

    });

});

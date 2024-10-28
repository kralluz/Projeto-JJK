// src/tests/domainExpansionsController.test.ts
import request from 'supertest';
import app from '../serve'; // assumindo que o app express é exportado de app.ts
import prisma from '../client';

let character: any;

describe('DomainsExpansionController', () => {
  beforeAll(async () => {
    // Limpa o banco antes dos testes
    await prisma.domainExpansion.deleteMany();
    await prisma.character.deleteMany();

    // Popula o banco com dados para testes
    character = await prisma.character.create({
      data: {
        id: 'character1',
        name: 'Nome do Personagem',
        age: 30,
        bio: 'Uma breve biografia do personagem.',
        image: 'url_da_imagem.jpg',
        powers: {
            create: [
                {
                    name: 'Super Força',
                    description: 'Capacidade de levantar objetos pesados.',
                },
                {
                    name: 'Voo',
                    description: 'Habilidade de voar em alta velocidade.',
                },
            ],
        },
        domainExpansions: {
            create: [
                {
                    name: 'Domínio do Poder',
                    description: 'Expansão que aumenta as habilidades do personagem.',
                },
            ],
        },
      },
    });

  });

  afterAll(async () => {
    // Limpa o banco após os testes
    await prisma.domainExpansion.deleteMany();
    await prisma.character.deleteMany();
    await prisma.$disconnect();
  });

  describe('GET /domainExpansions', () => {
    it('deve listar todos os domínios de expansão com paginação', async () => {
      const response = await request(app).get('/domainExpansions?page=1');
      expect(response.status).toBe(200);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.allDomainsExpansion.length).toBeGreaterThan(0);
    });

    it('deve retornar mensagem quando não houver domínios de expansão', async () => {
      // Limpa o banco para esse teste
      await prisma.domainExpansion.deleteMany();

      const response = await request(app).get('/domainExpansions?page=1');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Não há domínios de expansão cadastrados');
    });
  });

  describe('POST /domainExpansions', () => {
    it('deve criar um novo domínio de expansão', async () => {
      const response = await request(app)
        .post('/domainExpansions')
        .send({
          name: 'Novo Domínio',
          description: 'Descrição do novo domínio',
        });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', 'Novo Domínio');
    });

    it('deve retornar erro 400 se os dados forem inválidos', async () => {
      const response = await request(app)
        .post('/domainExpansions')
        .send({
          name: 'ND',
          description: '',
        });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Dados inválidos.');
    });
  });
});

import request from 'supertest';
import prisma from '../client';
import app from '../serve';

describe('Power Routes', () => {
  let powerId: string;

  afterAll(async () => {
    await prisma.character.deleteMany();
    await prisma.powers.deleteMany();
    await prisma.domainExpansion.deleteMany();
    await prisma.$disconnect();
  });

  describe('POST /power', () => {
    it('Deve criar um novo poder', async () => {
      const res = await request(app)
        .post('/power')
        .send({
          name: 'Flight',
          description: 'Ability to fly',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Flight');
      powerId = res.body.id;
    });

    it('Deve retornar 400 para dados inválidos', async () => {
      const res = await request(app)
        .post('/power')
        .send({
          name: 'Fl', // Nome muito curto
          description: 'Ab', // Descrição muito curta
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /powers', () => {
    it('Deve listar poderes com paginação', async () => {
      const res = await request(app).get('/powers?page=1');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('pagination');
      expect(res.body).toHaveProperty('allPowers');
      expect(Array.isArray(res.body.allPowers)).toBe(true);
    });
  });

  describe('GET /power/:id', () => {
    it('Deve obter um poder pelo ID', async () => {
      const res = await request(app).get(`/power/${powerId}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('power');
      expect(res.body.power.id).toBe(powerId);
    });

    it('Deve retornar 400 para ID inválido', async () => {
      const res = await request(app).get('/power/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('Deve retornar 404 para poder não encontrado', async () => {
      const res = await request(app).get('/power/cuidnonexistentid12345');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('PUT /power/:id', () => {
    it('Deve atualizar um poder existente', async () => {
      const res = await request(app)
        .put(`/power/${powerId}`)
        .send({
          name: 'Super Flight',
          description: 'Enhanced ability to fly',
        });

      expect(res.status).toBe(200);
      expect(res.body.power.name).toBe('Super Flight');
      expect(res.body.power.description).toBe('Enhanced ability to fly');
    });

    it('Deve retornar 400 para dados inválidos na atualização', async () => {
      const res = await request(app)
        .put(`/power/${powerId}`)
        .send({
          name: 'Su', // Nome muito curto
          description: 'En', // Descrição muito curta
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('DELETE /power/:id', () => {
    it('Deve deletar um poder existente', async () => {
      const res = await request(app).delete(`/power/${powerId}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('power');
      expect(res.body.power.id).toBe(powerId);
    });

    it('Deve retornar 404 ao tentar deletar um poder inexistente', async () => {
      const res = await request(app).delete(`/power/${powerId}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});

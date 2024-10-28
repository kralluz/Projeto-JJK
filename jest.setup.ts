import prisma from './src/client';

beforeAll(async () => {
    // Opcional: Configurações iniciais, como semear dados
});

afterEach(async () => {
    // Limpar tabelas após cada teste para evitar poluição
    await prisma.character.deleteMany();
    await prisma.powers.deleteMany();
    await prisma.domainExpansion.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});

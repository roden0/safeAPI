import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', async (_request, reply) => {
    // Check DB connection
    let dbUp = false;
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbUp = true;
    } catch (err) {
      dbUp = false;
    }
    reply.send({
      timestamp: new Date().toISOString(),
      dbUp,
    });
  });
}

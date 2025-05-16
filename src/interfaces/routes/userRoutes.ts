import { FastifyInstance } from 'fastify';
import { PrismaUserRepository } from '../../infrastructure/models/PrismaUserRepository.js';
import { UserUseCases } from '../../application/useCases/UserUseCases.js';
import { validateWithZod } from '../middleware/validateWithZod.js';
import { userIdParamSchema } from '../validators/paramsValidator.js';
import { userCreateSchema } from '../validators/userValidator.js';
import { UserController } from '../controllers/UserController.js';

export async function userRoutes(fastify: FastifyInstance) {
  const repo = new PrismaUserRepository();
  const useCases = new UserUseCases(repo);
  const controller = new UserController(useCases);


  fastify.get('/users', controller.getUsers);

  fastify.register(async function (userGroup) {
    userGroup.get('/user/:id', { preHandler: validateWithZod({ params: userIdParamSchema }) }, controller.getUser);
    userGroup.put('/user/:id', { preHandler: validateWithZod({ params: userIdParamSchema, body: userCreateSchema }) }, controller.createUser);
    userGroup.put('/user/:id', { preHandler: validateWithZod({ params: userIdParamSchema }) }, controller.updateUser);
    userGroup.delete('/user/:id', { preHandler: validateWithZod({ params: userIdParamSchema }) }, controller.deleteUser);
  });
}

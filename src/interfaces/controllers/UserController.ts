import { FastifyReply, FastifyRequest } from 'fastify';
import { UserUseCases } from '../../application/useCases/UserUseCases.js';
import { userCreateSchema, userUpdateSchema } from '../validators/userValidator.js';

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  /**
   * avatar is required in request.body
   */
  createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as any;
    // UUID v7 regex: ^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
    const uuidV7Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidV7Regex.test(id)) {
      return reply.code(400).send({ message: 'Invalid id: must be a UUID v7' });
    }
    const parse = userCreateSchema.safeParse(request.body);
    if (!parse.success) {
      return reply.code(400).send({ message: 'Invalid user data', errors: parse.error.errors });
    }
    // Merge id into user data
    const userData = { ...parse.data, id };
    const user = await this.userUseCases.createUser(userData);
    return reply.code(201).send(user);
  };
  getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const email = request.query && (request.query as any).email;
    if (email) {
      const user = await this.userUseCases.getUserByEmail(email);
      if (!user) return reply.code(404).send({ message: 'User not found' });
      return reply.send(user);
    }
    const { id } = request.params as any;
    const user = await this.userUseCases.getUser(id);
    if (!user) return reply.code(404).send({ message: 'User not found' });
    return reply.send(user);
  };
  getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    const page = request.query && (request.query as any).page ? parseInt((request.query as any).page, 10) : undefined;
    const pageSize = request.query && (request.query as any).pageSize ? parseInt((request.query as any).pageSize, 10) : 10;
    if (page) {
      const { users, total } = await this.userUseCases.getUsersPaginated(page, pageSize);
      return reply.send({ users, total, page, pageSize });
    } else {
      const users = await this.userUseCases.getUsers();
      return reply.send(users);
    }
  };

  /**
   * avatar can be updated in request.body
   */
  updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const parse = userUpdateSchema.safeParse(request.body);
    if (!parse.success) {
      return reply.code(400).send({ message: 'Invalid user data', errors: parse.error.errors });
    }
    const { id } = request.params as any;
    const user = await this.userUseCases.updateUser(id, parse.data);
    if (!user) return reply.code(404).send({ message: 'User not found' });
    return reply.send(user);
  };
  deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as any;
    const ok = await this.userUseCases.deleteUser(id);
    if (!ok) return reply.code(404).send({ message: 'User not found' });
    return reply.code(204).send();
  };
}

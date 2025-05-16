import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../domain/repositories/UserRepository.js';
import { User } from '../../domain/entities/User.js';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async create(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    // avatar is required
    return prisma.user.create({ data: user });
  }
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findAllPaginated(page: number, pageSize: number): Promise<{ users: User[]; total: number }> {
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);
    return { users, total };
  }
  async update(id: string, user: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null> {
    return prisma.user.update({ where: { id }, data: user });
  }
  async delete(id: string): Promise<boolean> {
    const res = await prisma.user.delete({ where: { id } });
    return !!res;
  }
}

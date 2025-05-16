import { User } from '../entities/User.js';

export interface UserRepository {
  /**
   * Create a user. Requires: email, name, avatar
   */
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  /**
   * Paginated fetch of users
   */
  findAllPaginated(page: number, pageSize: number): Promise<{ users: User[]; total: number }>;
  /**
   * Update a user. Can update: email, name, avatar
   */
  update(id: string, user: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

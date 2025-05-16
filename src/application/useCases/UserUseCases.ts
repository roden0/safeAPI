import { UserRepository } from '../../domain/repositories/UserRepository.js';
import { User } from '../../domain/entities/User.js';

export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  /**
   * avatar is required
   */
  createUser(data: Omit<User, 'id' | 'createdAt'>) {
    return this.userRepository.create(data);
  }
  getUser(id: string) {
    return this.userRepository.findById(id);
  }
  getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
  getUsers() {
    return this.userRepository.findAll();
  }
  getUsersPaginated(page: number, pageSize: number) {
    return this.userRepository.findAllPaginated(page, pageSize);
  }
  updateUser(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>) {
    return this.userRepository.update(id, data);
  }
  deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}

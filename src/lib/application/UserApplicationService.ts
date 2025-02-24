import User from "../domain/user/User";
import type UserRepository from "../domain/user/UserRepository";
import PostgresUserRepository from "../infrastructure/db/repository/PostgresUserRepository";

export default class UserApplicationService {
  constructor(
    private readonly userRepository: UserRepository = new PostgresUserRepository()
  ) {}

  async getUser(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async createUser(email: string): Promise<User> {
    return await this.userRepository.createUser(email);
  }
}

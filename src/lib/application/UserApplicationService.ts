import User from "../domain/user/User";
import UserRepository from "../domain/user/UserRepository";
import PostgresUserRepository from "../infrastructure/db/repository/PostgresUserRepository";

export default class UserApplicationService {
  constructor(
    private readonly userRepository: UserRepository = new PostgresUserRepository()
  ) {}

  async getUser(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
}

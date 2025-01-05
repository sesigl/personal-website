import User from "./User";

export default interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
}

import type { User } from "../../../../domain/interfaces/Iuser.interface";
import type { UserRepository } from "../../../../domain/repositoires/user.respository";

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async getByID(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }

  async getEmail(email: string): Promise<User> {
    return this.userRepository.getUserByEmail(email);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}

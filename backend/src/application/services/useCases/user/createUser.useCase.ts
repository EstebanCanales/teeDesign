import type { User } from "../../../../domain/interfaces/Iuser.interface";
import type { UserRepository } from "../../../../domain/repositories/user.repository";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    return this.userRepository.createUser(user);
  }
}

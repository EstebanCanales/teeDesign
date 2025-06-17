import type { UserRepository } from "../../../../domain/repositoires/user.respository";

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}

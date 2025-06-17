import { UserRepository } from "../../domain/repositoires/user.repository";
import type { IUser } from "../../domain/schemas/user.schema";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await this.userRepository.findById(id);
  }

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    // Asegurarse de que no se pueda actualizar el rol del usuario
    if (userData.role) {
      delete userData.role;
    }
    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.delete(id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.findAll();
  }
} 
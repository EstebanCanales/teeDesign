import type { User } from "../interfaces/Iuser.interface";

export interface UserRepository {
  getUserById(id: string): Promise<User>;
  getAll(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User>;
  updateUser(user: User): Promise<User>;
  createUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

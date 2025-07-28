import { UserModel } from "../schemas/user.schema";
import type { IUser } from "../schemas/user.schema";

export class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    console.log("[UserRepository] Creando usuario", userData);
    const user = new UserModel(userData);
    try {
      const saved = await user.save();
      console.log("[UserRepository] Usuario guardado", saved.toObject());
      return saved;
    } catch (error) {
      console.error("[UserRepository] Error al guardar usuario", error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    console.log("[UserRepository] Buscando usuario por email", email);
    return await UserModel.findOne({ email }).select("+password");
  }

  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  async findAll(): Promise<IUser[]> {
    return await UserModel.find();
  }
} 
import { UserModel } from "../schemas/user.schema";
import type { IUser } from "../schemas/user.schema";

export class UserRepository {
  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async findByEmail(email: string): Promise<IUser | null> {
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
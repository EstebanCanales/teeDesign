import { DiferentesModel } from "../schemas/design.schema";
import type { IDesign } from "../schemas/design.schema";
import mongoose from "mongoose";

export class DesignRepository {
  async create(designData: Partial<IDesign>): Promise<IDesign> {
    const design = new DiferentesModel(designData);
    return await design.save();
  }

  async findById(id: string): Promise<IDesign | null> {
    return await DiferentesModel.findById(id);
  }

  async findByUser(userId: string): Promise<IDesign[]> {
    return await DiferentesModel.find({ user: new mongoose.Types.ObjectId(userId) });
  }

  async update(id: string, designData: Partial<IDesign>): Promise<IDesign | null> {
    return await DiferentesModel.findByIdAndUpdate(id, designData, {
      new: true,
      runValidators: true
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await DiferentesModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  async findAll(isPublic: boolean = true): Promise<IDesign[]> {
    return await DiferentesModel.find({ isPublic }).populate("user", "name");
  }

  async searchByName(query: string): Promise<IDesign[]> {
    return await DiferentesModel.find(
      { $text: { $search: query }, isPublic: true }
    ).populate("user", "name");
  }
} 
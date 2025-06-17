import { DesignRepository } from "../../domain/repositories/design.repository";
import type { IDesign } from "../../domain/schemas/design.schema";

export class DesignService {
  private readonly designRepository: DesignRepository;

  constructor() {
    this.designRepository = new DesignRepository();
  }

  async createDesign(designData: Partial<IDesign>): Promise<IDesign> {
    return await this.designRepository.create(designData);
  }

  async getDesignById(id: string): Promise<IDesign | null> {
    return await this.designRepository.findById(id);
  }

  async getDesignsByUser(userId: string): Promise<IDesign[]> {
    return await this.designRepository.findByUser(userId);
  }

  async updateDesign(id: string, designData: Partial<IDesign>): Promise<IDesign | null> {
    return await this.designRepository.update(id, designData);
  }

  async deleteDesign(id: string): Promise<boolean> {
    return await this.designRepository.delete(id);
  }

  async getAllPublicDesigns(): Promise<IDesign[]> {
    return await this.designRepository.findAll(true);
  }

  async searchDesigns(query: string): Promise<IDesign[]> {
    return await this.designRepository.searchByName(query);
  }

  // Verifica si un usuario es dueño de un diseño específico
  async isDesignOwner(designId: string, userId: string): Promise<boolean> {
    const design = await this.designRepository.findById(designId);
    if (!design) return false;
    return design.user.toString() === userId;
  }
} 
import type { TeeDesignRepository } from "../../../../domain/repositoires/teeDesign.respository";
import type { TeeDesign } from "../../../../domain/interfaces/IteeDesign.interface";

export class GetTeeDesign {
  constructor(private teeDesignRepository: TeeDesignRepository) {}
  async getByID(id: string): Promise<TeeDesign> {
    return this.teeDesignRepository.getTeeDesignById(id);
  }

  async getAll(): Promise<TeeDesign[]> {
    return this.teeDesignRepository.getAll();
  }
}

import type { TeeDesignRepository } from "../../../../domain/repositoires/teeDesign.respository";
import type { TeeDesign } from "../../../../domain/interfaces/IteeDesign.interface";

export class CreateTeeDesign {
  constructor(private teeDesignRepository: TeeDesignRepository) {}
  async execute(teeDesign: TeeDesign): Promise<TeeDesign> {
    return this.teeDesignRepository.createTeeDesign(teeDesign);
  }
}

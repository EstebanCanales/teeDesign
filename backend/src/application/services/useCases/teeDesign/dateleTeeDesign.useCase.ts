import type { TeeDesignRepository } from "../../../../domain/repositories/teeDesign.repository";

export class DateleTeeDesignUseCase {
  constructor(private teeDesignRepository: TeeDesignRepository) {}

  async execute(id: string): Promise<void> {
    return this.teeDesignRepository.delete(id);
  }
}

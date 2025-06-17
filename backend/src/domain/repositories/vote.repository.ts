import type { TeeDesign } from "../interfaces/IteeDesign.interface";

export interface TeeDesignRepository {
  getTeeDesignById(id: string): Promise<TeeDesign>;
  createTeeDesign(teeDesign: TeeDesign): Promise<TeeDesign>;
  updateTeeDesign(teeDesign: TeeDesign): Promise<TeeDesign>;
  deleteTeeDesign(id: string): Promise<void>;
}

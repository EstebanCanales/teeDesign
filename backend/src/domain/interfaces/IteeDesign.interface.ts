import type { User } from "./Iuser.interface";
import type { Vote } from "./Ivote.interface";

export interface TeeDesign {
  id?: string;
  creador: User;
  torsoColor: string;
  mangaIzqColor: string;
  mangaDerColor: string;
  cuelloColor: string;
  fechaCreacion: Date;
  votos: Vote[];
  calificacion: number;
}

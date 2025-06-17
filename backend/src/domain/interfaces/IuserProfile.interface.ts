import type { User } from "./Iuser.interface";

export interface UserProfile {
  id?: string;
  usuario: User;
  rutaArchivo: string;
  fechaSubida: Date;
}

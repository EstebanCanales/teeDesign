import type { Request, Response } from "express";
import { UserService } from "../../application/services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado"
        });
        return;
      }

      const user = await this.userService.getUserById(req.user.id);
      
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "Usuario no encontrado"
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: { user }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener el perfil del usuario"
      });
    }
  };

  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado"
        });
        return;
      }

      const { name, email } = req.body;
      
      // Validación básica
      if (!name && !email) {
        res.status(400).json({
          status: "error",
          message: "Debe proporcionar al menos un campo para actualizar"
        });
        return;
      }

      const updateData: Record<string, string> = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;

      const updatedUser = await this.userService.updateUser(req.user.id, updateData);

      if (!updatedUser) {
        res.status(404).json({
          status: "error",
          message: "Usuario no encontrado"
        });
        return;
      }

      res.status(200).json({
        status: "success",
        message: "Perfil actualizado con éxito",
        data: { user: updatedUser }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al actualizar el perfil del usuario"
      });
    }
  };

  // Solo para administradores
  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.user?.role !== "admin") {
        res.status(403).json({
          status: "error",
          message: "Acceso denegado"
        });
        return;
      }

      const users = await this.userService.getAllUsers();

      res.status(200).json({
        status: "success",
        data: { users }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener la lista de usuarios"
      });
    }
  };

  // Solo para administradores
  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.user?.role !== "admin") {
        res.status(403).json({
          status: "error",
          message: "Acceso denegado"
        });
        return;
      }

      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          status: "error",
          message: "ID de usuario requerido"
        });
        return;
      }

      const result = await this.userService.deleteUser(userId);

      if (!result) {
        res.status(404).json({
          status: "error",
          message: "Usuario no encontrado"
        });
        return;
      }

      res.status(200).json({
        status: "success",
        message: "Usuario eliminado con éxito"
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al eliminar el usuario"
      });
    }
  };
} 
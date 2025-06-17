import type { Request, Response } from "express";
import { AuthService } from "../../application/services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      // Validación básica
      if (!name || !email || !password) {
        res.status(400).json({ 
          message: "Todos los campos son requeridos (nombre, email, contraseña)" 
        });
        return;
      }

      const result = await this.authService.register({ name, email, password });
      
      res.status(201).json({
        status: "success",
        message: "Usuario registrado con éxito",
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          status: "error",
          message: error.message
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "Error del servidor durante el registro"
        });
      }
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Validación básica
      if (!email || !password) {
        res.status(400).json({ 
          message: "El email y la contraseña son requeridos" 
        });
        return;
      }

      const result = await this.authService.login(email, password);

      res.status(200).json({
        status: "success",
        message: "Inicio de sesión exitoso",
        data: {
          user: result.user,
          token: result.token
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({
          status: "error",
          message: error.message
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "Error del servidor durante el inicio de sesión"
        });
      }
    }
  };

  getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
      // El middleware authenticate ya ha validado el token y añadido el usuario al request
      if (!req.user) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado"
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: {
          user: req.user
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener información del usuario"
      });
    }
  };
} 
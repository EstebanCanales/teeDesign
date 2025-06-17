import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../../application/services/auth.service";

// Extender Request de express para incluir el usuario autenticado
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Obtener el token del header Authorization
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Acceso no autorizado" });
        return;
      }

      // Extraer el token
      const token = authHeader.split(" ")[1];
      
      if (!token) {
        res.status(401).json({ message: "Token no proporcionado" });
        return;
      }
      
      // Validar el token
      const decoded = await this.authService.validateToken(token);
      
      // Añadir usuario al request
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      };
      
      next();
    } catch (error) {
      res.status(401).json({ message: "Token inválido" });
    }
  };

  // Middleware para verificar si el usuario es administrador
  isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Acceso no autorizado" });
        return;
      }

      if (req.user.role !== "admin") {
        res.status(403).json({ message: "Acceso denegado: se requieren privilegios de administrador" });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Error del servidor" });
    }
  };
} 
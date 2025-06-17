import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRouter {
  public router: Router;
  private authController: AuthController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.authMiddleware = new AuthMiddleware();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    // Rutas públicas para registro e inicio de sesión
    this.router.post("/register", this.authController.register);
    this.router.post("/login", this.authController.login);
    
    // Rutas protegidas
    this.router.get(
      "/me", 
      this.authMiddleware.authenticate, 
      this.authController.getCurrentUser
    );
  }
} 
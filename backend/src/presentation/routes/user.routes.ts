import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UserRouter {
  public router: Router;
  private userController: UserController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.authMiddleware = new AuthMiddleware();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    // Middleware de autenticación para todas las rutas de usuarios
    this.router.use(this.authMiddleware.authenticate);
    
    // Rutas para el perfil del usuario
    this.router.get("/profile", this.userController.getProfile);
    this.router.put("/profile", this.userController.updateProfile);
    
    // Rutas de administrador
    this.router.get(
      "/", 
      this.authMiddleware.isAdmin, 
      this.userController.getAllUsers
    );
    
    this.router.delete(
      "/:userId", 
      this.authMiddleware.isAdmin, 
      this.userController.deleteUser
    );
  }
} 
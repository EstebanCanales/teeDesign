import { Router } from "express";
import { DesignController } from "../controllers/design.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class DesignRouter {
  public router: Router;
  private designController: DesignController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.designController = new DesignController();
    this.authMiddleware = new AuthMiddleware();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    // Rutas públicas
    this.router.get("/public", this.designController.getPublicDesigns);
    this.router.get("/search", this.designController.searchDesigns);
    this.router.get("/:id", this.designController.getDesignById);
    
    // Middleware de autenticación para rutas protegidas
    this.router.use(this.authMiddleware.authenticate);
    
    // Rutas protegidas
    this.router.post("/", this.designController.createDesign);
    this.router.get("/user/mine", this.designController.getUserDesigns);
    this.router.put("/:id", this.designController.updateDesign);
    this.router.delete("/:id", this.designController.deleteDesign);
  }
} 

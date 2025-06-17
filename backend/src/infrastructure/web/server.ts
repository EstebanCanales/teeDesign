import express from "express";
import type { Express, Request, Response } from "express";
import type { IMongoDatabaseConnection } from "../../domain/interfaces/IMongoDatabaseConnection.interface";

// Importaciones de routers
import { UserRouter } from "../../presentation/routes/user.routes";
import { AuthRouter } from "../../presentation/routes/auth.routes";
import { DesignRouter } from "../../presentation/routes/design.routes";

// Importaciones de middlewares
import { errorHandler, notFoundHandler } from "../../presentation/middlewares/error.middleware";

export interface ServerConfig {
  port: number;
  environment: string;
}

export class Server {
  private readonly app: Express;
  private readonly port: number;
  private readonly environment: string;
  private readonly dbConnection: IMongoDatabaseConnection;
  private server: any;

  constructor(dbConnection: IMongoDatabaseConnection, config: ServerConfig) {
    this.app = express();
    this.port = config.port;
    this.environment = config.environment;
    this.dbConnection = dbConnection;

    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandlers();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Configurar CORS
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      if (req.method === "OPTIONS") {
        res.sendStatus(200);
      } else {
        next();
      }
    });
  }

  private configureRoutes(): void {
    // Configurar las rutas principales
    // @ts-ignore - Ignorar error de tipos en Express
    this.app.use("/api/auth", new AuthRouter().router);
    this.app.use("/api/users", new UserRouter().router);
    this.app.use("/api/designs", new DesignRouter().router);
    
    // Ruta de comprobación de salud
    // @ts-ignore - Ignorar error de tipos en Express
    this.app.get("/health", async (_req: Request, res: Response) => {
      try {
        const dbStatus = await this.dbConnection.ping();
        return res.status(200).json({
          status: "success",
          message: "Servidor funcionando correctamente",
          environment: this.environment,
          dbStatus: dbStatus ? "connected" : "disconnected",
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Error al verificar la salud del servidor",
        });
      }
    });
  }
  
  private configureErrorHandlers(): void {
    // Middleware para rutas no encontradas
    // @ts-ignore - Ignorar error de tipos en Express
    this.app.use(notFoundHandler);
    
    // Middleware para manejo de errores
    // @ts-ignore - Ignorar error de tipos en Express
    this.app.use(errorHandler);
  }

  async start(): Promise<void> {
    try {
      // Conectar a la base de datos
      await this.dbConnection.connect();
      
      // Iniciar el servidor HTTP
      this.server = this.app.listen(this.port, () => {
        console.log(`
        🚀 Servidor iniciado en puerto ${this.port}
        🌍 Entorno: ${this.environment}
        📝 API TeeDesigner lista para recibir peticiones
        `);
      });
    } catch (error) {
      console.error("❌ Error al iniciar el servidor:", error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      if (this.server) {
        this.server.close();
      }
      await this.dbConnection.disconnect();
      console.log("👋 Servidor detenido correctamente");
    } catch (error) {
      console.error("❌ Error al detener el servidor:", error);
      throw error;
    }
  }
}

import { Router } from "express";
import type { IMongoDatabaseConnection } from "../../../domain/interfaces/IMongoDatabaseConnection.interface";

export class HealthRoutes {
  private router: Router;

  constructor(private dbConnection: IMongoDatabaseConnection) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.router.get("/", this.getHealth.bind(this));
    this.router.get("/db-status", this.getDatabaseStatus.bind(this));
  }

  private async getHealth(req: any, res: any): Promise<void> {
    res.json({
      message: "API Mongo DB + Docker",
      status: "OK",
      timestamp: new Date().toISOString(),
    });
  }

  private async getDatabaseStatus(req: any, res: any): Promise<void> {
    try {
      const isConnected = await this.dbConnection.ping();
      res.json({
        database: isConnected ? "Connected" : "Disconnected",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        database: "Error",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
    }
  }

  getRouter(): Router {
    return this.router;
  }
}

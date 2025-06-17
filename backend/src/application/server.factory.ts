import { Server } from "../infrastructure/web/server";
import type { ServerConfig } from "../infrastructure/web/server";
import type { IMongoDatabaseConnection } from "../domain/interfaces/IMongoDatabaseConnection.interface";
import { MongoDBConnection } from "../infrastructure/database/mongoose/mongoose.connection";

export class ServerFactory {
  static create(config: ServerConfig): Server {
    const dbConnection: IMongoDatabaseConnection = new MongoDBConnection();
    return new Server(dbConnection, config);
  }

  static createWithCustomDB(
    dbConnection: IMongoDatabaseConnection,
    config: ServerConfig,
  ): Server {
    return new Server(dbConnection, config);
  }
}

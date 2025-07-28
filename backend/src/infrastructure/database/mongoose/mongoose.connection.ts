import mongoose from "mongoose";
import type { IMongoDatabaseConnection } from "../../../domain/interfaces/IMongoDatabaseConnection.interface";

export class MongoDBConnection implements IMongoDatabaseConnection {
  private readonly uri: string;

  constructor() {
    this.uri = process.env.MONGODB_URI || "mongodb://localhost:27017/tee-designer";
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log(`🔌 Conexión a MongoDB establecida con éxito → ${this.uri}`);
    } catch (error) {
      console.error("❌ Error al conectar a MongoDB:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("🔌 Desconexión de MongoDB completada");
    } catch (error) {
      console.error("❌ Error al desconectar de MongoDB:", error);
      throw error;
    }
  }

  async ping(): Promise<boolean> {
    try {
      if (mongoose.connection.db) {
        await mongoose.connection.db.admin().ping();
        return true;
      }
      return false;
    } catch (error) {
      console.error("❌ Error en ping a MongoDB:", error);
      return false;
    }
  }
}

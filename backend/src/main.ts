import "dotenv/config";
import { ServerFactory } from "./application/server.factory";
import type { ServerConfig } from "./infrastructure/web/server";

async function main() {
  try {
    // Configuración del servidor
    const config: ServerConfig = {
      port: Number(process.env.PORT) || 3000,
      environment: process.env.NODE_ENV || "development",
    };

    // Crear el servidor usando el factory
    const server = ServerFactory.create(config);

    // Manejo de señales para cierre limpio
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n📡 Recibida señal ${signal}. Cerrando servidor...`);
      try {
        await server.stop();
        process.exit(0);
      } catch (error) {
        console.error("❌ Error durante el cierre:", error);
        process.exit(1);
      }
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Iniciar el servidor
    await server.start();
  } catch (error) {
    console.error("❌ Error fatal:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

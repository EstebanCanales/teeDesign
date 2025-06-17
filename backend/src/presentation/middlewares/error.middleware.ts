import type { Request, Response, NextFunction } from "express";

// Interfaz para errores con código HTTP
interface HttpError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error del servidor";

  console.error(`[${statusCode}] ${message}`, err.stack);

  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// Middleware para manejar rutas no encontradas
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    status: "error",
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}; 
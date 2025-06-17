import type { Request, Response } from "express";
import { DesignService } from "../../application/services/design.service";
import mongoose from "mongoose";

export class DesignController {
  private designService: DesignService;

  constructor() {
    this.designService = new DesignService();
  }

  createDesign = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado"
        });
        return;
      }

      const { 
        name, 
        baseColor, 
        elements, 
        isPublic,
        // Nuevos campos
        hasHood,
        sleeveLeftColor,
        sleeveRightColor,
        collarColor,
        hasBorders,
        borderColor,
        hasZipper,
        zipperColor
      } = req.body;

      // Validación básica
      if (!name) {
        res.status(400).json({
          status: "error",
          message: "El nombre del diseño es obligatorio"
        });
        return;
      }

      const design = await this.designService.createDesign({
        name,
        user: new mongoose.Types.ObjectId(req.user.id),
        baseColor: baseColor || "#FFFFFF",
        elements: elements || [],
        isPublic: isPublic || false,
        // Nuevos campos con sus valores por defecto
        hasHood: hasHood || false,
        sleeveLeftColor: sleeveLeftColor || "#FFFFFF",
        sleeveRightColor: sleeveRightColor || "#FFFFFF",
        collarColor: collarColor || "#FFFFFF",
        hasBorders: hasBorders || false,
        borderColor: borderColor || "#000000",
        hasZipper: hasZipper || false,
        zipperColor: zipperColor || "#000000"
      });

      res.status(201).json({
        status: "success",
        message: "Diseño creado con éxito",
        data: { design }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al crear el diseño"
      });
    }
  };

  getUserDesigns = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado"
        });
        return;
      }

      const designs = await this.designService.getDesignsByUser(req.user.id);

      res.status(200).json({
        status: "success",
        data: { designs }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener diseños del usuario"
      });
    }
  };

  getDesignById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          status: "error",
          message: "ID del diseño requerido"
        });
        return;
      }

      const design = await this.designService.getDesignById(id);

      if (!design) {
        res.status(404).json({
          status: "error",
          message: "Diseño no encontrado"
        });
        return;
      }

      // Verificar si el diseño es público o pertenece al usuario
      const isOwner = req.user?.id && design.user.toString() === req.user.id;
      if (!design.isPublic && !isOwner) {
        res.status(403).json({
          status: "error",
          message: "No tienes permiso para ver este diseño"
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: { design }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener el diseño"
      });
    }
  };

  updateDesign = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado"
        });
        return;
      }

      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({
          status: "error",
          message: "ID del diseño requerido"
        });
        return;
      }

      const { 
        name, 
        baseColor, 
        elements, 
        isPublic,
        // Nuevos campos
        hasHood,
        sleeveLeftColor,
        sleeveRightColor,
        collarColor,
        hasBorders,
        borderColor,
        hasZipper,
        zipperColor
      } = req.body;

      // Verificar si el diseño existe y pertenece al usuario
      const design = await this.designService.getDesignById(id);

      if (!design) {
        res.status(404).json({
          status: "error",
          message: "Diseño no encontrado"
        });
        return;
      }

      // Verificar permiso
      if (design.user.toString() !== req.user.id) {
        res.status(403).json({
          status: "error",
          message: "No tienes permiso para editar este diseño"
        });
        return;
      }

      // Actualizar solo los campos proporcionados
      const updateData: Record<string, any> = {};
      if (name) updateData.name = name;
      if (baseColor) updateData.baseColor = baseColor;
      if (elements) updateData.elements = elements;
      if (typeof isPublic === "boolean") updateData.isPublic = isPublic;
      
      // Nuevos campos
      if (typeof hasHood === "boolean") updateData.hasHood = hasHood;
      if (sleeveLeftColor) updateData.sleeveLeftColor = sleeveLeftColor;
      if (sleeveRightColor) updateData.sleeveRightColor = sleeveRightColor;
      if (collarColor) updateData.collarColor = collarColor;
      if (typeof hasBorders === "boolean") updateData.hasBorders = hasBorders;
      if (borderColor) updateData.borderColor = borderColor;
      if (typeof hasZipper === "boolean") updateData.hasZipper = hasZipper;
      if (zipperColor) updateData.zipperColor = zipperColor;

      const updatedDesign = await this.designService.updateDesign(id, updateData);

      res.status(200).json({
        status: "success",
        message: "Diseño actualizado con éxito",
        data: { design: updatedDesign }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al actualizar el diseño"
      });
    }
  };

  deleteDesign = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({
          status: "error",
          message: "Usuario no autenticado"
        });
        return;
      }

      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({
          status: "error",
          message: "ID del diseño requerido"
        });
        return;
      }

      // Verificar si el diseño existe y pertenece al usuario
      const design = await this.designService.getDesignById(id);

      if (!design) {
        res.status(404).json({
          status: "error",
          message: "Diseño no encontrado"
        });
        return;
      }

      // Verificar permiso (solo el propietario o un admin puede eliminar)
      if (design.user.toString() !== req.user.id && req.user.role !== "admin") {
        res.status(403).json({
          status: "error",
          message: "No tienes permiso para eliminar este diseño"
        });
        return;
      }

      await this.designService.deleteDesign(id);

      res.status(200).json({
        status: "success",
        message: "Diseño eliminado con éxito"
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al eliminar el diseño"
      });
    }
  };

  getPublicDesigns = async (req: Request, res: Response): Promise<void> => {
    try {
      const designs = await this.designService.getAllPublicDesigns();

      res.status(200).json({
        status: "success",
        data: { designs }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al obtener diseños públicos"
      });
    }
  };

  searchDesigns = async (req: Request, res: Response): Promise<void> => {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== "string") {
        res.status(400).json({
          status: "error",
          message: "Se requiere un término de búsqueda válido"
        });
        return;
      }

      const designs = await this.designService.searchDesigns(query);

      res.status(200).json({
        status: "success",
        data: { designs }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al buscar diseños"
      });
    }
  };
} 
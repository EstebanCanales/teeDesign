import mongoose, { Schema, Document } from "mongoose";

// Interfaz para la posición y tamaño de un elemento
interface IPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

// Interfaz para texto en el diseño
interface ITextElement {
  type: "text";
  content: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  position: IPosition;
}

// Interfaz para imagen en el diseño
interface IImageElement {
  type: "image";
  url: string;
  position: IPosition;
}

// Tipo unión para elementos del diseño
type DesignElement = ITextElement | IImageElement;

// Interfaz para el documento de diseño
export interface IDesign extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  baseColor: string;
  // Nuevas propiedades para mayor personalización
  hasHood: boolean;
  sleeveLeftColor: string;
  sleeveRightColor: string;
  collarColor: string; 
  hasBorders: boolean;
  borderColor: string;
  hasZipper: boolean;
  zipperColor: string;
  elements: DesignElement[];
  isPublic: boolean;
  preview: string;
  createdAt: Date;
  updatedAt: Date;
}

// Esquema para la posición
const PositionSchema = new Schema<IPosition>(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    rotation: { type: Number, default: 0 },
  },
  { _id: false }
);

// Esquema para el diseño
const DiferentesSchema = new Schema<IDesign>(
  {
    name: {
      type: String,
      required: [true, "El nombre del diseño es obligatorio"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El diseño debe pertenecer a un usuario"]
    },
    baseColor: {
      type: String,
      default: "#FFFFFF"
    },
    // Nuevos campos para personalización
    hasHood: {
      type: Boolean,
      default: false
    },
    sleeveLeftColor: {
      type: String,
      default: "#FFFFFF"
    },
    sleeveRightColor: {
      type: String,
      default: "#FFFFFF"
    },
    collarColor: {
      type: String,
      default: "#FFFFFF"
    },
    hasBorders: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: "#000000"
    },
    hasZipper: {
      type: Boolean,
      default: false
    },
    zipperColor: {
      type: String,
      default: "#000000"
    },
    elements: {
      type: [
        {
          type: { type: String, enum: ["text", "image"], required: true },
          content: { type: String },
          fontFamily: { type: String },
          fontSize: { type: Number },
          color: { type: String },
          url: { type: String },
          position: { type: PositionSchema, required: true }
        }
      ],
      default: []
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    preview: {
      type: String  // URL de la imagen de vista previa
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Índice para búsquedas por usuario
DiferentesSchema.index({ user: 1 });
// Índice para búsquedas por nombre
DiferentesSchema.index({ name: "text" });

export const DiferentesModel = mongoose.model<IDesign>("Diferentes", DiferentesSchema); 
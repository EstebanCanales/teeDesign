"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save, Download, Share2, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TShirtRenderer, TShirtColors } from "@/components/ui/tshirt-renderer";
import designService from "@/lib/design-service";

export default function DesignerPage() {
  // Estado para los colores de la camiseta
  const [tshirtColors, setTshirtColors] = useState<TShirtColors>({
    body: "#ffffff",
    leftSleeve: "#ffffff",
    rightSleeve: "#ffffff",
    collar: "#ffffff",
  });

  // Estado para el nombre del diseño
  const [designName, setDesignName] = useState<string>("Mi diseño");

  // Estado para el diálogo de guardar
  const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);

  // Estado para indicar que se está guardando
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Función para cambiar un color
  const changeColor = (part: keyof TShirtColors, color: string) => {
    setTshirtColors((prev) => ({
      ...prev,
      [part]: color,
    }));
  };

  // Función para guardar el diseño
  const saveDesign = async () => {
    try {
      setIsSaving(true);

      // Crear el objeto de diseño con los datos necesarios
      const design = {
        name: designName,
        colors: tshirtColors,
        isPublic: false, // Por defecto, los diseños no son públicos
      };

      // Llamar al servicio para guardar el diseño
      await designService.createDesign(design);

      // Cerrar el diálogo
      setSaveDialogOpen(false);

      // Mostrar notificación de éxito
      toast.success("Diseño guardado correctamente");
    } catch (error) {
      // Mostrar notificación de error
      toast.error("Error al guardar el diseño. Intente nuevamente.");
      console.error("Error al guardar el diseño:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Función para descargar el diseño
  const downloadDesign = () => {
    // Aquí iría la lógica para generar una imagen y descargarla
    toast.success("Diseño descargado correctamente");
  };

  // Función para compartir el diseño
  const shareDesign = () => {
    // Aquí iría la lógica para compartir
    toast.success("Enlace copiado al portapapeles");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Volver</span>
            </Link>
            <h1 className="font-bold text-xl hidden sm:block">
              Diseñador de Camisetas
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Guardar diseño</DialogTitle>
                  <DialogDescription>
                    Dale un nombre a tu diseño para guardarlo.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    placeholder="Nombre del diseño"
                  />
                </div>
                <DialogFooter>
                  <Button
                    onClick={saveDesign}
                    disabled={isSaving || !designName.trim()}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      "Guardar diseño"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Share2">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={downloadDesign}>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={shareDesign}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Panel de visualización */}
        <motion.div
          className="lg:col-span-2 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TShirtRenderer
            colors={tshirtColors}
            size="lg"
            className="shadow-md"
          />
        </motion.div>

        {/* Panel de control */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4">
                Personaliza tu camiseta
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cuerpo</label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <ColorButton
                        key={`body-${color}`}
                        color={color}
                        isSelected={tshirtColors.body === color}
                        onClick={() => changeColor("body", color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Manga izquierda</label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <ColorButton
                        key={`leftSleeve-${color}`}
                        color={color}
                        isSelected={tshirtColors.leftSleeve === color}
                        onClick={() => changeColor("leftSleeve", color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Manga derecha</label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <ColorButton
                        key={`rightSleeve-${color}`}
                        color={color}
                        isSelected={tshirtColors.rightSleeve === color}
                        onClick={() => changeColor("rightSleeve", color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Cuello</label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <ColorButton
                        key={`collar-${color}`}
                        color={color}
                        isSelected={tshirtColors.collar === color}
                        onClick={() => changeColor("collar", color)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            Personaliza cada parte de tu camiseta seleccionando los colores que
            prefieras.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Componente para los botones de color
function ColorButton({
  color,
  isSelected,
  onClick,
}: {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`w-full aspect-square rounded-full border-2 transition-all ${
        isSelected ? "border-primary scale-110" : "border-transparent"
      }`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      aria-label={`Color ${color}`}
    />
  );
}

// Opciones de colores disponibles
const colorOptions = [
  "#ffffff", // blanco
  "#000000", // negro
  "#ff0000", // rojo
  "#00ff00", // verde
  "#0000ff", // azul
  "#ffff00", // amarillo
  "#ff00ff", // magenta
  "#00ffff", // cian
  "#ff8000", // naranja
  "#8000ff", // morado
];

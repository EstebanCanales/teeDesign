"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Heart, Share2, ThumbsUp, Eye } from "lucide-react";
import designService, { TeeDesign } from "@/lib/design-service";
import { TShirtRenderer } from "@/components/ui/tshirt-renderer";

export default function DesignDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [design, setDesign] = useState<TeeDesign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  // Cargar el diseño
  useEffect(() => {
    const loadDesign = async () => {
      try {
        setIsLoading(true);
        // Por ahora usamos datos de ejemplo
        // En producción: const data = await designService.getDesignById(id)

        // Simulación de carga de datos
        setTimeout(() => {
          const mockDesign = mockDesigns.find((d) => d.id === id) || null;
          setDesign(mockDesign);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error al cargar el diseño:", error);
        toast.error("No se pudo cargar el diseño");
        setIsLoading(false);
      }
    };

    loadDesign();
  }, [id]);

  // Manejar el like
  const handleLike = () => {
    if (!design) return;

    // En producción: designService.likeDesign(id)
    setLiked(!liked);
    toast.success(liked ? "Has quitado tu like" : "Te gusta este diseño");
  };

  // Compartir diseño
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: design?.name || "Diseño de camiseta",
        text: "Mira este increíble diseño de camiseta",
        url: window.location.href,
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Enlace copiado al portapapeles");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Cargando diseño...</div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Diseño no encontrado</h1>
        <p className="text-muted-foreground mb-6">
          El diseño que buscas no existe o ha sido eliminado.
        </p>
        <Button asChild>
          <Link href="/gallery">Volver a la galería</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/gallery" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Volver</span>
            </Link>
            <h1 className="font-bold text-xl hidden sm:block">{design.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={liked ? "default" : "outline"}
              size="icon"
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 flex flex-col lg:flex-row gap-8">
        {/* Visualización del diseño */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TShirtRenderer
            colors={design.colors}
            size="lg"
            className="shadow-lg"
          />
        </motion.div>

        {/* Información del diseño */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{design.name}</h2>
                <p className="text-muted-foreground">
                  por {design.creator?.name || "Usuario anónimo"}
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{design.likes || 0} likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{design.views || 0} vistas</span>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-medium mb-2">Colores</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: design.colors.body }}
                    />
                    <span>Cuerpo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: design.colors.collar }}
                    />
                    <span>Cuello</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: design.colors.leftSleeve }}
                    />
                    <span>Manga izquierda</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 dark:border-white/10"
                      style={{ backgroundColor: design.colors.rightSleeve }}
                    />
                    <span>Manga derecha</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={handleLike}>
              <Heart
                className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`}
              />
              {liked ? "Me gusta" : "Me gusta"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>

          <div className="pt-4">
            <Link href="/designer" className="text-primary hover:underline">
              Crear mi propio diseño
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Datos de ejemplo para la visualización
const mockDesigns: TeeDesign[] = [
  {
    id: "1",
    name: "Diseño Clásico",
    creator: {
      id: "user1",
      name: "María García",
    },
    colors: {
      body: "#ffffff",
      leftSleeve: "#ff0000",
      rightSleeve: "#ff0000",
      collar: "#000000",
    },
    isPublic: true,
    likes: 124,
    views: 1520,
  },
  {
    id: "2",
    name: "Estilo Urbano",
    creator: {
      id: "user2",
      name: "Carlos Rodríguez",
    },
    colors: {
      body: "#000000",
      leftSleeve: "#ffffff",
      rightSleeve: "#ffffff",
      collar: "#ffffff",
    },
    isPublic: true,
    likes: 89,
    views: 945,
  },
];

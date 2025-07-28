"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Heart, Eye, ThumbsUp } from "lucide-react";
import { useEffect } from "react";
import designService, { TeeDesign } from "@/lib/design-service";
import { TShirtRenderer } from "@/components/ui/tshirt-renderer";



export default function GalleryPage() {
  // Estado para los diseños
  const [designs, setDesigns] = useState<TeeDesign[]>([]);
  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Estado de carga
  const [loading, setLoading] = useState<boolean>(false);

  // Cargar diseños públicos al montar
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        setLoading(true);
        const publicDesigns = await designService.getPublicDesigns();
        setDesigns(publicDesigns);
      } catch (error) {
        console.error("Error al cargar diseños públicos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  // Filtrar diseños basados en la búsqueda
  const filteredDesigns = designs.filter(
    (design) =>
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (design.creator?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Galería de Diseños
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/designer">
              <Button size="sm">Crear diseño</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Buscador */}
      <div className="container mx-auto py-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Buscar diseños..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Galería */}
      <div className="container mx-auto py-6 flex-1">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando diseños...</p>
          </div>
        ) : filteredDesigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron diseños que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigns.map((design, index) => (
              <DesignCard key={design.id} design={design} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para cada tarjeta de diseño
function DesignCard({ design, index }: { design: TeeDesign; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <CardContent className="p-0 flex-1">
          <Link href={`/design/${design.id}`} className="block">
            <div className="relative pt-[100%]">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <TShirtRenderer colors={design.colors} size="sm" />
              </div>
            </div>
          </Link>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 pt-4">
          <div className="w-full flex justify-between items-center">
            <Link href={`/design/${design.id}`} className="hover:underline">
              <h3 className="font-medium">{design.name}</h3>
            </Link>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
            <span>por {design.creator?.name || "Usuario"}</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                <span>{design.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{design.views}</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
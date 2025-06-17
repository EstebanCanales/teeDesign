"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Heart, Eye, ThumbsUp } from "lucide-react";
import { TShirtRenderer, TShirtColors } from "@/components/ui/tshirt-renderer";

// Tipo para los diseños
type TeeDesign = {
  id: string;
  name: string;
  creator: string;
  likes: number;
  views: number;
  colors: TShirtColors;
};

export default function GalleryPage() {
  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtrar diseños basados en la búsqueda
  const filteredDesigns = mockDesigns.filter(
    (design) =>
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.creator.toLowerCase().includes(searchQuery.toLowerCase())
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
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No se encontraron diseños que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <span>por {design.creator}</span>
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

// Datos de ejemplo para la galería
const mockDesigns: TeeDesign[] = [
  {
    id: "1",
    name: "Diseño Clásico",
    creator: "María García",
    likes: 124,
    views: 1520,
    colors: {
      body: "#ffffff",
      leftSleeve: "#ff0000",
      rightSleeve: "#ff0000",
      collar: "#000000",
    },
  },
  {
    id: "2",
    name: "Estilo Urbano",
    creator: "Carlos Rodríguez",
    likes: 89,
    views: 945,
    colors: {
      body: "#000000",
      leftSleeve: "#ffffff",
      rightSleeve: "#ffffff",
      collar: "#ffffff",
    },
  },
  {
    id: "3",
    name: "Primavera 2024",
    creator: "Laura Martínez",
    likes: 210,
    views: 2230,
    colors: {
      body: "#00ff00",
      leftSleeve: "#ffff00",
      rightSleeve: "#ffff00",
      collar: "#ffffff",
    },
  },
  {
    id: "4",
    name: "Atardecer",
    creator: "Juan Pérez",
    likes: 156,
    views: 1890,
    colors: {
      body: "#ff8000",
      leftSleeve: "#ff0000",
      rightSleeve: "#ff0000",
      collar: "#ffff00",
    },
  },
  {
    id: "5",
    name: "Océano Profundo",
    creator: "Ana López",
    likes: 178,
    views: 2100,
    colors: {
      body: "#0000ff",
      leftSleeve: "#00ffff",
      rightSleeve: "#00ffff",
      collar: "#ffffff",
    },
  },
  {
    id: "6",
    name: "Galaxia",
    creator: "Miguel Torres",
    likes: 245,
    views: 3120,
    colors: {
      body: "#000000",
      leftSleeve: "#8000ff",
      rightSleeve: "#ff00ff",
      collar: "#ffffff",
    },
  },
  {
    id: "7",
    name: "Verano",
    creator: "Sofía Ramírez",
    likes: 132,
    views: 1750,
    colors: {
      body: "#ffff00",
      leftSleeve: "#ff8000",
      rightSleeve: "#ff8000",
      collar: "#ffffff",
    },
  },
  {
    id: "8",
    name: "Contraste",
    creator: "Diego Morales",
    likes: 98,
    views: 1230,
    colors: {
      body: "#ffffff",
      leftSleeve: "#000000",
      rightSleeve: "#000000",
      collar: "#000000",
    },
  },
];

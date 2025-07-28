import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Link, router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { TShirtRenderer } from "@/components/ui/TShirtRenderer";
import designService from "@/lib/design-service";

import { TeeDesign } from "@/lib/design-service";

type Design = TeeDesign;

export default function GalleryScreen() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo para la galería
  const mockDesigns: Design[] = [
    {
      id: "1",
      name: "Diseño Clásico",
      colors: {
        body: "#ffffff",
        leftSleeve: "#000000",
        rightSleeve: "#000000",
        collar: "#ffffff",
      },
      creator: { id: "1", name: "Diseñador1" },
      likes: 15,
      views: 120,
      isPublic: true,
    },
    {
      id: "2",
      name: "Vibrante",
      colors: {
        body: "#ff0000",
        leftSleeve: "#00ff00",
        rightSleeve: "#0000ff",
        collar: "#ffff00",
      },
      creator: { id: "2", name: "Diseñador2" },
      likes: 8,
      views: 85,
      isPublic: true,
    },
    {
      id: "3",
      name: "Elegante",
      colors: {
        body: "#000000",
        leftSleeve: "#ffffff",
        rightSleeve: "#ffffff",
        collar: "#000000",
      },
      creator: { id: "3", name: "Diseñador3" },
      likes: 22,
      views: 200,
      isPublic: true,
    },
    {
      id: "4",
      name: "Pastel",
      colors: {
        body: "#ffc0cb",
        leftSleeve: "#87ceeb",
        rightSleeve: "#98fb98",
        collar: "#dda0dd",
      },
      creator: { id: "4", name: "Diseñador4" },
      likes: 12,
      views: 95,
      isPublic: true,
    },
  ];

  useEffect(() => {
    // Cargar diseños reales desde la API
    const loadDesigns = async () => {
      try {
        const publicDesigns = await designService.getPublicDesigns();
        setDesigns(publicDesigns);
      } catch (error) {
        console.error("Error al cargar diseños:", error);
        // En caso de error, usar datos de ejemplo
        setDesigns(mockDesigns);
      } finally {
        setIsLoading(false);
      }
    };

    loadDesigns();
  }, []);

  const filteredDesigns = designs.filter(
    (design) =>
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.creator?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDesignItem = ({ item }: { item: Design }) => (
    <TouchableOpacity
      style={styles.designCard}
      onPress={() => router.push(`/design/${item.id}`)}
    >
      <ThemedView style={styles.designPreview}>
        <TShirtRenderer colors={item.colors} size="md" />
      </ThemedView>
      <ThemedView style={styles.designInfo}>
        <ThemedText type="subtitle" style={styles.designName}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.designCreator}>
          Por {item.creator?.name}
        </ThemedText>
        <ThemedView style={styles.designStats}>
          <ThemedView style={styles.stat}>
            <IconSymbol name="house.fill" size={16} color="#666" />
            <ThemedText style={styles.statText}>{item.likes}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stat}>
            <IconSymbol name="paperplane.fill" size={16} color="#666" />
            <ThemedText style={styles.statText}>{item.views}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol name="chevron.right" size={24} color="#007AFF" />
          <ThemedText type="link">Atrás</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Galería
        </ThemedText>
        <ThemedView style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="house.fill" size={20} color="#007AFF" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Barra de búsqueda */}
      <ThemedView style={styles.searchSection}>
        <ThemedView style={styles.searchContainer}>
          <IconSymbol name="house.fill" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar diseños..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </ThemedView>
      </ThemedView>

      {/* Contenido */}
      {isLoading ? (
        <ThemedView style={styles.loadingContainer}>
          <ThemedText>Cargando diseños...</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={filteredDesigns}
          renderItem={renderDesignItem}
          keyExtractor={(item) => item.id || Math.random().toString()}
          contentContainerStyle={styles.designsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>
                No se encontraron diseños
              </ThemedText>
            </ThemedView>
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
  searchSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  designsList: {
    padding: 20,
  },
  designCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  designPreview: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  designInfo: {
    padding: 16,
  },
  designName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  designCreator: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  designStats: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});

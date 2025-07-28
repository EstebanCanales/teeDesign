import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Explorar
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Descubre las mejores creaciones de la comunidad
        </ThemedText>
      </ThemedView>

      {/* Categorías */}
      <ThemedView style={styles.categoriesSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Categorías populares
        </ThemedText>
        <ThemedView style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <Link key={index} href={`/gallery?category=${category.id}`} asChild>
              <TouchableOpacity style={styles.categoryCard}>
                <ThemedView style={styles.categoryIcon}>
                  <IconSymbol name={category.icon} size={24} color="#007AFF" />
                </ThemedView>
                <ThemedText type="subtitle" style={styles.categoryTitle}>
                  {category.title}
                </ThemedText>
                <ThemedText style={styles.categoryCount}>
                  {category.count} diseños
                </ThemedText>
              </TouchableOpacity>
            </Link>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Diseños destacados */}
      <ThemedView style={styles.featuredSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Diseños destacados
        </ThemedText>
        <ThemedView style={styles.featuredGrid}>
          {featuredDesigns.map((design, index) => (
            <Link key={index} href={`/design/${design.id}`} asChild>
              <TouchableOpacity style={styles.featuredCard}>
                <ThemedView style={styles.featuredPreview}>
                  <ThemedView style={styles.tshirtMockup}>
                    <ThemedView
                      style={[
                        styles.tshirtBody,
                        { backgroundColor: design.colors.body },
                      ]}
                    />
                    <ThemedView
                      style={[
                        styles.tshirtCollar,
                        { backgroundColor: design.colors.collar },
                      ]}
                    />
                    <ThemedView
                      style={[
                        styles.tshirtSleeveLeft,
                        { backgroundColor: design.colors.leftSleeve },
                      ]}
                    />
                    <ThemedView
                      style={[
                        styles.tshirtSleeveRight,
                        { backgroundColor: design.colors.rightSleeve },
                      ]}
                    />
                  </ThemedView>
                </ThemedView>
                <ThemedView style={styles.featuredInfo}>
                  <ThemedText type="subtitle" style={styles.featuredTitle}>
                    {design.name}
                  </ThemedText>
                  <ThemedText style={styles.featuredCreator}>
                    Por {design.creator}
                  </ThemedText>
                  <ThemedView style={styles.featuredStats}>
                    <ThemedView style={styles.stat}>
                      <IconSymbol name="house.fill" size={16} color="#666" />
                      <ThemedText style={styles.statText}>
                        {design.likes}
                      </ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.stat}>
                      <IconSymbol
                        name="paperplane.fill"
                        size={16}
                        color="#666"
                      />
                      <ThemedText style={styles.statText}>
                        {design.views}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              </TouchableOpacity>
            </Link>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Tutoriales */}
      <ThemedView style={styles.tutorialsSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Aprende a diseñar
        </ThemedText>
        <ThemedView style={styles.tutorialsList}>
          {tutorials.map((tutorial, index) => (
            <TouchableOpacity key={index} style={styles.tutorialCard}>
              <ThemedView style={styles.tutorialIcon}>
                <IconSymbol name={tutorial.icon} size={24} color="#007AFF" />
              </ThemedView>
              <ThemedView style={styles.tutorialContent}>
                <ThemedText type="subtitle" style={styles.tutorialTitle}>
                  {tutorial.title}
                </ThemedText>
                <ThemedText style={styles.tutorialDescription}>
                  {tutorial.description}
                </ThemedText>
                <ThemedText style={styles.tutorialDuration}>
                  {tutorial.duration} min
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Call to Action */}
      <ThemedView style={styles.ctaSection}>
        <ThemedText type="title" style={styles.ctaTitle}>
          ¿Listo para crear?
        </ThemedText>
        <ThemedText style={styles.ctaSubtitle}>
          Únete a nuestra comunidad y comparte tus diseños
        </ThemedText>
        <Link href="/designer" asChild>
          <TouchableOpacity style={styles.ctaButton}>
            <ThemedText style={styles.ctaButtonText}>
              Comenzar a diseñar
            </ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#ffffff" />
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

// Datos de ejemplo
const categories: Array<{
  id: string;
  title: string;
  icon:
    | "house.fill"
    | "paperplane.fill"
    | "chevron.left.forwardslash.chevron.right"
    | "chevron.right";
  count: number;
}> = [
  {
    id: "classic",
    title: "Clásicos",
    icon: "house.fill",
    count: 156,
  },
  {
    id: "vintage",
    title: "Vintage",
    icon: "house.fill",
    count: 89,
  },
  {
    id: "modern",
    title: "Modernos",
    icon: "paperplane.fill",
    count: 234,
  },
  {
    id: "artistic",
    title: "Artísticos",
    icon: "house.fill",
    count: 67,
  },
];

const featuredDesigns = [
  {
    id: "1",
    name: "Diseño Minimalista",
    creator: "Diseñador1",
    colors: {
      body: "#ffffff",
      leftSleeve: "#000000",
      rightSleeve: "#000000",
      collar: "#ffffff",
    },
    likes: 45,
    views: 320,
  },
  {
    id: "2",
    name: "Vibrante Urbano",
    creator: "Diseñador2",
    colors: {
      body: "#ff6b6b",
      leftSleeve: "#4ecdc4",
      rightSleeve: "#45b7d1",
      collar: "#96ceb4",
    },
    likes: 32,
    views: 245,
  },
  {
    id: "3",
    name: "Elegante Negro",
    creator: "Diseñador3",
    colors: {
      body: "#000000",
      leftSleeve: "#ffffff",
      rightSleeve: "#ffffff",
      collar: "#000000",
    },
    likes: 67,
    views: 512,
  },
];

const tutorials: Array<{
  title: string;
  description: string;
  duration: number;
  icon:
    | "house.fill"
    | "paperplane.fill"
    | "chevron.left.forwardslash.chevron.right"
    | "chevron.right";
}> = [
  {
    title: "Fundamentos del diseño",
    description: "Aprende los principios básicos para crear diseños atractivos",
    duration: 15,
    icon: "house.fill",
  },
  {
    title: "Combinación de colores",
    description: "Descubre cómo elegir la paleta perfecta para tus diseños",
    duration: 12,
    icon: "paperplane.fill",
  },
  {
    title: "Tendencias actuales",
    description: "Conoce las tendencias más populares en diseño de camisetas",
    duration: 8,
    icon: "house.fill",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#f8f9fa",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  categoriesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#007AFF20",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  categoryCount: {
    fontSize: 14,
    color: "#666",
  },
  featuredSection: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  featuredGrid: {
    gap: 16,
  },
  featuredCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredPreview: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  tshirtMockup: {
    width: 120,
    height: 160,
    position: "relative",
  },
  tshirtBody: {
    position: "absolute",
    top: "15%",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tshirtCollar: {
    position: "absolute",
    top: "15%",
    left: "50%",
    transform: [{ translateX: -15 }],
    width: 30,
    height: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tshirtSleeveLeft: {
    position: "absolute",
    top: "15%",
    left: 0,
    width: "30%",
    height: "30%",
    borderTopRightRadius: 24,
  },
  tshirtSleeveRight: {
    position: "absolute",
    top: "15%",
    right: 0,
    width: "30%",
    height: "30%",
    borderTopLeftRadius: 24,
  },
  featuredInfo: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  featuredCreator: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  featuredStats: {
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
  tutorialsSection: {
    padding: 20,
  },
  tutorialsList: {
    gap: 12,
  },
  tutorialCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tutorialIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#007AFF20",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  tutorialContent: {
    flex: 1,
  },
  tutorialTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  tutorialDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  tutorialDuration: {
    fontSize: 12,
    color: "#999",
  },
  ctaSection: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    gap: 16,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  ctaButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  ctaButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

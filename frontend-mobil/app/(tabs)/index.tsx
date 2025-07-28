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

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerContent}>
          <ThemedText type="title" style={styles.logo}>
            TeeDesigner
          </ThemedText>
          <ThemedView style={styles.headerActions}>
            <Link href="/login" asChild>
              <TouchableOpacity style={styles.authButton}>
                <ThemedText type="link">Iniciar sesión</ThemedText>
              </TouchableOpacity>
            </Link>
            <Link href="/register" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <ThemedText style={styles.primaryButtonText}>
                  Registrarse
                </ThemedText>
              </TouchableOpacity>
            </Link>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Hero Section */}
      <ThemedView style={styles.heroSection}>
        <ThemedView style={styles.heroContent}>
          <ThemedText type="title" style={styles.heroTitle}>
            Diseña tu camiseta perfecta con nuestra herramienta interactiva
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Crea diseños únicos, personaliza colores y comparte tus creaciones
            con el mundo.
          </ThemedText>
          <ThemedView style={styles.heroButtons}>
            <Link href="/designer" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <ThemedText style={styles.primaryButtonText}>
                  Comenzar a diseñar
                </ThemedText>
                <IconSymbol name="arrow.right" size={16} color="#ffffff" />
              </TouchableOpacity>
            </Link>
            <Link href="/gallery" asChild>
              <TouchableOpacity style={styles.secondaryButton}>
                <ThemedText type="link">Ver galería</ThemedText>
              </TouchableOpacity>
            </Link>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.heroImage}>
          <ThemedView style={styles.tshirtPreview}>
            <ThemedView style={styles.tshirtBody} />
            <ThemedView style={styles.tshirtCollar} />
            <ThemedView style={styles.tshirtSleeveLeft} />
            <ThemedView style={styles.tshirtSleeveRight} />
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Features */}
      <ThemedView style={styles.featuresSection}>
        <ThemedText type="title" style={styles.featuresTitle}>
          Características principales
        </ThemedText>
        <ThemedView style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <ThemedView key={index} style={styles.featureCard}>
              <ThemedView style={styles.featureIcon}>
                <IconSymbol name={feature.icon} size={24} color="#007AFF" />
              </ThemedView>
              <ThemedText type="subtitle" style={styles.featureTitle}>
                {feature.title}
              </ThemedText>
              <ThemedText style={styles.featureDescription}>
                {feature.description}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Call to Action */}
      <ThemedView style={styles.ctaSection}>
        <ThemedText type="title" style={styles.ctaTitle}>
          ¿Listo para crear tu diseño?
        </ThemedText>
        <ThemedText style={styles.ctaSubtitle}>
          Únete a nuestra comunidad de diseñadores y comparte tus creaciones con
          el mundo.
        </ThemedText>
        <Link href="/register" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <ThemedText style={styles.primaryButtonText}>
              Comenzar gratis
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <ThemedView style={styles.footerContent}>
          <ThemedView style={styles.footerBrand}>
            <ThemedText type="title" style={styles.footerLogo}>
              TeeDesigner
            </ThemedText>
            <ThemedText style={styles.footerTagline}>
              Diseña tu estilo, expresa tu personalidad
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.footerLinks}>
            <Link href="/about" asChild>
              <TouchableOpacity style={styles.footerLink}>
                <ThemedText type="link">Acerca de</ThemedText>
              </TouchableOpacity>
            </Link>
            <Link href="/terms" asChild>
              <TouchableOpacity style={styles.footerLink}>
                <ThemedText type="link">Términos</ThemedText>
              </TouchableOpacity>
            </Link>
            <Link href="/privacy" asChild>
              <TouchableOpacity style={styles.footerLink}>
                <ThemedText type="link">Privacidad</ThemedText>
              </TouchableOpacity>
            </Link>
            <Link href="/contact" asChild>
              <TouchableOpacity style={styles.footerLink}>
                <ThemedText type="link">Contacto</ThemedText>
              </TouchableOpacity>
            </Link>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.footerBottom}>
          <ThemedText style={styles.footerCopyright}>
            © {new Date().getFullYear()} TeeDesigner. Todos los derechos
            reservados.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

// Datos para la sección de características
const features: Array<{
  title: string;
  description: string;
  icon:
    | "house.fill"
    | "paperplane.fill"
    | "chevron.left.forwardslash.chevron.right"
    | "chevron.right";
}> = [
  {
    title: "Diseño interactivo",
    description:
      "Interfaz intuitiva para diseñar camisetas con herramientas de arrastrar y soltar.",
    icon: "house.fill",
  },
  {
    title: "Personalización completa",
    description:
      "Elige colores, añade texto e imágenes para crear diseños totalmente personalizados.",
    icon: "house.fill",
  },
  {
    title: "Comparte tus diseños",
    description:
      "Publica tus creaciones en la galería y recibe votos de la comunidad.",
    icon: "paperplane.fill",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  authButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexDirection: "column",
    gap: 40,
  },
  heroContent: {
    gap: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 18,
    lineHeight: 24,
    opacity: 0.8,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  heroImage: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  tshirtPreview: {
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
    backgroundColor: "#ffffff",
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
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  tshirtSleeveLeft: {
    position: "absolute",
    top: "15%",
    left: 0,
    width: "30%",
    height: "30%",
    backgroundColor: "#e0e0e0",
    borderTopRightRadius: 24,
  },
  tshirtSleeveRight: {
    position: "absolute",
    top: "15%",
    right: 0,
    width: "30%",
    height: "30%",
    backgroundColor: "#e0e0e0",
    borderTopLeftRadius: 24,
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#f8f9fa",
  },
  featuresTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  featuresGrid: {
    gap: 20,
  },
  featureCard: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#007AFF20",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
    gap: 16,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 18,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 24,
  },
  footer: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  footerContent: {
    flexDirection: "column",
    gap: 24,
  },
  footerBrand: {
    gap: 8,
  },
  footerLogo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footerTagline: {
    fontSize: 16,
    opacity: 0.8,
  },
  footerLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  footerLink: {
    paddingVertical: 4,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 16,
    marginTop: 16,
  },
  footerCopyright: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.6,
  },
});

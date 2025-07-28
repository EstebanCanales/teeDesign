import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { Link, router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { TShirtRenderer } from "@/components/ui/TShirtRenderer";
import designService from "@/lib/design-service";

export interface TShirtColors {
  body: string;
  leftSleeve: string;
  rightSleeve: string;
  collar: string;
}

export default function DesignerScreen() {
  // Estado para los colores de la camiseta
  const [tshirtColors, setTshirtColors] = useState<TShirtColors>({
    body: "#ffffff",
    leftSleeve: "#ffffff",
    rightSleeve: "#ffffff",
    collar: "#ffffff",
  });

  // Estado para el nombre del diseño
  const [designName, setDesignName] = useState<string>("Mi diseño");

  // Estado para indicar que se está guardando
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Colores predefinidos
  const predefinedColors = [
    "#ffffff",
    "#000000",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ffa500",
    "#800080",
    "#008000",
    "#ffc0cb",
    "#a52a2a",
    "#808080",
    "#c0c0c0",
  ];

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

      Alert.alert("Diseño guardado", "Tu diseño se ha guardado correctamente", [
        { text: "OK" },
      ]);
    } catch (error) {
      Alert.alert("Error", "Error al guardar el diseño. Intente nuevamente.", [
        { text: "OK" },
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  // Función para descargar el diseño
  const downloadDesign = () => {
    Alert.alert("Descargar diseño", "Diseño descargado correctamente", [
      { text: "OK" },
    ]);
  };

  // Función para compartir el diseño
  const shareDesign = () => {
    Alert.alert("Compartir diseño", "Enlace copiado al portapapeles", [
      { text: "OK" },
    ]);
  };

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
          Diseñador
        </ThemedText>
        <ThemedView style={styles.headerActions}>
          <TouchableOpacity
            onPress={saveDesign}
            disabled={isSaving}
            style={styles.actionButton}
          >
            {isSaving ? (
              <ThemedText>Guardando...</ThemedText>
            ) : (
              <IconSymbol name="house.fill" size={20} color="#007AFF" />
            )}
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.content}>
        {/* Vista previa de la camiseta */}
        <ThemedView style={styles.previewSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Vista previa
          </ThemedText>
          <ThemedView style={styles.tshirtContainer}>
            <TShirtRenderer colors={tshirtColors} size="lg" />
          </ThemedView>
        </ThemedView>

        {/* Nombre del diseño */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Nombre del diseño
          </ThemedText>
          <TextInput
            style={styles.nameInput}
            value={designName}
            onChangeText={setDesignName}
            placeholder="Ingresa el nombre de tu diseño"
            placeholderTextColor="#999"
          />
        </ThemedView>

        {/* Selector de colores */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Personalizar colores
          </ThemedText>

          {/* Cuerpo */}
          <ThemedView style={styles.colorSection}>
            <ThemedText style={styles.colorLabel}>Cuerpo</ThemedText>
            <ThemedView style={styles.colorGrid}>
              {predefinedColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    tshirtColors.body === color && styles.selectedColor,
                  ]}
                  onPress={() => changeColor("body", color)}
                />
              ))}
            </ThemedView>
          </ThemedView>

          {/* Manga izquierda */}
          <ThemedView style={styles.colorSection}>
            <ThemedText style={styles.colorLabel}>Manga izquierda</ThemedText>
            <ThemedView style={styles.colorGrid}>
              {predefinedColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    tshirtColors.leftSleeve === color && styles.selectedColor,
                  ]}
                  onPress={() => changeColor("leftSleeve", color)}
                />
              ))}
            </ThemedView>
          </ThemedView>

          {/* Manga derecha */}
          <ThemedView style={styles.colorSection}>
            <ThemedText style={styles.colorLabel}>Manga derecha</ThemedText>
            <ThemedView style={styles.colorGrid}>
              {predefinedColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    tshirtColors.rightSleeve === color && styles.selectedColor,
                  ]}
                  onPress={() => changeColor("rightSleeve", color)}
                />
              ))}
            </ThemedView>
          </ThemedView>

          {/* Cuello */}
          <ThemedView style={styles.colorSection}>
            <ThemedText style={styles.colorLabel}>Cuello</ThemedText>
            <ThemedView style={styles.colorGrid}>
              {predefinedColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    tshirtColors.collar === color && styles.selectedColor,
                  ]}
                  onPress={() => changeColor("collar", color)}
                />
              ))}
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Acciones */}
        <ThemedView style={styles.actionsSection}>
          <TouchableOpacity
            onPress={saveDesign}
            disabled={isSaving}
            style={styles.saveButton}
          >
            <IconSymbol name="house.fill" size={20} color="#ffffff" />
            <ThemedText style={styles.saveButtonText}>
              {isSaving ? "Guardando..." : "Guardar diseño"}
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.secondaryActions}>
            <TouchableOpacity
              onPress={downloadDesign}
              style={styles.secondaryButton}
            >
              <IconSymbol name="house.fill" size={20} color="#007AFF" />
              <ThemedText type="link">Descargar</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={shareDesign}
              style={styles.secondaryButton}
            >
              <IconSymbol name="paperplane.fill" size={20} color="#007AFF" />
              <ThemedText type="link">Compartir</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  previewSection: {
    padding: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  tshirtContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  nameInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  colorSection: {
    marginBottom: 24,
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  selectedColor: {
    borderColor: "#007AFF",
    borderWidth: 3,
  },
  actionsSection: {
    padding: 20,
    gap: 16,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
  },
});

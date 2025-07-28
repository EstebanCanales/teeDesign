import React from "react";
import { View, StyleSheet } from "react-native";

export interface TShirtColors {
  body: string;
  leftSleeve: string;
  rightSleeve: string;
  collar: string;
}

export interface TShirtRendererProps {
  colors?: TShirtColors;
  size?: "sm" | "md" | "lg";
}

const defaultColors: TShirtColors = {
  body: "#ffffff",
  leftSleeve: "#ffffff",
  rightSleeve: "#ffffff",
  collar: "#ffffff",
};

export function TShirtRenderer({
  colors = defaultColors,
  size = "md",
}: TShirtRendererProps) {
  // Calcular dimensiones basadas en el tamaño
  const sizeDimensions = {
    sm: { width: 96, height: 128 },
    md: { width: 192, height: 256 },
    lg: { width: 288, height: 384 },
  };

  const dimensions = sizeDimensions[size];

  return (
    <View style={[styles.container, dimensions]}>
      {/* Cuerpo de la camiseta */}
      <View style={[styles.body, { backgroundColor: colors.body }]} />

      {/* Cuello */}
      <View style={[styles.collar, { backgroundColor: colors.collar }]} />

      {/* Manga izquierda */}
      <View
        style={[styles.leftSleeve, { backgroundColor: colors.leftSleeve }]}
      />

      {/* Manga derecha */}
      <View
        style={[styles.rightSleeve, { backgroundColor: colors.rightSleeve }]}
      />

      {/* Contorno de la camiseta */}
      <View style={styles.outline} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  body: {
    position: "absolute",
    top: "15%",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  collar: {
    position: "absolute",
    top: "15%",
    left: "50%",
    width: "25%",
    height: "10%",
    marginLeft: "-12.5%",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  leftSleeve: {
    position: "absolute",
    top: "15%",
    left: 0,
    width: "30%",
    height: "30%",
    borderTopRightRadius: 24,
  },
  rightSleeve: {
    position: "absolute",
    top: "15%",
    right: 0,
    width: "30%",
    height: "30%",
    borderTopLeftRadius: 24,
  },
  outline: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 8,
    pointerEvents: "none",
  },
});

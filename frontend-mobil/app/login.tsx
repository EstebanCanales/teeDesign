import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import authService from "@/lib/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      setIsLoading(true);

      // Usar el servicio de autenticación real
      await authService.login({ email, password });

      Alert.alert("Éxito", "Inicio de sesión exitoso", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol name="chevron.right" size={24} color="#007AFF" />
          <ThemedText type="link">Atrás</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Logo y título */}
      <ThemedView style={styles.logoSection}>
        <ThemedText type="title" style={styles.logo}>
          TeeDesigner
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Inicia sesión para continuar
        </ThemedText>
      </ThemedView>

      {/* Formulario */}
      <ThemedView style={styles.formSection}>
        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Correo electrónico</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Contraseña</ThemedText>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Tu contraseña"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
        >
          <ThemedText style={styles.loginButtonText}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPassword}>
          <ThemedText type="link">¿Olvidaste tu contraseña?</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Separador */}
      <ThemedView style={styles.separator}>
        <ThemedView style={styles.separatorLine} />
        <ThemedText style={styles.separatorText}>o</ThemedText>
        <ThemedView style={styles.separatorLine} />
      </ThemedView>

      {/* Registro */}
      <ThemedView style={styles.registerSection}>
        <ThemedText style={styles.registerText}>
          ¿No tienes una cuenta?
        </ThemedText>
        <Link href="/register" asChild>
          <TouchableOpacity style={styles.registerButton}>
            <ThemedText type="link" style={styles.registerButtonText}>
              Regístrate aquí
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
  },
  logoSection: {
    alignItems: "center",
    marginVertical: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  formSection: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 8,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  separatorText: {
    marginHorizontal: 16,
    color: "#666",
  },
  registerSection: {
    alignItems: "center",
    gap: 8,
  },
  registerText: {
    fontSize: 16,
    color: "#666",
  },
  registerButton: {
    padding: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

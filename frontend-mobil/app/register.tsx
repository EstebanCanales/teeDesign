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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setIsLoading(true);

      // Usar el servicio de autenticación real
      await authService.register({ name, email, password });

      Alert.alert("Éxito", "Cuenta creada exitosamente", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Error al crear la cuenta. Intenta nuevamente.");
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
          Crea tu cuenta para comenzar
        </ThemedText>
      </ThemedView>

      {/* Formulario */}
      <ThemedView style={styles.formSection}>
        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Nombre completo</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Tu nombre completo"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </ThemedView>

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
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Confirmar contraseña</ThemedText>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repite tu contraseña"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ThemedView>

        <TouchableOpacity
          onPress={handleRegister}
          disabled={isLoading}
          style={[
            styles.registerButton,
            isLoading && styles.registerButtonDisabled,
          ]}
        >
          <ThemedText style={styles.registerButtonText}>
            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Separador */}
      <ThemedView style={styles.separator}>
        <ThemedView style={styles.separatorLine} />
        <ThemedText style={styles.separatorText}>o</ThemedText>
        <ThemedView style={styles.separatorLine} />
      </ThemedView>

      {/* Login */}
      <ThemedView style={styles.loginSection}>
        <ThemedText style={styles.loginText}>¿Ya tienes una cuenta?</ThemedText>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <ThemedText type="link" style={styles.loginButtonText}>
              Inicia sesión aquí
            </ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>

      {/* Términos */}
      <ThemedView style={styles.termsSection}>
        <ThemedText style={styles.termsText}>
          Al crear una cuenta, aceptas nuestros{" "}
          <ThemedText type="link">Términos de servicio</ThemedText> y{" "}
          <ThemedText type="link">Política de privacidad</ThemedText>
        </ThemedText>
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
  registerButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  registerButtonDisabled: {
    backgroundColor: "#ccc",
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
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
  loginSection: {
    alignItems: "center",
    gap: 8,
  },
  loginText: {
    fontSize: 16,
    color: "#666",
  },
  loginButton: {
    padding: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  termsSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 18,
  },
});

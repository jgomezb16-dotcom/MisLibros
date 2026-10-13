import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { AuthService } from "../services/AuthService";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }

    setCargando(true);
    try {
      // No navegamos a Home: AppNavigator cambia de pantalla al cambiar la sesión
      await AuthService.iniciarSesion(email.trim(), password);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error al iniciar sesión", mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Mis Libros</Text>

      <TextInput
        style={styles.campo}
        placeholder="Correo"
        placeholderTextColor="#7A7A8C"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.campo}
        placeholder="Contraseña"
        placeholderTextColor="#7A7A8C"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={cargando ? "Ingresando..." : "Iniciar sesión"}
        onPress={iniciarSesion}
        disabled={cargando}
      />

      <View style={styles.separador} />

      <Button title="Crear cuenta" onPress={() => navigation.navigate("Registro")} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#1E1E2E",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    color: "#61DAFB",
    marginBottom: 25,
    textAlign: "center",
  },
  campo: {
    backgroundColor: "#2A2A3E",
    color: "#FFFFFF",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  separador: {
    height: 12,
  },
});
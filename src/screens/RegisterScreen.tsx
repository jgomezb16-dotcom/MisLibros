import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { AuthService } from "../services/AuthService";

type Props = NativeStackScreenProps<RootStackParamList, "Registro">;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const registrar = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setCargando(true);
    try {
      const datos = await AuthService.registrar(email.trim(), password);

      if (!datos.session) {
        // Supabase pide confirmar el correo antes de iniciar sesión
        Alert.alert(
          "Cuenta creada",
          "Revisa tu correo para confirmar la cuenta, luego inicia sesión."
        );
        navigation.navigate("Login");
      }
      // Si hay sesión, AppNavigator cambia a Home automáticamente
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error al registrarse", mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Crear cuenta</Text>

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
        placeholder="Contraseña (mínimo 6 caracteres)"
        placeholderTextColor="#7A7A8C"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={cargando ? "Registrando..." : "Registrarse"}
        onPress={registrar}
        disabled={cargando}
      />

      <View style={styles.separador} />

      <Button title="Ya tengo cuenta" onPress={() => navigation.navigate("Login")} />
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
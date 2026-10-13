import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Session } from "@supabase/supabase-js";
import { AuthService } from "./src/services/AuthService";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Revisa si ya había una sesión guardada al abrir la app
    AuthService.obtenerSesion()
      .then((sesionInicial) => setSession(sesionInicial))
      .finally(() => setCargando(false));

    // Escucha los cambios: login, logout y renovación de sesión
    const desuscribir = AuthService.suscribirse((nuevaSesion) => {
      setSession(nuevaSesion);
    });

    return desuscribir;
  }, []);

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size="large" color="#61DAFB" />
      </View>
    );
  }

  return <AppNavigator session={session} />;
}

const styles = StyleSheet.create({
  cargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2E",
  },
});
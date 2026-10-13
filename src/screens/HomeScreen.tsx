import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { LibroService } from "../services/LibroService";
import { AuthService } from "../services/AuthService";
import { Libro } from "../models/Libro";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const servicio = new LibroService();

function mensajeError(error: unknown): string {
  return error instanceof Error ? error.message : "Ocurrió un error inesperado.";
}

export default function HomeScreen(_props: Props) {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [anio, setAnio] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarLibros = async () => {
    try {
      setLibros(await servicio.listar());
    } catch (error) {
      setMensaje(mensajeError(error));
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const agregarLibro = async () => {
    const anioNumero = Number(anio);

    if (anio.trim() === "" || isNaN(anioNumero)) {
      setMensaje("El año debe ser un número.");
      return;
    }

    try {
      const seAgrego = await servicio.agregar(titulo, autor, anioNumero);

      if (seAgrego === false) {
        setMensaje("Revisa los datos: no pueden quedar vacíos.");
        return;
      }

      setTitulo("");
      setAutor("");
      setAnio("");
      setMensaje("");
      await cargarLibros();
    } catch (error) {
      setMensaje(mensajeError(error));
    }
  };

  const eliminarLibro = async (id: string) => {
    try {
      await servicio.eliminar(id);
      setMensaje("");
      await cargarLibros();
    } catch (error) {
      setMensaje(mensajeError(error));
    }
  };

  const cerrarSesion = async () => {
    try {
      await AuthService.cerrarSesion();
    } catch (error) {
      Alert.alert("Error", mensajeError(error));
    }
  };

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenido}>
      <View style={styles.contenedor}>
        <View style={styles.cabecera}>
          <View>
            <Text style={styles.titulo}>Mis Libros</Text>
            <Text style={styles.subtitulo}>
              {cargando ? "Cargando libros..." : `${libros.length} libros guardados`}
            </Text>
          </View>
          <Pressable style={styles.botonSalir} onPress={cerrarSesion}>
            <Text style={styles.textoSalir}>Cerrar sesión</Text>
          </Pressable>
        </View>

        <View style={styles.formulario}>
          <TextInput
            style={styles.campo}
            placeholder="Título"
            placeholderTextColor="#7A7A8C"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.campo}
            placeholder="Autor"
            placeholderTextColor="#7A7A8C"
            value={autor}
            onChangeText={setAutor}
          />
          <TextInput
            style={styles.campo}
            placeholder="Año"
            placeholderTextColor="#7A7A8C"
            value={anio}
            onChangeText={setAnio}
          />

          <Pressable style={styles.boton} onPress={agregarLibro}>
            <Text style={styles.textoBoton}>Agregar libro</Text>
          </Pressable>

          {mensaje !== "" && <Text style={styles.mensaje}>{mensaje}</Text>}
        </View>

        {libros.map((libro) => (
          <View key={libro.obtenerId()} style={styles.tarjeta}>
            <View style={styles.datos}>
              <Text style={styles.tituloLibro}>{libro.obtenerTitulo()}</Text>
              <Text style={styles.autorLibro}>{libro.obtenerAutor()}</Text>
              <Text style={styles.anioLibro}>{libro.obtenerAnio()}</Text>
            </View>

            <Pressable onPress={() => eliminarLibro(libro.obtenerId())}>
              <Text style={styles.eliminar}>Eliminar</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#1E1E2E",
  },
  contenido: {
    alignItems: "center",
    padding: 20,
  },
  contenedor: {
    width: "100%",
    maxWidth: 600,
  },
  cabecera: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    color: "#61DAFB",
  },
  subtitulo: {
    fontSize: 14,
    color: "#7A7A8C",
  },
  botonSalir: {
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  textoSalir: {
    color: "#FF6B6B",
    fontSize: 13,
  },
  formulario: {
    backgroundColor: "#2A2A3E",
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
  },
  campo: {
    backgroundColor: "#1E1E2E",
    color: "#FFFFFF",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  boton: {
    backgroundColor: "#61DAFB",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
  },
  textoBoton: {
    color: "#1E1E2E",
    fontSize: 15,
  },
  mensaje: {
    color: "#FF6B6B",
    fontSize: 13,
    marginTop: 10,
  },
  tarjeta: {
    backgroundColor: "#2A2A3E",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  datos: {
    flex: 1,
  },
  tituloLibro: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  autorLibro: {
    fontSize: 14,
    color: "#A0A0B8",
    marginTop: 2,
  },
  anioLibro: {
    fontSize: 13,
    color: "#7A7A8C",
    marginTop: 4,
  },
  eliminar: {
    color: "#FF6B6B",
    fontSize: 14,
    marginLeft: 15,
  },
});
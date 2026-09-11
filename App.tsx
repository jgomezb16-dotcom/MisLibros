import { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { LibroService } from "./src/services/LibroService";
import { Libro } from "./src/models/Libro";

const servicio = new LibroService();
servicio.agregar("Cien años de soledad", "Gabriel García Márquez", 1967);
servicio.agregar("El señor Presidente", "Miguel Ángel Asturias", 1946);

export default function App() {
  const [libros, setLibros] = useState<Libro[]>(servicio.listar());
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [anio, setAnio] = useState("");
  const [mensaje, setMensaje] = useState("");

  const agregarLibro = () => {
    const anioNumero = Number(anio);

    if (anio.trim() === "" || isNaN(anioNumero)) {
      setMensaje("El año debe ser un número.");
      return;
    }

    const seAgrego = servicio.agregar(titulo, autor, anioNumero);

    if (seAgrego === false) {
      setMensaje("Revisa los datos: no pueden quedar vacíos.");
      return;
    }

    setLibros(servicio.listar());
    setTitulo("");
    setAutor("");
    setAnio("");
    setMensaje("");
  };

  const eliminarLibro = (id: string) => {
    servicio.eliminar(id);
    setLibros(servicio.listar());
    setMensaje("");
  };

  return (
    <View style={styles.pantalla}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Mis Libros</Text>
        <Text style={styles.subtitulo}>{libros.length} libros guardados</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#1E1E2E",
    alignItems: "center",
    padding: 20,
  },
  contenedor: {
    width: "100%",
    maxWidth: 600,
  },
  titulo: {
    fontSize: 28,
    color: "#61DAFB",
  },
  subtitulo: {
    fontSize: 14,
    color: "#7A7A8C",
    marginBottom: 20,
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
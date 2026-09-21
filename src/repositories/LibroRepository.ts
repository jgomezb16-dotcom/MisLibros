import { Libro } from "../models/Libro";

export class LibroRepository {
  private static instancia: LibroRepository;

  // Fuente de datos simulada (mock)
  private libros: Libro[] = [
    new Libro("libro-1", "Cien años de soledad", "Gabriel García Márquez", 1967),
    new Libro("libro-2", "El señor Presidente", "Miguel Ángel Asturias", 1946),
  ];
  private contador: number = 2;

  private constructor() {}

  public static getInstance(): LibroRepository {
    if (!LibroRepository.instancia) {
      LibroRepository.instancia = new LibroRepository();
    }
    return LibroRepository.instancia;
  }

  public obtenerLibros(): Libro[] {
    return [...this.libros];
  }

  public agregarLibro(titulo: string, autor: string, anio: number): Libro[] {
    this.contador = this.contador + 1;
    const id = "libro-" + this.contador;

    const nuevo = new Libro(id, titulo, autor, anio);
    this.libros = [...this.libros, nuevo];
    return this.obtenerLibros();
  }

  public eliminarLibro(id: string): Libro[] {
    const restantes: Libro[] = [];

    for (const libro of this.libros) {
      if (libro.obtenerId() !== id) {
        restantes.push(libro);
      }
    }

    this.libros = restantes;
    return this.obtenerLibros();
  }
}
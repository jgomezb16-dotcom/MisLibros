import { supabase } from "../lib/supabase";
import { Libro } from "../models/Libro";

interface FilaLibro {
  id: number;
  titulo: string;
  autor: string;
  anio: number;
}

export class LibroRepository {
  private static instancia: LibroRepository;

  private constructor() {}

  public static getInstance(): LibroRepository {
    if (!LibroRepository.instancia) {
      LibroRepository.instancia = new LibroRepository();
    }
    return LibroRepository.instancia;
  }

  // Convierte una fila de Supabase en un objeto Libro
  private aLibro(fila: FilaLibro): Libro {
    return new Libro(String(fila.id), fila.titulo, fila.autor, fila.anio);
  }

  public async obtenerLibros(): Promise<Libro[]> {
    const { data, error } = await supabase
      .from("libros")
      .select("id, titulo, autor, anio")
      .order("id", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data as FilaLibro[]).map((fila) => this.aLibro(fila));
  }

  public async agregarLibro(titulo: string, autor: string, anio: number): Promise<Libro[]> {
    const { error } = await supabase
      .from("libros")
      .insert({ titulo, autor, anio });

    if (error) {
      throw new Error(error.message);
    }

    return this.obtenerLibros();
  }

  public async eliminarLibro(id: string): Promise<Libro[]> {
    const { error } = await supabase
      .from("libros")
      .delete()
      .eq("id", Number(id));

    if (error) {
      throw new Error(error.message);
    }

    return this.obtenerLibros();
  }
}
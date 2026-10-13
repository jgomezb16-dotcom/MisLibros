import { Libro } from "../models/Libro";
import { LibroRepository } from "../repositories/LibroRepository";

export class LibroService {
  private repositorio: LibroRepository = LibroRepository.getInstance();

  constructor() {
    // Prueba del Singleton: dos llamadas deben devolver el mismo objeto
    const instancia1 = LibroRepository.getInstance();
    const instancia2 = LibroRepository.getInstance();
    console.log("Prueba Singleton - ¿Es la misma instancia?", instancia1 === instancia2);
  }

  public async listar(): Promise<Libro[]> {
    return this.repositorio.obtenerLibros();
  }

  public async agregar(titulo: string, autor: string, anio: number): Promise<boolean> {
    if (titulo.trim() === "") {
      return false;
    }
    if (autor.trim() === "") {
      return false;
    }
    if (anio <= 0) {
      return false;
    }

    await this.repositorio.agregarLibro(titulo.trim(), autor.trim(), anio);
    return true;
  }

  public async eliminar(id: string): Promise<void> {
    await this.repositorio.eliminarLibro(id);
  }

  public async total(): Promise<number> {
    const libros = await this.repositorio.obtenerLibros();
    return libros.length;
  }
}
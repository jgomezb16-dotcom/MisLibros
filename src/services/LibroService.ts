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

  public listar(): Libro[] {
    return this.repositorio.obtenerLibros();
  }

  public agregar(titulo: string, autor: string, anio: number): boolean {
    if (titulo.trim() === "") {
      return false;
    }
    if (autor.trim() === "") {
      return false;
    }
    if (anio <= 0) {
      return false;
    }

    this.repositorio.agregarLibro(titulo.trim(), autor.trim(), anio);
    return true;
  }

  public eliminar(id: string): void {
    this.repositorio.eliminarLibro(id);
  }

  public total(): number {
    return this.repositorio.obtenerLibros().length;
  }
}
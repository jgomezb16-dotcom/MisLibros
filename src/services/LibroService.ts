import { Libro } from "../models/Libro";

export class LibroService {
  private libros: Libro[] = [];
  private contador: number = 0;

  public listar(): Libro[] {
    return [...this.libros];
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

    this.contador = this.contador + 1;
    const id = "libro-" + this.contador;

    const nuevo = new Libro(id, titulo.trim(), autor.trim(), anio);
    this.libros = [...this.libros, nuevo];
    return true;
  }

  public eliminar(id: string): void {
    const restantes: Libro[] = [];

    for (const libro of this.libros) {
      if (libro.obtenerId() !== id) {
        restantes.push(libro);
      }
    }

    this.libros = restantes;
  }

  public total(): number {
    return this.libros.length;
  }
}
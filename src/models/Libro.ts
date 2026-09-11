export class Libro {
  private id: string;
  private titulo: string;
  private autor: string;
  private anio: number;

  constructor(id: string, titulo: string, autor: string, anio: number) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
  }

  public obtenerId(): string {
    return this.id;
  }

  public obtenerTitulo(): string {
    return this.titulo;
  }

  public obtenerAutor(): string {
    return this.autor;
  }

  public obtenerAnio(): number {
    return this.anio;
  }

  public obtenerFicha(): string {
    return `${this.titulo} - ${this.autor} (${this.anio})`;
  }
}
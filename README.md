# Mis Libros

Programación II
Tarea No. 5 - POO y Separación de Responsabilidades
Tarea No. 6 - Repository y Singleton

App hecha con React Native, Expo y TypeScript. Sirve para ver una lista de
libros, agregar uno nuevo y eliminarlo.

## Cómo ejecutarlo

```
npm install
npm run web
```

## Estructura

```
MisLibros/
├── App.tsx
└── src/
    ├── models/
    │   └── Libro.ts
    ├── services/
    │   └── LibroService.ts
    └── repositories/
        └── LibroRepository.ts
```

## Cambios Tarea 6

- Hice la carpeta repositories con LibroRepository.ts
- Pasé el arreglo de libros al repository, ahí se obtienen, agregan y eliminan
- Los libros de ejemplo ahora están en el repository y ya no en App.tsx
- LibroService ahora solo valida y llama al repository
- LibroRepository es Singleton y LibroService lo agarra con getInstance()
- Para probar el Singleton llamé dos veces a getInstance() y los comparé, en consola sale true
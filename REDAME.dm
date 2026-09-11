# Mis Libros

Tarea No. 5 - POO y Separación de Responsabilidades
Programación II

App hecha con React Native, Expo y TypeScript. Sirve para ver una lista de
libros, agregar uno nuevo y eliminarlo.

## Cómo ejecutarlo

npm install
npm run web

## Estructura

MisLibros/
├── App.tsx
└── src/
    ├── models/
    │   └── Libro.ts
    └── services/
        └── LibroService.ts

## Reflexión

### ¿Por qué es conveniente separar la lógica de los libros de App.tsx?

Porque cada archivo se cambia por aparte. Cuando le puse los campos de texto y el
botón solo trabajé en App.tsx, no tuve que abrir los otros dos.

### ¿Qué responsabilidad tiene LibroService?

Manejar varios libros. Ahí está el arreglo y ahí pasa lo de agregar y eliminar.
También le pone el id a cada uno.

### ¿Qué responsabilidad tiene la clase Libro?

Representar un solo libro. Guarda sus datos y los protege con private, y tiene
obtenerFicha() para armar el texto que se muestra.

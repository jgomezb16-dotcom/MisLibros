# Mis Libros

App móvil hecha con React Native, Expo y TypeScript. Los libros se guardan en Supabase y para usarla hay que iniciar sesión.

## Tecnologías

React Native con Expo, TypeScript, Supabase (base de datos, autenticación y RLS) y React Navigation.

## Configuración de Supabase

Primero creé un proyecto en supabase.com y luego la tabla `libros`:

```sql
create table public.libros (
  id bigint generated always as identity primary key,
  titulo text not null,
  autor text not null,
  anio int not null
);

alter table public.libros enable row level security;
```

Después di permisos solo al rol `authenticated` y creé las políticas:

```sql
grant select, insert, delete on public.libros to authenticated;
grant usage, select on sequence public.libros_id_seq to authenticated;

create policy "Usuarios autenticados consultan libros"
on public.libros for select to authenticated using (true);

create policy "Usuarios autenticados agregan libros"
on public.libros for insert to authenticated with check (true);

create policy "Usuarios autenticados eliminan libros"
on public.libros for delete to authenticated using (true);
```

En el panel de Supabase, en Authentication, Sign In / Providers, Email, desactivé "Confirm email" para poder probar el registro sin confirmar el correo.

## Variables de entorno

El archivo `.env` va en la raíz del proyecto. No se sube a GitHub porque está en `.gitignore`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=TU_PUBLISHABLE_KEY
```

## Cómo ejecutarla

```bash
npm install
npx expo start -c
```

Después se puede abrir con Expo Go en el celular o presionando `w` para verla en el navegador.

## Estructura

- `src/lib/`: cliente de Supabase.
- `src/models/`: clase `Libro`.
- `src/repositories/`: `LibroRepository`, con el patrón Singleton, que hace las consultas a Supabase.
- `src/services/`: `LibroService` con las validaciones y `AuthService` con registro, login y logout.
- `src/navigation/`: `AppNavigator` y los tipos de las rutas.
- `src/screens/`: `LoginScreen`, `RegisterScreen` y `HomeScreen`.

## Autenticación y acceso a los datos

La autenticación dice quién es el usuario, y los permisos dicen qué puede hacer.

Sin sesión, las peticiones llegan con el rol `anon`, que no tiene permisos sobre `libros`, así que Supabase responde con `permission denied`. Al iniciar sesión, Supabase entrega un token y las peticiones pasan al rol `authenticated`.

Los `GRANT` deciden si ese rol puede usar la tabla. Las políticas RLS deciden qué filas puede consultar, agregar o eliminar. En este caso, cualquier usuario autenticado puede hacer las tres operaciones sobre todas las filas.

La navegación también depende de la sesión. `App.tsx` escucha los cambios con `onAuthStateChange()` y `AppNavigator` muestra Home si hay sesión, o Login y Registro si no la hay. Por eso el login no navega a Home manualmente.

## Capturas

- `capturas/registro.png`: registro funcionando.
- `capturas/login.png`: login funcionando.
- `capturas/libros-supabase.png`: libros guardados en Supabase.
- `capturas/cierre-sesion.png`: cierre de sesión.

## Autor

Jenner Gómez
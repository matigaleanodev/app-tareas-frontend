# Frontend - Gestor de Tareas

Aplicación web desarrollada con **Angular Standalone** para gestionar tareas asociadas a un usuario autenticado mediante token personalizado de Firebase. Consume la [API de tareas](https://github.com/matigaleanodev/api-tareas) como backend.

## Requisitos

Asegurate de tener instalado lo siguiente:

[![Node.js](https://img.shields.io/badge/Node.js-v22.x-brightgreen)](https://nodejs.org/)
[![Angular](https://img.shields.io/badge/Angular-v19+-dd0031)](https://angular.io/)
[![Firebase Web](https://img.shields.io/badge/Firebase-Web%20SDK-yellow)](https://firebase.google.com/docs/web/setup)

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/matigaleanodev/app-tareas-frontend
   cd app-tareas-frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura el archivo `environment.ts` con tu API:

   `src/environments/environment.ts`:

   ```ts
   export const environment = {
     API: "https://tu-api-url.com",
   };
   ```

## Desarrollo

Para correr el proyecto en modo desarrollo:

```bash
npm start
```

## Tests

Para ejecutar los tests unitarios con Karma:

```bash
npm test
```

Se abrirá el navegador y se ejecutarán los tests automáticamente. El reporte se puede ver en consola y también gráficamente.

## Funcionalidades

- ✅ Login con email (custom token de Firebase)
- ✅ Listado, creación, edición y eliminación de tareas
- ✅ Interfaz creada Angular Standalone y Tailwind
- ✅ Protección de rutas según autenticación
- ✅ Almacenamiento local del usuario

---

> Proyecto creado por [Matias Galeano](https://github.com/matigaleanodev) 🚀

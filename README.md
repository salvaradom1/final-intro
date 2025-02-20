# GameFinder API
### descripción

Game Finder es una API RESTFUL que permite al usuario actualizar y eliminar videojuegos, consolas y DLCs en la base de datos mediante solicitudes HTTP. Facilita la administración de videojuegos, proporcionando datos detallados sobre cada entidad.
 
### Integrantes:
 
 - Sofia Alvarado
 - Francisco Segura

### Tecnologías utilizadas

- Frontend: HTML
- Backend: Node.js, Express
- Base de datos: postgress

### Herramientas utilizadas

- Frontend: bootstrap
- Backend: Bruno, Prisma
- DevOps: Docker Compose

### Instrucciones para correr el proyecto

Antes de ejecutar el proyecto, hay que tener instaladas las siguientes herramientas:

- Docker (última versión)
- Node.js

**Pasos para levantar el proyecto localmente:**

1. Clonar el repositorio:

```bash
git clone <clave_ssh>
```


2. Entrar en el directorio del proyecto:

```bash
cd <direccion-repositorio>
```

3. cambiar el nombre del archivo 'example.env' a '.env' y modificar los datos de acuerdo con tu base de datos:

```bash
cp .example.env .env
```

4. Instalar las dependencias del proyecto:

```bash
npm install
```

5. Generar el cliente de Prisma:

```bash
npx prisma generate
```

6. Aplicar las migraciones para crear las tablas en la base de datos:

```bash
npx prisma migrate dev
```

7. Levantar el servidor del Backend:

```bash
npm run dev
```

8. Levantar el servidor del Frontend (en una terminal aparte):

```bash
cd <direccion-repositorio>
cd Frontend
npm install
npm run start

```

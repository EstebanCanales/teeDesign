# TeeDesigner API

API RESTful para la aplicación TeeDesigner, que permite a los usuarios crear, compartir y gestionar diseños de camisetas personalizados.

## Tecnologías

- Node.js y TypeScript
- Express
- MongoDB con Mongoose
- JWT para autenticación
- Bun como runtime y gestor de paquetes

## Requisitos

- [Bun](https://bun.sh/) (v1.0.0 o superior)
- MongoDB (local o remoto)

## Configuración

1. Clona el repositorio:

```bash
git clone https://github.com/tuusuario/TeeDesigner-Api.git
cd TeeDesigner-Api
```

2. Instala las dependencias:

```bash
bun install
```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Configuración de la base de datos
MONGODB_URI=mongodb://localhost:27017/tee-designer

# JWT para autenticación
JWT_SECRET=tu_secreto_jwt_muy_seguro
JWT_EXPIRATION=7d
```

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
bun start
```

## Estructura del Proyecto

```
src/
├── domain/          # Entidades, modelos y definición de interfaces
│   ├── schemas/     # Schemas de MongoDB
│   ├── repositories/ # Interfaces y clases para acceso a datos
│   └── interfaces/  # Interfaces de la aplicación
├── application/     # Lógica de negocio
│   └── services/    # Servicios para implementar casos de uso
├── infrastructure/  # Implementaciones técnicas
│   ├── database/    # Conexiones y configuraciones de base de datos
│   └── web/         # Servidor Express
├── presentation/    # Capa de presentación
│   ├── controllers/ # Controladores de la API
│   ├── middlewares/ # Middlewares para Express
│   └── routes/      # Definición de rutas
└── main.ts          # Punto de entrada de la aplicación
```

## API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar un nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener información del usuario autenticado

### Usuarios

- `GET /api/users/profile` - Obtener el perfil del usuario actual
- `PUT /api/users/profile` - Actualizar el perfil del usuario actual

### Diseños

- `GET /api/designs/public` - Listar todos los diseños públicos
- `GET /api/designs/:id` - Obtener un diseño específico
- `POST /api/designs` - Crear un nuevo diseño
- `PUT /api/designs/:id` - Actualizar un diseño existente
- `DELETE /api/designs/:id` - Eliminar un diseño
- `GET /api/designs/user/mine` - Obtener los diseños del usuario actual
- `GET /api/designs/search` - Buscar diseños por nombre

## Licencia

MIT

```bash

src/
├── domain/
│   ├── entities/
│   │   ├── user.entity.ts
│   │   ├── teeDesign.entity.ts
│   │   └── vote.entity.ts
│   ├── repositories/
│   │   ├── IUserRepository.ts
│   │   └── ITeeDesignRepository.ts
│   └── useCases/
│       ├── CreateUser.ts
│       ├── GetUserById.ts
│       ├── CreateTeeDesign.ts
│       ├── GetTeeDesigns.ts
│       ├── VoteTeeDesign.ts
│       └── GetUserProfile.ts
├── application/
│   ├── services/
│   │   ├── UserService.ts
│   │   ├── TeeDesignService.ts
│   │   └── AuthService.ts
│   └── dtos/
│       ├── CreateUserDto.ts
│       ├── LoginDto.ts
│       └── TeeDesignDto.ts
├── infrastructure/
│   ├── database/
│   │   ├── mongoose/
│   │   │   ├── mongoose.connection.ts
│   │   │   └── schemas/
│   │   │       ├── user.schema.ts
│   │   │       ├── teeDesign.schema.ts
│   │   │       └── userProfile.schema.ts
│   │   └── repositories/
│   │       ├── UserRepository.ts
│   │       └── TeeDesignRepository.ts
│   ├── security/
│   │   ├── jwt.service.ts
│   │   └── bcrypt.service.ts
│   └── config/
│       ├── environment.ts
│       └── server.ts
├── presentation/
│   ├── api/
│   │   ├── controllers/
│   │   │   ├── user.controller.ts
│   │   │   ├── teeDesign.controller.ts
│   │   │   └── auth.controller.ts
│   │   └── routes/
│   │       ├── user.routes.ts
│   │       ├── teeDesign.routes.ts
│   │       └── auth.routes.ts
│   └── frontend/
│       ├── views/
│       │   ├── login.view.ts
│       │   ├── register.view.ts
│       │   └── design.view.ts
│       └── services/
│           └── api.service.ts
└── main.ts

```

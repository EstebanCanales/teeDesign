# 👕 TeeDesigner

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D5.0.0-blue)
![React](https://img.shields.io/badge/react-19.0.0-blue)
![Next.js](https://img.shields.io/badge/next.js-15.3.3-black)
![React Native](https://img.shields.io/badge/react--native-0.79.5-blue)
![Express](https://img.shields.io/badge/express-5.1.0-green)
![MongoDB](https://img.shields.io/badge/mongodb-6.17.0-green)

**Una plataforma completa para diseñar camisetas personalizadas con aplicaciones web, móvil y API backend**

</div>

## 🎯 Descripción del Proyecto

TeeDesigner es una plataforma innovadora que permite a los usuarios crear, personalizar y compartir diseños de camisetas de manera intuitiva. La aplicación cuenta con tres componentes principales: una aplicación web moderna, una aplicación móvil multiplataforma y una API backend robusta.

### ✨ Características Principales

- 🎨 **Diseñador Interactivo**: Herramienta visual para personalizar colores de camisetas en tiempo real
- 👥 **Galería Comunitaria**: Explora y comparte diseños con otros usuarios
- 🔐 **Autenticación Segura**: Sistema completo de registro e inicio de sesión con JWT
- 📱 **Multiplataforma**: Aplicaciones web y móvil con diseño responsive
- 💾 **Gestión de Diseños**: Guarda, edita y organiza tus creaciones
- 🌙 **Modo Oscuro/Claro**: Soporte completo para ambos temas
- 🔍 **Búsqueda Avanzada**: Encuentra diseños por nombre, autor o características
- ❤️ **Sistema de Likes**: Interactúa con diseños de la comunidad
- 📊 **Estadísticas**: Visualiza vistas y likes de tus diseños

## 📱 Capturas de Pantalla y Demo

> 🚧 **En desarrollo**: Las capturas de pantalla y demos estarán disponibles próximamente.

## 🛠️ Tecnologías Utilizadas

### 🔧 Backend API
- **Runtime**: Node.js con TypeScript
- **Framework**: Express.js 5.1.0
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Seguridad**: bcryptjs para hash de contraseñas
- **Gestión de Archivos**: Multer para uploads
- **Arquitectura**: Clean Architecture (Domain, Application, Infrastructure, Presentation)

### 🌐 Frontend Web
- **Framework**: Next.js 15.3.3 con App Router
- **UI Library**: React 19.0.0
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui con Radix UI
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Testing**: Cypress (E2E)

### 📱 Frontend Móvil
- **Framework**: React Native 0.79.5
- **Plataforma**: Expo ~53.0.20
- **Navegación**: Expo Router 5.1.4
- **Lenguaje**: TypeScript
- **Almacenamiento**: AsyncStorage
- **Iconos**: Expo Vector Icons
- **Animaciones**: React Native Reanimated

## 🏗️ Arquitectura del Proyecto

```
teeDesign/
├── 🗄️ backend/                 # API RESTful
│   ├── src/
│   │   ├── domain/             # Entidades y reglas de negocio
│   │   ├── application/        # Casos de uso y servicios
│   │   ├── infrastructure/     # Base de datos y servicios externos
│   │   ├── presentation/       # Controladores y rutas
│   │   └── main.ts            # Punto de entrada
│   └── package.json
│
├── 🌐 frontend-web/            # Aplicación web Next.js
│   ├── src/
│   │   ├── app/               # Rutas y páginas (App Router)
│   │   ├── components/        # Componentes reutilizables
│   │   └── lib/              # Utilidades y servicios
│   └── package.json
│
├── 📱 frontend-mobil/          # Aplicación móvil React Native
│   ├── app/                   # Pantallas de la aplicación
│   ├── components/            # Componentes compartidos
│   ├── lib/                   # Servicios y utilidades
│   └── package.json
│
└── README.md                  # Este archivo
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- **Node.js** 18.0.0 o superior
- **npm** o **bun** (recomendado)
- **MongoDB** (local o remoto)
- **Expo CLI** (para desarrollo móvil)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/EstebanCanales/teeDesign.git
cd teeDesign
```

### 2. Configurar el Backend

```bash
cd backend
npm install

# Crear archivo de configuración
cp .env.example .env

# Configurar variables de entorno en .env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/tee-designer
JWT_SECRET=tu_secreto_jwt_muy_seguro
JWT_EXPIRATION=7d
```

### 3. Configurar el Frontend Web

```bash
cd ../frontend-web
npm install

# Crear archivo de configuración (opcional)
cp .env.example .env.local

# Configurar API URL si es necesario
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4. Configurar la Aplicación Móvil

```bash
cd ../frontend-mobil
npm install

# Instalar Expo CLI globalmente si no está instalado
npm install -g @expo/cli
```

## 🎮 Uso

### Iniciar el Backend

```bash
cd backend
npm start
# Servidor disponible en http://localhost:4000
```

### Iniciar la Aplicación Web

```bash
cd frontend-web
npm run dev
# Aplicación disponible en http://localhost:3000
```

### Iniciar la Aplicación Móvil

```bash
cd frontend-mobil
npm start

# Luego selecciona la plataforma:
# - Presiona 'a' para Android
# - Presiona 'i' para iOS  
# - Presiona 'w' para web
```

### Ejecutar en Modo Producción

```bash
# Backend
cd backend && npm start

# Frontend Web
cd frontend-web && npm run build && npm start

# Frontend Móvil
cd frontend-mobil && expo build
```

## 📚 Documentación de la API

### 🔐 Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/me` | Obtener usuario autenticado |

### 👤 Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users/profile` | Obtener perfil del usuario |
| PUT | `/api/users/profile` | Actualizar perfil del usuario |

### 🎨 Diseños

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/designs/public` | Listar diseños públicos |
| GET | `/api/designs/:id` | Obtener diseño específico |
| POST | `/api/designs` | Crear nuevo diseño |
| PUT | `/api/designs/:id` | Actualizar diseño |
| DELETE | `/api/designs/:id` | Eliminar diseño |
| GET | `/api/designs/user/mine` | Obtener diseños del usuario |
| GET | `/api/designs/search` | Buscar diseños |

### 📝 Ejemplo de Payload

```json
{
  "name": "Mi Diseño Awesome",
  "colors": {
    "body": "#ffffff",
    "leftSleeve": "#ff0000",
    "rightSleeve": "#0000ff",
    "collar": "#000000"
  },
  "isPublic": true
}
```

## 🧪 Testing

### Frontend Web

```bash
cd frontend-web

# Linting
npm run lint

# Pruebas E2E con Cypress
npm run cypress:open    # Modo interactivo
npm run cypress:run     # Modo headless
npm run test:e2e        # Con servidor local
```

### Frontend Móvil

```bash
cd frontend-mobil

# Linting
npm run lint
```

## 🤝 Contribución

¡Contribuciones son bienvenidas! Por favor sigue estos pasos:

1. **Fork** el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commitea tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### 📋 Guidelines de Contribución

- Sigue los estándares de código existentes
- Escribe pruebas para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Usa mensajes de commit descriptivos
- Asegúrate de que las pruebas pasen antes de enviar

## 🗺️ Roadmap

### 🎯 Próximas Características

- [ ] **Texto Personalizable**: Agregar texto a los diseños de camisetas
- [ ] **Subida de Imágenes**: Permitir logos e imágenes personalizadas
- [ ] **Plantillas Predefinidas**: Biblioteca de plantillas de diseño
- [ ] **Filtros Avanzados**: Filtros por color, categoría, popularidad
- [ ] **Notificaciones Push**: Notificaciones para nuevos likes y comentarios
- [ ] **Compartir en Redes Sociales**: Integración con Facebook, Instagram, Twitter
- [ ] **Modo Offline**: Funcionalidad sin conexión para la app móvil
- [ ] **Colaboración**: Diseños colaborativos entre usuarios
- [ ] **Marketplace**: Venta de diseños premium
- [ ] **AR Preview**: Vista previa en realidad aumentada

### 🔧 Mejoras Técnicas

- [ ] **Optimización de Performance**: Lazy loading y caching
- [ ] **PWA**: Convertir la web app en Progressive Web App
- [ ] **GraphQL**: Migración de REST a GraphQL
- [ ] **Microservicios**: Dividir el backend en microservicios
- [ ] **CI/CD**: Pipeline de integración y despliegue continuo
- [ ] **Testing Coverage**: Aumentar cobertura de pruebas al 90%
- [ ] **Documentación API**: Swagger/OpenAPI para la documentación
- [ ] **Monitoring**: Implementar logging y monitoreo avanzado

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

**Mantenedor Principal**: [Esteban Canales](https://github.com/EstebanCanales)

- 📧 **Email**: [Contactar via GitHub](https://github.com/EstebanCanales)
- 🐙 **GitHub**: [@EstebanCanales](https://github.com/EstebanCanales)
- 🔗 **Proyecto**: [https://github.com/EstebanCanales/teeDesign](https://github.com/EstebanCanales/teeDesign)

---

<div align="center">

**¡Gracias por usar TeeDesigner! 🎨✨**

*Si este proyecto te ha sido útil, ¡dale una ⭐ en GitHub!*

</div>

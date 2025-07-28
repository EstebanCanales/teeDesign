# 🎨 TeeDesigner

<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**Una plataforma completa para diseñar y compartir camisetas personalizadas**

[Demo](#-demo) • [Características](#-características) • [Instalación](#-instalación) • [API](#-api-reference) • [Contribuir](#-contribuir)

</div>

---

## 📋 Descripción

TeeDesigner es una aplicación completa que permite a los usuarios crear, personalizar y compartir diseños de camisetas de manera intuitiva. El proyecto incluye una aplicación móvil desarrollada en React Native, una aplicación web, y un backend robusto con API RESTful.

### 🎯 Propósito

- **Creatividad sin límites**: Herramientas intuitivas para diseñar camisetas únicas
- **Comunidad creativa**: Plataforma para compartir y descubrir diseños
- **Multiplataforma**: Acceso desde dispositivos móviles y web
- **Experiencia moderna**: Interfaz limpia y responsive

---

## ✨ Características

### 🎨 **Diseño Interactivo**
- Editor visual en tiempo real
- Personalización de colores por zonas (cuerpo, mangas, cuello)
- Vista previa instantánea de los cambios
- Guardado automático de diseños

### 👥 **Comunidad y Compartir**
- Galería pública de diseños
- Sistema de likes y visualizaciones
- Búsqueda avanzada de diseños
- Perfiles de usuarios creativos

### 🔐 **Autenticación Segura**
- Registro e inicio de sesión con JWT
- Gestión segura de sesiones
- Perfiles de usuario personalizables
- Protección de datos

### 📱 **Multiplataforma**
- Aplicación móvil (iOS/Android) con React Native
- Aplicación web responsive
- Sincronización entre dispositivos
- API unificada

---

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js con Bun
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Arquitectura**: Clean Architecture con DDD

### Frontend Móvil
- **Framework**: React Native
- **Plataforma**: Expo
- **Navegación**: Expo Router
- **Almacenamiento**: AsyncStorage
- **Lenguaje**: TypeScript

### Frontend Web
- **Framework**: Next.js / React
- **Lenguaje**: TypeScript
- **Estilos**: CSS Modules / Styled Components

---

## 🏗️ Arquitectura del Proyecto

```
teeDesign/
├── 📁 backend/              # API RESTful y lógica de negocio
│   ├── src/
│   │   ├── domain/          # Entidades y reglas de negocio
│   │   ├── application/     # Casos de uso y servicios
│   │   ├── infrastructure/  # Bases de datos y servicios externos
│   │   └── presentation/    # Controladores y rutas API
│   └── README.md
├── 📁 frontend-mobil/       # Aplicación móvil React Native
│   ├── app/                 # Páginas y navegación
│   ├── components/          # Componentes reutilizables
│   ├── lib/                 # Servicios y utilidades
│   └── README.md
├── 📁 frontend-web/         # Aplicación web
└── README.md               # Documentación principal
```

---

## 🚀 Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Bun](https://bun.sh/) (v1.0.0 o superior)
- [MongoDB](https://www.mongodb.com/) (local o remoto)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (para móvil)

### 1. Clonar el repositorio

```bash
git clone https://github.com/EstebanCanales/teeDesign.git
cd teeDesign
```

### 2. Configurar el Backend

```bash
cd backend
bun install
```

Crear archivo `.env`:

```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# Base de datos
MONGODB_URI=mongodb://localhost:27017/tee-designer

# JWT
JWT_SECRET=tu_secreto_jwt_muy_seguro
JWT_EXPIRATION=7d
```

Iniciar el servidor:

```bash
bun start
```

### 3. Configurar la Aplicación Móvil

```bash
cd ../frontend-mobil
npm install
npm start
```

### 4. Configurar la Aplicación Web

```bash
cd ../frontend-web
npm install
npm run dev
```

---

## 🎮 Uso

### Backend API
El servidor estará disponible en `http://localhost:3000`

### Aplicación Móvil
- Escanea el código QR con Expo Go
- O ejecuta en simulador con `npm run ios` / `npm run android`

### Aplicación Web
Accede a `http://localhost:3001` (o el puerto configurado)

---

## 📚 API Reference

### 🔐 Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |
| `GET` | `/api/auth/me` | Obtener usuario actual |

### 👤 Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/users/profile` | Obtener perfil |
| `PUT` | `/api/users/profile` | Actualizar perfil |

### 🎨 Diseños

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/designs/public` | Listar diseños públicos |
| `GET` | `/api/designs/:id` | Obtener diseño específico |
| `POST` | `/api/designs` | Crear nuevo diseño |
| `PUT` | `/api/designs/:id` | Actualizar diseño |
| `DELETE` | `/api/designs/:id` | Eliminar diseño |
| `GET` | `/api/designs/user/mine` | Mis diseños |
| `GET` | `/api/designs/search` | Buscar diseños |

### 📊 Ejemplo de Diseño

```typescript
interface TeeDesign {
  id?: string;
  name: string;
  colors: {
    body: string;
    leftSleeve: string;
    rightSleeve: string;
    collar: string;
  };
  isPublic: boolean;
  creator?: {
    id: string;
    name: string;
  };
  likes?: number;
  views?: number;
}
```

---

## 🗺️ Roadmap

### 🎯 Próximas Características

- [ ] **Edición Avanzada**
  - [ ] Subida de imágenes personalizadas
  - [ ] Texto personalizable con fuentes
  - [ ] Capas y efectos
  - [ ] Plantillas prediseñadas

- [ ] **Social y Colaboración**
  - [ ] Comentarios en diseños
  - [ ] Seguir a otros diseñadores
  - [ ] Colaboraciones en tiempo real
  - [ ] Compartir en redes sociales

- [ ] **Funcionalidades Móviles**
  - [ ] Modo offline
  - [ ] Notificaciones push
  - [ ] Cámara para texturas
  - [ ] AR preview

- [ ] **Comercio**
  - [ ] Marketplace de diseños
  - [ ] Sistema de pagos
  - [ ] Impresión bajo demanda
  - [ ] Comisiones para diseñadores

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Aquí te explicamos cómo participar:

### 1. Fork del proyecto
```bash
git clone https://github.com/tu-usuario/teeDesign.git
```

### 2. Crear rama para tu feature
```bash
git checkout -b feature/AmazingFeature
```

### 3. Commit de cambios
```bash
git commit -m 'Add: Increíble nueva característica'
```

### 4. Push a la rama
```bash
git push origin feature/AmazingFeature
```

### 5. Abrir Pull Request

### 📋 Guías de Contribución

- Seguir las convenciones de código existentes
- Escribir tests para nuevas funcionalidades
- Actualizar documentación cuando sea necesario
- Usar commits descriptivos con [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto

**Esteban Canales** - [@EstebanCanales](https://github.com/EstebanCanales)

🔗 **Enlace del proyecto**: [https://github.com/EstebanCanales/teeDesign](https://github.com/EstebanCanales/teeDesign)

---

<div align="center">

**⭐ ¡Dale una estrella si te gusta el proyecto! ⭐**

Made with ❤️ by [Esteban Canales](https://github.com/EstebanCanales)

</div>

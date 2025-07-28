# 🎨 TeeDesigner

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**Una plataforma completa para diseñar y compartir camisetas personalizadas**

[Demo](#-demo) • [Características](#-características) • [Instalación](#-instalación) • [API](#-api-reference) • [Contribuir](#-contribuir)

---

## 📖 Descripción

TeeDesigner es una plataforma integral que permite a los usuarios crear, personalizar y compartir diseños de camisetas de manera intuitiva. La aplicación combina una interfaz web moderna con una aplicación móvil nativa, respaldada por una API robusta para una experiencia completa de diseño.

### ✨ Características Principales

- 🎨 **Editor de Diseño Intuitivo**: Herramientas avanzadas para crear diseños únicos
- 📱 **Multiplataforma**: Disponible en web y dispositivos móviles
- 🔐 **Autenticación Segura**: Sistema de usuarios con JWT
- 💾 **Almacenamiento en la Nube**: Guarda y accede a tus diseños desde cualquier lugar
- 🚀 **Interfaz Moderna**: UI/UX optimizada con componentes reutilizables
- 📊 **Panel de Control**: Gestiona tus diseños y perfil de usuario

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** con **Express.js** - Servidor API REST
- **MongoDB** con **Mongoose** - Base de datos NoSQL
- **JWT** - Autenticación y autorización
- **bcryptjs** - Encriptación de contraseñas
- **TypeScript** - Tipado estático

### Frontend Web
- **Next.js 15** - Framework React con SSR
- **React 19** - Biblioteca de interfaz de usuario
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes de UI
- **Framer Motion** - Animaciones
- **React Hook Form** + **Zod** - Validación de formularios

### Frontend Móvil
- **React Native** - Desarrollo móvil nativo
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **React Navigation** - Navegación móvil

### Herramientas
- **Bun** - Gestor de paquetes rápido
- **ESLint** - Linting de código
- **Cypress** - Testing E2E

## 🏗️ Arquitectura

```
TeeDesigner/
├── backend/                 # API REST Node.js
│   ├── src/                # Código fuente
│   │   ├── controllers/    # Controladores de rutas
│   │   ├── models/         # Modelos de MongoDB
│   │   ├── routes/         # Definición de rutas
│   │   └── middleware/     # Middleware personalizado
│   └── package.json
├── frontend-web/           # Aplicación Next.js
│   ├── src/                # Código fuente
│   │   ├── app/            # App Router de Next.js
│   │   ├── components/     # Componentes React
│   │   └── lib/            # Utilidades y configuración
│   └── package.json
└── frontend-mobil/         # Aplicación React Native
    ├── app/                # Screens y navegación
    ├── components/         # Componentes reutilizables
    └── package.json
```

## 🚀 Instalación

### Prerrequisitos

- **Node.js** (v18 o superior)
- **Bun** (recomendado) o **npm**
- **MongoDB** (local o Atlas)
- **Git**

### Clonar el Repositorio

```bash
git clone https://github.com/EstebanCanales/teeDesign.git
cd teeDesign
```

### Backend Setup

```bash
cd backend
bun install
# Crear archivo .env con las variables necesarias
cp .env.example .env
# Configurar MONGODB_URI, JWT_SECRET, etc.
bun start
```

### Frontend Web Setup

```bash
cd frontend-web
bun install
bun dev
```

### Frontend Móvil Setup

```bash
cd frontend-mobil
bun install
# Para dispositivo Android
bun android
# Para dispositivo iOS
bun ios
# Para web
bun web
```

## 💻 Uso

### Variables de Entorno

Crear archivos `.env` en cada directorio:

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/teedesigner
JWT_SECRET=tu_jwt_secret_muy_seguro
PORT=3001
```

**Frontend Web (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Comandos Disponibles

**Backend**
```bash
bun start          # Iniciar servidor de desarrollo
```

**Frontend Web**
```bash
bun dev            # Servidor de desarrollo
bun build          # Build para producción
bun start          # Iniciar servidor de producción
bun lint           # Linting del código
bun test           # Ejecutar tests E2E
```

**Frontend Móvil**
```bash
bun start          # Iniciar Expo Dev Server
bun android        # Ejecutar en Android
bun ios            # Ejecutar en iOS
bun web            # Ejecutar en navegador
```

## 📚 API Reference

### Autenticación

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
```

### Diseños

```http
GET    /api/designs          # Obtener todos los diseños
POST   /api/designs          # Crear nuevo diseño
GET    /api/designs/:id      # Obtener diseño específico
PUT    /api/designs/:id      # Actualizar diseño
DELETE /api/designs/:id      # Eliminar diseño
```

### Usuarios

```http
GET    /api/users/profile    # Perfil del usuario
PUT    /api/users/profile    # Actualizar perfil
GET    /api/users/designs    # Diseños del usuario
```

## 🎯 Roadmap

- [x] **v1.0** - Funcionalidad básica de diseño
- [x] **v1.1** - Autenticación de usuarios
- [ ] **v1.2** - Editor avanzado con capas
- [ ] **v1.3** - Biblioteca de plantillas
- [ ] **v1.4** - Colaboración en tiempo real
- [ ] **v1.5** - Integración con servicios de impresión
- [ ] **v2.0** - Marketplace de diseños

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, lee nuestra [guía de contribución](CONTRIBUTING.md) antes de enviar pull requests.

### Pasos para Contribuir

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Estándares de Código

- Usar **TypeScript** para todo el código
- Seguir las reglas de **ESLint**
- Escribir **tests** para nuevas funcionalidades
- Documentar cambios en la **API**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Esteban Canales** - [GitHub](https://github.com/EstebanCanales)

## 📞 Contacto

- **GitHub**: [EstebanCanales/teeDesign](https://github.com/EstebanCanales/teeDesign)
- **Issues**: [Reportar un problema](https://github.com/EstebanCanales/teeDesign/issues)

---

<div align="center">
  <sub>Construido con ❤️ por <a href="https://github.com/EstebanCanales">Esteban Canales</a></sub>
</div>

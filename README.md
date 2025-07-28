# 👕 TeeDesigner
### Diseña, Comparte y Crea Camisetas Únicas

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

---

## 📖 Descripción

**TeeDesigner** es una aplicación integral de diseño de camisetas que combina creatividad, comunidad y tecnología. Permite a los usuarios crear diseños únicos de camisetas utilizando herramientas intuitivas, compartir sus creaciones con una comunidad global, y gestionar sus proyectos desde cualquier dispositivo.

La plataforma está construida con una arquitectura moderna que incluye una aplicación móvil nativa, una interfaz web responsive, y un backend robusto que soporta autenticación, gestión de usuarios, y almacenamiento en la nube.

---

## ✨ Características Principales

### 🎨 **Diseño Interactivo**
- Editor de diseños en tiempo real con herramientas avanzadas
- Biblioteca de elementos gráficos y tipografías
- Preview 3D de camisetas con diferentes colores y estilos
- Herramientas de capas y transformaciones

### 👥 **Comunidad**
- Galería pública de diseños compartidos
- Sistema de valoraciones y comentarios
- Perfiles de usuario personalizables
- Seguimiento de diseñadores favoritos

### 🔐 **Autenticación Segura**
- Registro y login con JWT
- Protección de rutas y recursos
- Gestión segura de sesiones
- Recuperación de contraseñas

### 📱 **Multiplataforma**
- Aplicación móvil nativa (iOS/Android)
- Interfaz web responsive
- Sincronización en tiempo real entre dispositivos
- Experiencia de usuario consistente

---

## 🛠️ Stack Tecnológico

### **Backend**
- **Runtime**: Node.js con Bun
- **Framework**: Express.js
- **Base de Datos**: MongoDB con Mongoose ODM
- **Autenticación**: JWT (JsonWebTokens)
- **Seguridad**: bcryptjs para hash de contraseñas
- **Uploads**: Multer para gestión de archivos
- **Lenguaje**: TypeScript

### **Frontend Móvil**
- **Framework**: React Native con Expo
- **Navegación**: React Navigation v7
- **UI Components**: Expo Vector Icons
- **Gestión de Estado**: AsyncStorage
- **Animaciones**: React Native Reanimated
- **Lenguaje**: TypeScript

### **Frontend Web**
- **Framework**: Next.js 15
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Formularios**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Lenguaje**: TypeScript

---

## 🏗️ Arquitectura del Proyecto

```
📁 teeDesign/
├── 🔧 backend/                 # Servidor API (Node.js + Express)
│   ├── 📂 src/
│   │   ├── 🏛️ application/     # Casos de uso y lógica de negocio
│   │   ├── 🌐 domain/          # Entidades y reglas de dominio
│   │   ├── 🔌 infrastructure/  # Conexiones BD y servicios externos
│   │   ├── 🎯 presentation/    # Controladores y rutas
│   │   ├── 📝 types/           # Definiciones TypeScript
│   │   └── 🚀 main.ts          # Punto de entrada
│   └── 📦 package.json
├── 📱 frontend-mobil/          # App móvil (React Native + Expo)
│   ├── 📂 app/                 # Rutas y pantallas
│   ├── 🧩 components/          # Componentes reutilizables
│   ├── 🎨 assets/              # Imágenes y recursos
│   └── 📦 package.json
├── 🌐 frontend-web/            # App web (Next.js)
│   ├── 📂 app/                 # App Router de Next.js
│   ├── 🧩 components/          # Componentes UI
│   ├── 📚 lib/                 # Utilidades y configuración
│   └── 📦 package.json
└── 📋 README.md                # Documentación principal
```

---

## 🚀 Instalación

### **Prerrequisitos**
- Node.js 18+ y npm/yarn
- Bun runtime (para el backend)
- MongoDB (local o Atlas)
- Expo CLI (para desarrollo móvil)
- Android Studio / Xcode (para testing móvil)

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/EstebanCanales/teeDesign.git
cd teeDesign
```

### **2. Configurar Backend**
```bash
cd backend
bun install
# Crear archivo .env con las variables necesarias
cp .env.example .env
# Editar .env con tu configuración de MongoDB y JWT
bun run start
```

### **3. Configurar Frontend Web**
```bash
cd ../frontend-web
npm install
npm run dev
```

### **4. Configurar Frontend Móvil**
```bash
cd ../frontend-mobil
npm install
npx expo start
```

---

## 📋 Guías de Uso

### **Ejecutar Backend**
```bash
cd backend
bun run start  # Servidor en puerto 3001
```

### **Ejecutar Frontend Web**
```bash
cd frontend-web
npm run dev    # Desarrollo en puerto 3000
npm run build  # Build para producción
npm run start  # Servidor de producción
```

### **Ejecutar Frontend Móvil**
```bash
cd frontend-mobil
npm start            # Iniciar Expo Dev Server
npm run android      # Ejecutar en Android
npm run ios          # Ejecutar en iOS
npm run web          # Ejecutar en navegador
```

---

## 📡 Documentación de API

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario | ❌ |
| `POST` | `/api/auth/login` | Iniciar sesión | ❌ |
| `GET` | `/api/auth/profile` | Obtener perfil del usuario | ✅ |
| `PUT` | `/api/auth/profile` | Actualizar perfil | ✅ |
| `GET` | `/api/designs` | Listar todos los diseños | ❌ |
| `POST` | `/api/designs` | Crear nuevo diseño | ✅ |
| `GET` | `/api/designs/:id` | Obtener diseño específico | ❌ |
| `PUT` | `/api/designs/:id` | Actualizar diseño | ✅ |
| `DELETE` | `/api/designs/:id` | Eliminar diseño | ✅ |
| `POST` | `/api/designs/:id/like` | Dar like a diseño | ✅ |
| `GET` | `/api/users/:id/designs` | Diseños de un usuario | ❌ |
| `POST` | `/api/upload` | Subir imagen/archivo | ✅ |

### **Ejemplo de Headers para APIs Autenticadas**
```javascript
headers: {
  'Authorization': 'Bearer <jwt_token>',
  'Content-Type': 'application/json'
}
```

---

## 📊 Ejemplo de Estructura de Datos

### **Interface TeeDesign**
```typescript
interface TeeDesign {
  id: string;
  title: string;
  description?: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  design: {
    elements: DesignElement[];
    canvas: {
      width: number;
      height: number;
      backgroundColor: string;
    };
    tshirtColor: string;
    tshirtStyle: 'crew' | 'v-neck' | 'long-sleeve';
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    views: number;
    isPublic: boolean;
    tags: string[];
  };
}

interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape';
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  opacity: number;
  data: TextData | ImageData | ShapeData;
}
```

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Sigue estos pasos:

### **Proceso de Contribución**
1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### **Estándares de Código**
- Usar TypeScript en todos los archivos
- Seguir las convenciones de ESLint configuradas
- Escribir tests para nuevas funcionalidades
- Documentar APIs y componentes complejos
- Usar commits semánticos (feat, fix, docs, etc.)

### **Issues y Bugs**
- Usar las plantillas de issues proporcionadas
- Incluir pasos para reproducir bugs
- Agregar screenshots cuando sea relevante
- Especificar versiones de dependencias

---

## 👨‍💻 Contacto

**Esteban Canales** - Desarrollador Principal
- GitHub: [@EstebanCanales](https://github.com/EstebanCanales)
- Email: contacto.estebancanales@gmail.com

**Links del Proyecto**
- Repositorio: [https://github.com/EstebanCanales/teeDesign](https://github.com/EstebanCanales/teeDesign)
- Issues: [https://github.com/EstebanCanales/teeDesign/issues](https://github.com/EstebanCanales/teeDesign/issues)
- Documentación: [Wiki del Proyecto](https://github.com/EstebanCanales/teeDesign/wiki)

---

<div align="center">

### 🌟 ¡Dale una estrella si este proyecto te resulta útil! 🌟

[![GitHub stars](https://img.shields.io/github/stars/EstebanCanales/teeDesign.svg?style=social&label=Star)](https://github.com/EstebanCanales/teeDesign)
[![GitHub forks](https://img.shields.io/github/forks/EstebanCanales/teeDesign.svg?style=social&label=Fork)](https://github.com/EstebanCanales/teeDesign/fork)

**¿Te gusta TeeDesigner? ¡Compártelo con la comunidad!**

</div>

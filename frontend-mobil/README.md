# TeeDesigner - Aplicación Móvil

Esta es la aplicación móvil de TeeDesigner, una plataforma para diseñar camisetas personalizadas. La aplicación está construida con React Native y Expo.

## Características

- **Diseño de camisetas**: Herramienta interactiva para personalizar colores de camisetas
- **Galería de diseños**: Explora diseños creados por la comunidad
- **Autenticación**: Sistema de registro e inicio de sesión
- **Guardado de diseños**: Guarda tus creaciones en tu cuenta
- **Interfaz moderna**: Diseño limpio y fácil de usar

## Tecnologías utilizadas

- **React Native**: Framework para desarrollo móvil
- **Expo**: Plataforma para desarrollo y despliegue
- **TypeScript**: Tipado estático para mejor desarrollo
- **Expo Router**: Navegación basada en archivos
- **AsyncStorage**: Almacenamiento local para tokens

## Instalación

1. **Instalar dependencias**:

   ```bash
   npm install
   ```

2. **Instalar AsyncStorage** (si no está instalado):

   ```bash
   npx expo install @react-native-async-storage/async-storage
   ```

3. **Iniciar la aplicación**:
   ```bash
   npm start
   ```

## Estructura del proyecto

```
frontend-mobil/
├── app/                    # Páginas de la aplicación
│   ├── (tabs)/            # Navegación por pestañas
│   │   ├── index.tsx      # Página principal
│   │   └── explore.tsx    # Página de exploración
│   ├── designer.tsx       # Herramienta de diseño
│   ├── gallery.tsx        # Galería de diseños
│   ├── login.tsx          # Página de inicio de sesión
│   └── register.tsx       # Página de registro
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de interfaz
│   │   ├── TShirtRenderer.tsx  # Renderizador de camisetas
│   │   └── IconSymbol.tsx      # Iconos
│   └── ...
├── lib/                  # Servicios y utilidades
│   ├── auth.ts           # Servicio de autenticación
│   └── design-service.ts # Servicio de diseños
└── ...
```

## Páginas principales

### 1. Página Principal (`app/(tabs)/index.tsx`)

- Landing page con información sobre la aplicación
- Enlaces a registro e inicio de sesión
- Características principales
- Call to action para comenzar a diseñar

### 2. Explorar (`app/(tabs)/explore.tsx`)

- Categorías de diseños
- Diseños destacados
- Tutoriales de diseño
- Navegación a la galería

### 3. Diseñador (`app/designer.tsx`)

- Herramienta interactiva para diseñar camisetas
- Selector de colores para diferentes partes de la camiseta
- Vista previa en tiempo real
- Guardado de diseños

### 4. Galería (`app/gallery.tsx`)

- Lista de diseños públicos
- Búsqueda de diseños
- Información de creadores y estadísticas

### 5. Autenticación

- **Login** (`app/login.tsx`): Inicio de sesión
- **Registro** (`app/register.tsx`): Creación de cuenta

## Servicios

### AuthService (`lib/auth.ts`)

Maneja toda la lógica de autenticación:

- Login y registro de usuarios
- Gestión de tokens JWT
- Verificación de autenticación
- Cerrar sesión

### DesignService (`lib/design-service.ts`)

Maneja las operaciones con diseños:

- Crear, actualizar y eliminar diseños
- Obtener diseños públicos y del usuario
- Búsqueda de diseños
- Sistema de likes

## Configuración del backend

La aplicación se conecta a un backend API. Asegúrate de que:

1. El backend esté ejecutándose en `http://localhost:3000`
2. Las rutas de la API coincidan con las esperadas:
   - `POST /api/auth/login`
   - `POST /api/auth/register`
   - `GET /api/auth/me`
   - `GET /api/designs/public`
   - `POST /api/designs`
   - etc.

## Desarrollo

### Comandos útiles

```bash
# Iniciar en modo desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web

# Linting
npm run lint
```

### Estructura de datos

#### Diseño de camiseta

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

## Características de la interfaz

- **Diseño responsive**: Se adapta a diferentes tamaños de pantalla
- **Tema claro/oscuro**: Soporte para ambos temas
- **Navegación intuitiva**: Navegación por pestañas y stack
- **Componentes reutilizables**: Arquitectura modular

## Próximas características

- [ ] Subida de imágenes personalizadas
- [ ] Texto personalizable en camisetas
- [ ] Filtros avanzados en la galería
- [ ] Notificaciones push
- [ ] Compartir diseños en redes sociales
- [ ] Modo offline

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

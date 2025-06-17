# TeeDesigner - Frontend

Frontend para la aplicación TeeDesigner, una plataforma para diseñar camisetas personalizadas.

## Tecnologías

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Hook Form + Zod
- Axios
- Cypress para pruebas E2E

## Requisitos

- Node.js 18+ o Bun 1.0+
- Backend de TeeDesigner (opcional para desarrollo local)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/teedesigner.git
cd teedesigner/frontend
```

2. Instala las dependencias:

```bash
# Con npm
npm install

# Con Bun (recomendado)
bun install
```

3. Copia el archivo `.env.example` a `.env.local` y configura las variables de entorno:

```bash
cp .env.example .env.local
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
# Con npm
npm run dev

# Con Bun
bun run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Pruebas

### Pruebas unitarias con Jest

```bash
# Ejecutar todas las pruebas
bun test

# Ver cobertura
bun test --coverage
```

### Pruebas E2E con Cypress

```bash
# Abrir Cypress en modo interactivo
bun run cypress:open

# Ejecutar pruebas en modo headless
bun run cypress:run

# Ejecutar pruebas E2E con servidor local
bun run test:e2e
```

## Estructura del Proyecto

```
src/
├── app/                # Rutas de Next.js App Router
│   ├── designer/       # Página del diseñador
│   ├── gallery/        # Galería de diseños
│   ├── login/          # Página de inicio de sesión
│   ├── register/       # Página de registro
│   └── design/[id]/    # Detalle de un diseño
├── components/         # Componentes reutilizables
│   ├── ui/             # Componentes de UI (shadcn)
│   └── ...             # Otros componentes
├── lib/                # Utilidades y funciones auxiliares
└── types/              # Definiciones de tipos TypeScript
```

## Características

- **Diseño Responsive**: Funciona en dispositivos móviles, tablets y escritorio
- **Modo Oscuro/Claro**: Soporte para cambio de tema
- **Diseñador Interactivo**: Herramienta para personalizar camisetas
- **Galería Comunitaria**: Visualización de diseños compartidos
- **Autenticación**: Registro e inicio de sesión de usuarios

## Despliegue

Para construir la aplicación para producción:

```bash
# Con npm
npm run build
npm start

# Con Bun
bun run build
bun run start
```

## Licencia

MIT

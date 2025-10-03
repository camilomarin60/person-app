# Person Management System - Frontend

Este es el frontend del Sistema de Gestión de Personas, desarrollado con Next.js 15, TypeScript y Tailwind CSS.

## Características

- **Interfaz moderna y responsiva** con Tailwind CSS
- **TypeScript** para type safety
- **Componentes reutilizables** y bien estructurados
- **Formularios con validación** en tiempo real
- **Búsqueda y filtrado** en tiempo real
- **CRUD completo** para todas las entidades

## Entidades Soportadas

### 👥 Personas

- Información básica (nombre, apellido, edad, email)
- Pase de estacionamiento
- Dirección asociada

### 🎓 Estudiantes

- Hereda toda la información de Persona
- Número de estudiante único
- Promedio académico (0-5)
- Elegibilidad para inscripción

### 👨‍🏫 Profesores

- Hereda toda la información de Persona
- Salario

### 📍 Direcciones

- Calle, ciudad, estado, código postal, país
- Relación uno a uno con Personas

## Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **React 19** - Biblioteca de UI

## Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js
│   ├── page.tsx           # Página principal
│   ├── persons/           # Gestión de personas
│   ├── students/          # Gestión de estudiantes
│   ├── professors/        # Gestión de profesores
│   └── addresses/         # Gestión de direcciones
├── components/            # Componentes reutilizables
│   ├── Navigation.tsx     # Navegación principal
│   ├── PersonCard.tsx     # Tarjeta de persona
│   ├── PersonForm.tsx     # Formulario de persona
│   ├── StudentCard.tsx    # Tarjeta de estudiante
│   ├── StudentForm.tsx    # Formulario de estudiante
│   ├── ProfessorCard.tsx  # Tarjeta de profesor
│   ├── ProfessorForm.tsx  # Formulario de profesor
│   ├── AddressCard.tsx    # Tarjeta de dirección
│   ├── AddressForm.tsx    # Formulario de dirección
│   └── LoadingSpinner.tsx # Spinner de carga
├── services/              # Servicios de API
│   └── api.ts            # Cliente de API
└── types/                # Definiciones de tipos
    └── index.ts          # Tipos TypeScript
```

## Instalación y Ejecución

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**

   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## Configuración de la API

El frontend está configurado para conectarse con el backend en:

```
http://localhost:8080/api
```

Asegúrate de que el backend esté ejecutándose en el puerto 8080 antes de usar el frontend.

## Funcionalidades

### Navegación

- Barra de navegación responsiva
- Enlaces a todas las secciones
- Indicador de página activa

### Gestión de Datos

- **Crear** nuevas entidades
- **Leer** y listar entidades
- **Actualizar** entidades existentes
- **Eliminar** entidades con confirmación

### Búsqueda

- Búsqueda en tiempo real
- Filtrado por múltiples campos
- Resultados instantáneos

### Validación

- Validación de formularios en tiempo real
- Mensajes de error claros
- Validación tanto en frontend como backend

### UI/UX

- Diseño moderno y limpio
- Responsive design
- Animaciones suaves
- Estados de carga
- Mensajes de error y éxito

## Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en modo producción
- `npm run lint` - Ejecutar linter

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

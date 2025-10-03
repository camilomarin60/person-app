# Person Management System

Sistema de gestión de personas, estudiantes y profesores desarrollado como prueba técnica. Implementa un CRUD completo con relaciones One-to-One entre Person y Address, siguiendo el diagrama UML especificado.

## 🏗️ Arquitectura del Proyecto

El proyecto está dividido en dos aplicaciones principales:

- **Backend**: API REST desarrollada en Spring Boot con Java
- **Frontend**: Aplicación web desarrollada en Next.js con TypeScript y Tailwind CSS

## 📋 Requisitos del Sistema

### Backend (Spring Boot)

- **Java**: 21 o superior
- **Maven**: 3.6 o superior
- **Spring Boot**: 3.5.6
- **Base de datos**: H2 (en memoria)

### Frontend (Next.js)

- **Node.js**: 18 o superior
- **npm**: 9 o superior
- **Next.js**: 15.5.4
- **React**: 19.1.0
- **TypeScript**: 5.x

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd person-app
```

### 2. Configurar el Backend

```bash
# Navegar al directorio del backend
cd apps/person-api

# Compilar el proyecto
./mvnw clean compile

# Ejecutar la aplicación
./mvnw spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 3. Configurar el Frontend

```bash
# Navegar al directorio del frontend
cd apps/person-frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:3000`

## 🗄️ Base de Datos

El proyecto utiliza **H2 Database** en modo memoria con las siguientes características:

- **URL**: `jdbc:h2:mem:persondb`
- **Usuario**: `sa`
- **Contraseña**: (vacía)
- **Consola H2**: `http://localhost:8080/h2-console`

### Esquema de Base de Datos

```sql
-- Tabla de personas
CREATE TABLE persons (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INTEGER,
    email VARCHAR(100) UNIQUE NOT NULL,
    purchase_parking_pass BOOLEAN,
    address_id BIGINT,
    dtype VARCHAR(31)
);

-- Tabla de direcciones
CREATE TABLE addresses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50),
    postal_code VARCHAR(15) NOT NULL,
    country VARCHAR(50) NOT NULL
);

-- Tabla de estudiantes (hereda de persons)
CREATE TABLE students (
    id BIGINT PRIMARY KEY,
    student_number VARCHAR(20) NOT NULL,
    average_mark DECIMAL(3,2),
    is_eligible_to_enroll BOOLEAN
);

-- Tabla de profesores (hereda de persons)
CREATE TABLE professors (
    id BIGINT PRIMARY KEY,
    salary DECIMAL(10,2) NOT NULL
);
```

## 🎯 Funcionalidades Implementadas

### Entidades Principales

1. **Person** - Entidad base con información personal
2. **Student** - Extiende Person con información académica
3. **Professor** - Extiende Person con información salarial
4. **Address** - Dirección asociada a cada persona (relación One-to-One)

### Operaciones CRUD

- ✅ **Crear** - Agregar nuevas personas, estudiantes y profesores
- ✅ **Leer** - Listar y ver detalles de entidades
- ✅ **Actualizar** - Modificar información existente
- ✅ **Eliminar** - Remover entidades del sistema

### Características Especiales

- **Relación One-to-One**: Cada persona puede tener máximo una dirección
- **Herencia**: Student y Professor extienden de Person
- **Validaciones**: Campos obligatorios y formatos válidos
- **Interfaz Responsiva**: Diseño moderno con Tailwind CSS
- **API REST**: Endpoints para todas las operaciones

## 🔧 Tecnologías Utilizadas

### Backend

- **Spring Boot 3.5.6** - Framework principal
- **Spring Data JPA** - Persistencia de datos
- **Hibernate** - ORM
- **H2 Database** - Base de datos en memoria
- **Spring Security** - Configuración de seguridad y CORS
- **Maven** - Gestión de dependencias

### Frontend

- **Next.js 15.5.4** - Framework React
- **React 19.1.0** - Biblioteca de UI
- **TypeScript 5.x** - Tipado estático
- **Tailwind CSS 4.x** - Framework de estilos
- **ESLint** - Linting de código

## 📡 API Endpoints

### Personas

- `GET /api/persons` - Listar todas las personas
- `GET /api/persons/{id}` - Obtener persona por ID
- `POST /api/persons` - Crear nueva persona
- `PUT /api/persons/{id}` - Actualizar persona
- `DELETE /api/persons/{id}` - Eliminar persona

### Estudiantes

- `GET /api/students` - Listar todos los estudiantes
- `GET /api/students/{id}` - Obtener estudiante por ID
- `POST /api/students` - Crear nuevo estudiante
- `PUT /api/students/{id}` - Actualizar estudiante
- `DELETE /api/students/{id}` - Eliminar estudiante

### Profesores

- `GET /api/professors` - Listar todos los profesores
- `GET /api/professors/{id}` - Obtener profesor por ID
- `POST /api/professors` - Crear nuevo profesor
- `PUT /api/professors/{id}` - Actualizar profesor
- `DELETE /api/professors/{id}` - Eliminar profesor

## 🎨 Interfaz de Usuario

### Páginas Disponibles

- **Inicio** (`/`) - Dashboard principal
- **Personas** (`/persons`) - Gestión de personas
- **Estudiantes** (`/students`) - Gestión de estudiantes
- **Profesores** (`/professors`) - Gestión de profesores

### Características de la UI

- **Diseño Responsivo** - Adaptable a diferentes tamaños de pantalla
- **Formularios Intuitivos** - Validación en tiempo real
- **Navegación Clara** - Menú principal con iconos
- **Feedback Visual** - Mensajes de éxito y error
- **Carga Asíncrona** - Indicadores de progreso

## 🔒 Configuración de Seguridad

El backend incluye configuración de seguridad con:

- **CORS habilitado** para `http://localhost:3000`
- **Endpoints públicos** para operaciones CRUD
- **Headers de seguridad** configurados
- **Consola H2** accesible para desarrollo

## 🧪 Pruebas

### Probar la API

```bash
# Listar personas
curl http://localhost:8080/api/persons

# Crear persona
curl -X POST http://localhost:8080/api/persons \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan@example.com",
    "age": 30,
    "purchaseParkingPass": true,
    "address": {
      "street": "Calle 123",
      "city": "Bogotá",
      "postalCode": "110111",
      "country": "Colombia"
    }
  }'
```

### Acceder a la Consola H2

1. Ir a `http://localhost:8080/h2-console`
2. Usar la configuración:
   - **JDBC URL**: `jdbc:h2:mem:persondb`
   - **User Name**: `sa`
   - **Password**: (dejar vacío)

## 📝 Estructura del Proyecto

```
person-app/
├── apps/
│   ├── person-api/                 # Backend Spring Boot
│   │   ├── src/main/java/
│   │   │   └── com/kohan/person/
│   │   │       ├── domain/         # Entidades JPA
│   │   │       ├── repository/    # Repositorios
│   │   │       ├── web/           # Controladores REST
│   │   │       └── config/        # Configuraciones
│   │   └── pom.xml
│   └── person-frontend/            # Frontend Next.js
│       ├── src/
│       │   ├── app/               # Páginas de la aplicación
│       │   ├── components/       # Componentes React
│       │   ├── services/         # Servicios API
│       │   └── types/            # Tipos TypeScript
│       └── package.json
└── README.md
```

## 🚨 Solución de Problemas

### Error de CORS

Si encuentras errores de CORS, verifica que:

- El backend esté ejecutándose en el puerto 8080
- El frontend esté ejecutándose en el puerto 3000
- La configuración de CORS en `SecurityConfig.java` esté correcta

### Error de Base de Datos

Si hay problemas con la base de datos:

- Verifica que H2 esté configurado correctamente
- Revisa los logs del backend para errores de conexión
- Accede a la consola H2 para verificar las tablas

### Error de Compilación

Para problemas de compilación:

```bash
# Backend
./mvnw clean compile

# Frontend
npm install
npm run build
```

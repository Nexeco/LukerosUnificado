# Documentación de Funciones de Descarga

## Descripción General

Se han implementado nuevos endpoints para descargar todos los registros de clientes y formularios con su información completa. Estos endpoints permiten exportar datos para respaldos, análisis, migración y auditoría.

## Archivos de Documentación

### 📘 [DOWNLOAD_API.md](./DOWNLOAD_API.md)
Documentación técnica completa de los endpoints de descarga:
- Especificaciones de los endpoints
- Formato de respuesta JSON
- Detalles de autenticación
- Lista completa de los 36 campos exportados
- Manejo de errores

### 📗 [GUIA_DESCARGA.md](./GUIA_DESCARGA.md)
Guía práctica para usuarios con ejemplos de uso:
- Instrucciones paso a paso
- Ejemplos con curl, JavaScript y Python
- Casos de uso recomendados
- Scripts de ejemplo para respaldos automáticos
- Solución de problemas comunes

## Endpoints Disponibles

### Descargar Clientes
```
GET /admin/download/clientes
```
Descarga todos los registros de clientes (id, teléfono, fecha de creación).

### Descargar Formularios
```
GET /admin/download/formularios
```
Descarga todos los formularios con **información completa** de 36 campos:
- Información básica (celular, monto, plazo, estado)
- Información personal (nombres, documento, email, género, etc.)
- Ubicación (departamento, ciudad, dirección)
- Información laboral (empleo, ingresos, ciclo de pago)
- Referencias personales (2 referencias completas)
- Datos bancarios (banco, número de cuenta)
- Documentos (fotos de cédula y selfie)

## Autenticación Requerida

Ambos endpoints requieren autenticación de administrador. Primero debes iniciar sesión:

```bash
POST /admin/login
{
  "email": "admin@example.com",
  "password": "tu_contraseña"
}
```

Luego usa la cookie `admin_token` en tus peticiones.

## Ejemplo Rápido

```bash
# 1. Login
curl -i -X POST http://localhost:4001/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password"}'

# 2. Copiar el token de la cookie en el response

# 3. Descargar datos
curl -X GET http://localhost:4001/admin/download/formularios \
  -H "Cookie: admin_token=TU_TOKEN" \
  -o formularios.json
```

## Formato de Respuesta

```json
{
  "ok": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "celular": "3001234567",
      "monto": 500000,
      "plazo": 30,
      "first_name": "Juan",
      "email": "juan@example.com",
      // ... 30+ campos más
    }
  ]
}
```

## Características

✅ **Exportación Completa**: Todos los campos de cada formulario  
✅ **Formato JSON**: Fácil de importar en cualquier herramienta  
✅ **Seguro**: Requiere autenticación de administrador  
✅ **Compatible**: Funciona con PostgreSQL y almacenamiento JSON  
✅ **Sin Límites**: Descarga todos los registros disponibles  

## Casos de Uso

### 📦 Respaldos
Exporta todos los datos diariamente para mantener copias de seguridad.

### 📊 Análisis de Datos
Importa los datos en Excel, Python, R, Tableau o Power BI para análisis detallados.

### 🔄 Migración
Transfiere datos entre diferentes ambientes (desarrollo, staging, producción).

### 🔍 Auditoría
Revisa información completa de clientes y formularios para auditorías internas o externas.

## Implementación Técnica

### Funciones en la Base de Datos
- `downloadAllClientes()`: Consulta todos los clientes
- `downloadAllFormularios()`: Consulta todos los formularios con todos sus campos

### Endpoints REST
- Autenticación mediante middleware `requireAdmin`
- Respuesta en formato JSON estándar
- Manejo de errores consistente

## Seguridad

⚠️ **Importante**: Los datos descargados incluyen información sensible:
- Números de documento
- Información financiera
- Datos personales
- Fotos de documentos

Asegúrate de:
- Mantener los archivos descargados en un lugar seguro
- No compartir los datos con terceros no autorizados
- Encriptar los respaldos cuando sea posible
- Eliminar archivos temporales después de usarlos

## Soporte

Para más detalles:
- **Documentación técnica**: [DOWNLOAD_API.md](./DOWNLOAD_API.md)
- **Guía de usuario**: [GUIA_DESCARGA.md](./GUIA_DESCARGA.md)
- **Código fuente**: `apps/crm/db.js` y `apps/crm/index.js`

## Contribuciones

Esta funcionalidad fue desarrollada para facilitar:
- Respaldos automáticos del sistema
- Exportación de datos para análisis
- Cumplimiento de requisitos de auditoría
- Migración de datos entre sistemas

Si encuentras algún problema o tienes sugerencias de mejora, por favor crea un issue en el repositorio.

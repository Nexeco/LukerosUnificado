# API de Descarga de Datos

Esta documentación describe los endpoints disponibles para descargar todos los registros de clientes y formularios con su información completa.

## Endpoints de Descarga

### 1. Descargar Todos los Clientes

**Endpoint:** `GET /admin/download/clientes`

**Autenticación:** Requiere estar autenticado como administrador

**Descripción:** Descarga todos los registros de clientes con su información básica.

**Respuesta exitosa:**
```json
{
  "ok": true,
  "count": 10,
  "data": [
    {
      "id": 1,
      "phone": "3001234567",
      "created_at": "2025-10-10T21:15:09.784Z"
    },
    ...
  ]
}
```

### 2. Descargar Todos los Formularios

**Endpoint:** `GET /admin/download/formularios`

**Autenticación:** Requiere estar autenticado como administrador

**Descripción:** Descarga todos los registros de formularios con TODA su información (36 campos).

**Respuesta exitosa:**
```json
{
  "ok": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "celular": "3001234567",
      "monto": 500000,
      "plazo": 30,
      "paso_actual": 7,
      "estado": "aprobado",
      "cliente_acepto": "si",
      "created_at": "2025-10-10T21:15:09.784Z",
      
      // Información Personal (Paso 1)
      "first_name": "Juan",
      "second_name": "Carlos",
      "last_name": "Pérez",
      "second_last_name": "González",
      "email": "juan.perez@test.com",
      "document_number": "1234567890",
      "birth_date": "1990-05-15",
      "document_issue_date": "2015-03-20",
      "education_level": "Universitaria",
      "marital_status": "Casado",
      "gender": "Masculino",
      
      // Contacto y Residencia (Paso 2)
      "department": "Cundinamarca",
      "city": "Bogotá",
      "locality": "Usaquén",
      "address": "Calle 123 #45-67",
      
      // Actividad Económica (Paso 3)
      "employment_status": "Empleado",
      "payment_cycle": "Quincenal",
      "income_range": "2-4 millones",
      
      // Referencias (Paso 4)
      "reference_one_relationship": "Hermano",
      "reference_one_name": "Pedro Pérez",
      "reference_one_phone": "3001234567",
      "reference_two_relationship": "Amigo",
      "reference_two_name": "Luis García",
      "reference_two_phone": "3007654321",
      
      // Información Bancaria (Paso 5)
      "bank_name": "Bancolombia",
      "account_number": "12345678901234",
      "account_number_confirm": "12345678901234",
      
      // Documentos (Paso 6)
      "id_front": "data:image/jpeg;base64,...",
      "id_back": "data:image/jpeg;base64,...",
      "selfie": "data:image/jpeg;base64,..."
    },
    ...
  ]
}
```

## Campos Incluidos en Formularios

Los formularios incluyen **36 campos** completos:

### Información Básica
- `id`, `celular`, `monto`, `plazo`, `paso_actual`, `estado`, `cliente_acepto`, `created_at`

### Paso 1: Información Personal (11 campos)
- `first_name`, `second_name`, `last_name`, `second_last_name`
- `email`, `document_number`, `birth_date`, `document_issue_date`
- `education_level`, `marital_status`, `gender`

### Paso 2: Contacto y Residencia (4 campos)
- `department`, `city`, `locality`, `address`

### Paso 3: Actividad Económica (3 campos)
- `employment_status`, `payment_cycle`, `income_range`

### Paso 4: Referencias (6 campos)
- `reference_one_relationship`, `reference_one_name`, `reference_one_phone`
- `reference_two_relationship`, `reference_two_name`, `reference_two_phone`

### Paso 5: Información Bancaria (3 campos)
- `bank_name`, `account_number`, `account_number_confirm`

### Paso 6: Documentos (3 campos)
- `id_front`, `id_back`, `selfie` (pueden contener datos en base64 o URLs)

## Autenticación

Para usar estos endpoints, debes estar autenticado como administrador:

1. Inicia sesión: `POST /admin/login`
2. El servidor devolverá una cookie `admin_token`
3. Usa esta cookie en las peticiones subsiguientes

**Ejemplo con curl:**
```bash
# 1. Login
curl -i -X POST http://localhost:4001/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"test123"}'

# 2. Extraer cookie del header Set-Cookie
# admin_token=eyJ...

# 3. Usar el endpoint de descarga
curl -X GET http://localhost:4001/admin/download/formularios \
  -H "Cookie: admin_token=eyJ..."
```

## Respuestas de Error

Si no estás autenticado:
```
HTTP 401 Unauthorized
```

Si hay un error del servidor:
```json
{
  "ok": false,
  "error": "download_failed"
}
```

## Uso Recomendado

Estos endpoints están diseñados para:

- **Respaldos**: Exportar todos los datos para hacer copias de seguridad
- **Análisis**: Descargar datos para análisis externos o reportes
- **Migración**: Transferir datos entre ambientes
- **Auditoría**: Revisar información completa de clientes y formularios

**Nota:** Los datos de documentos (fotos) pueden ser muy grandes si hay muchos registros. Considera usar paginación o filtros si se necesita en el futuro.

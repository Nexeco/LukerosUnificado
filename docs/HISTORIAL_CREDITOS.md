# Historial de Créditos Desembolsados

## Descripción

Sistema automático de historial que registra todos los créditos que se desembolsan a los clientes. Cada vez que un formulario cambia su estado a "desembolsado", se crea automáticamente un registro en el historial con toda la información relevante.

## Características

✅ **Registro automático** - Se crea al cambiar estado a "desembolsado"  
✅ **Información completa** - Guarda nombre, documento, celular, monto, plazo  
✅ **Seguimiento de estado** - Permite marcar préstamos como pagado, vencido, etc.  
✅ **Exportación a Excel** - Descarga todo el historial en formato .xlsx  
✅ **Consulta por cliente** - Ver todos los créditos de un cliente específico  
✅ **Compatible con PostgreSQL y JSON** - Funciona en ambos modos

## Datos Guardados en el Historial

Cada registro contiene:

| Campo | Descripción | Tipo |
|-------|-------------|------|
| `id` | ID único del registro | Integer |
| `formulario_id` | Referencia al formulario original | Integer |
| `cliente_id` | ID del cliente | Integer |
| `fecha_desembolso` | Fecha y hora del desembolso | Timestamp |
| `monto` | Monto desembolsado | Decimal |
| `plazo` | Plazo en días | Integer |
| `documento_numero` | Número de cédula del cliente | String |
| `nombre_completo` | Nombre completo concatenado | String |
| `celular` | Número de celular | String |
| `estado_prestamo` | Estado actual del préstamo | String |
| `created_at` | Fecha de creación del registro | Timestamp |

## Estados del Préstamo

El campo `estado_prestamo` puede tener los siguientes valores:

- **activo** - Préstamo vigente, cliente aún no ha pagado
- **pagado** - Cliente completó el pago del préstamo
- **vencido** - Préstamo no pagado a tiempo
- **cancelado** - Préstamo cancelado por alguna razón

## Flujo Automático

```
┌─────────────────┐
│   Formulario    │
│  estado: xxx    │
└────────┬────────┘
         │
         │ Admin cambia estado
         v
┌─────────────────┐
│   Formulario    │
│ estado:         │
│ desembolsado    │ ──────────────┐
└─────────────────┘                │
                                   │ Se crea automáticamente
                                   v
                          ┌──────────────────┐
                          │  Historial       │
                          │  Créditos        │
                          ├──────────────────┤
                          │ - Fecha          │
                          │ - Monto          │
                          │ - Nombre         │
                          │ - Documento      │
                          │ - Celular        │
                          │ - Plazo          │
                          │ - Estado: activo │
                          └──────────────────┘
```

## Uso en el Admin

### Ver Historial

1. Inicia sesión en el panel de administración
2. Haz clic en **"Historial Créditos"** en el menú lateral
3. Verás una tabla con todos los créditos desembolsados

### Actualizar Estado de un Préstamo

1. En la tabla del historial, localiza el préstamo
2. En la columna "Estado Préstamo", selecciona el nuevo estado del dropdown:
   - activo
   - pagado
   - vencido
   - cancelado
3. El cambio se guarda automáticamente

### Exportar Historial

1. En la sección "Historial Créditos"
2. Haz clic en **"📥 Exportar Historial"**
3. Se descargará un archivo Excel con todos los registros
4. El archivo incluye:
   - ID
   - Fecha de Desembolso
   - Nombre Completo
   - Documento
   - Celular
   - Monto (formato COP)
   - Plazo (días)
   - Estado del Préstamo
   - ID del Formulario

### Refrescar Datos

Haz clic en **"🔄 Actualizar"** para recargar los datos del historial.

## API Endpoints

### 1. Obtener Historial Completo

```
GET /admin/historial?limit=100
```

**Headers:**
- `Cookie: admin_token=...`

**Query Parameters:**
- `limit` (opcional): Número máximo de registros (default: 100)

**Respuesta:**
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "formulario_id": 45,
      "cliente_id": 12,
      "fecha_desembolso": "2025-10-11T15:30:00Z",
      "monto": 2500000,
      "plazo": 30,
      "documento_numero": "1234567890",
      "nombre_completo": "Juan Carlos Pérez García",
      "celular": "3001234567",
      "estado_prestamo": "activo",
      "created_at": "2025-10-11T15:30:00Z"
    }
  ],
  "count": 1
}
```

### 2. Obtener Historial por Cliente

```
GET /admin/historial/cliente/:clienteId
```

**Ejemplo:**
```
GET /admin/historial/cliente/12
```

### 3. Actualizar Estado de Préstamo

```
PATCH /admin/historial/:id
```

**Body:**
```json
{
  "estado_prestamo": "pagado"
}
```

**Valores válidos:** `activo`, `pagado`, `vencido`, `cancelado`

## Estructura de Base de Datos

### PostgreSQL

```sql
create table historial_creditos (
  id serial primary key,
  formulario_id integer references formularios(id) on delete cascade,
  cliente_id integer references clientes(id) on delete set null,
  fecha_desembolso timestamptz not null default now(),
  monto numeric(12,2) not null,
  plazo integer,
  documento_numero varchar(20),
  nombre_completo varchar(255),
  celular varchar(15),
  estado_prestamo varchar(30) default 'activo',
  created_at timestamptz not null default now()
);
```

### JSON (Almacenamiento en Archivo)

El archivo `crm.json` ahora incluye:

```json
{
  "solicitudes": [...],
  "lastId": 0,
  "historial_creditos": [
    {
      "id": 1,
      "formulario_id": 45,
      "cliente_id": 12,
      "fecha_desembolso": "2025-10-11T15:30:00.000Z",
      "monto": 2500000,
      "plazo": 30,
      "documento_numero": "1234567890",
      "nombre_completo": "Juan Carlos Pérez García",
      "celular": "3001234567",
      "estado_prestamo": "activo",
      "created_at": "2025-10-11T15:30:00.000Z"
    }
  ]
}
```

## Funciones en db.js

### `agregarHistorialCredito(formularioId, formularioData)`
Crea un nuevo registro en el historial. Se llama automáticamente al cambiar estado a "desembolsado".

### `getHistorialCreditos(limit)`
Obtiene los últimos N registros del historial.

### `getHistorialPorCliente(clienteId)`
Obtiene todos los créditos de un cliente específico.

### `actualizarEstadoPrestamo(historialId, nuevoEstado)`
Actualiza el estado de un préstamo en el historial.

## Ejemplos de Uso

### Consultar historial desde código

```javascript
import { getHistorialCreditos } from './db.js';

// Obtener últimos 50 créditos
const historial = await getHistorialCreditos(50);
console.log(historial);
```

### Ver créditos de un cliente

```javascript
import { getHistorialPorCliente } from './db.js';

const creditos = await getHistorialPorCliente(12);
console.log(`Cliente tiene ${creditos.length} créditos`);
```

### Marcar préstamo como pagado

```javascript
import { actualizarEstadoPrestamo } from './db.js';

await actualizarEstadoPrestamo(5, 'pagado');
```

## Reportes y Estadísticas

Con el historial de créditos puedes generar reportes como:

- **Total desembolsado por mes**
- **Cantidad de préstamos activos vs pagados**
- **Clientes con más créditos**
- **Montos promedio por préstamo**
- **Tasa de morosidad** (vencidos/total)
- **Plazo promedio de los créditos**

## Consideraciones

- ✅ El registro se crea automáticamente, no requiere acción manual
- ✅ Si un formulario vuelve a cambiar a "desembolsado", NO se duplica el registro
- ✅ Los registros se mantienen incluso si se elimina el formulario (con cascade)
- ✅ El historial es inmutable - los datos originales no cambian, solo el estado
- ✅ Compatible con migración de JSON a PostgreSQL

## Próximas Mejoras Sugeridas

1. **Dashboard de estadísticas** con gráficos de desembolsos
2. **Alertas automáticas** para préstamos próximos a vencer
3. **Cálculo de intereses** acumulados
4. **Recordatorios de pago** por SMS/Email
5. **Generación de recibos** en PDF
6. **Integración con pagos** (TumiPay, etc.)

# Guía Rápida: Descarga de Datos

Esta guía te muestra cómo usar las nuevas funciones de descarga de clientes y formularios.

## Requisitos

- Debes ser administrador del sistema
- Debes tener acceso al servidor CRM (por defecto: http://localhost:4001)

## Pasos para Descargar Datos

### 1. Iniciar Sesión

Primero, inicia sesión como administrador:

```bash
curl -i -X POST http://localhost:4001/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"tu_contraseña"}'
```

Esto devolverá un header `Set-Cookie` con tu token de sesión. Copia el valor de `admin_token`.

### 2. Descargar Todos los Clientes

```bash
curl -X GET http://localhost:4001/admin/download/clientes \
  -H "Cookie: admin_token=TU_TOKEN_AQUI" \
  -o clientes.json
```

Esto guardará todos los clientes en el archivo `clientes.json`.

### 3. Descargar Todos los Formularios

```bash
curl -X GET http://localhost:4001/admin/download/formularios \
  -H "Cookie: admin_token=TU_TOKEN_AQUI" \
  -o formularios.json
```

Esto guardará todos los formularios con información completa en el archivo `formularios.json`.

## Ejemplo con JavaScript/Node.js

```javascript
const fetch = require('node-fetch');

async function downloadData() {
  const API = 'http://localhost:4001';
  
  // 1. Login
  const loginRes = await fetch(`${API}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@test.com',
      password: 'tu_contraseña'
    })
  });
  
  const cookies = loginRes.headers.get('set-cookie');
  
  // 2. Descargar clientes
  const clientesRes = await fetch(`${API}/admin/download/clientes`, {
    headers: { 'Cookie': cookies }
  });
  const clientesData = await clientesRes.json();
  console.log(`Descargados ${clientesData.count} clientes`);
  
  // 3. Descargar formularios
  const formsRes = await fetch(`${API}/admin/download/formularios`, {
    headers: { 'Cookie': cookies }
  });
  const formsData = await formsRes.json();
  console.log(`Descargados ${formsData.count} formularios`);
  
  // 4. Guardar a archivos
  const fs = require('fs');
  fs.writeFileSync('clientes.json', JSON.stringify(clientesData.data, null, 2));
  fs.writeFileSync('formularios.json', JSON.stringify(formsData.data, null, 2));
}

downloadData().catch(console.error);
```

## Ejemplo con Python

```python
import requests
import json

API = 'http://localhost:4001'

# 1. Login
login_response = requests.post(f'{API}/admin/login', json={
    'email': 'admin@test.com',
    'password': 'tu_contraseña'
})

cookies = login_response.cookies

# 2. Descargar clientes
clientes_response = requests.get(
    f'{API}/admin/download/clientes',
    cookies=cookies
)
clientes_data = clientes_response.json()
print(f"Descargados {clientes_data['count']} clientes")

# 3. Descargar formularios
forms_response = requests.get(
    f'{API}/admin/download/formularios',
    cookies=cookies
)
forms_data = forms_response.json()
print(f"Descargados {forms_data['count']} formularios")

# 4. Guardar a archivos
with open('clientes.json', 'w', encoding='utf-8') as f:
    json.dump(clientes_data['data'], f, indent=2, ensure_ascii=False)

with open('formularios.json', 'w', encoding='utf-8') as f:
    json.dump(forms_data['data'], f, indent=2, ensure_ascii=False)
```

## Formato de los Datos

### Clientes
Cada cliente incluye:
- `id`: ID único del cliente
- `phone`: Número de teléfono
- `created_at`: Fecha de creación

### Formularios
Cada formulario incluye **36 campos** con toda la información:
- Datos básicos (celular, monto, plazo)
- Información personal completa (nombres, documento, email, fecha de nacimiento)
- Ubicación (departamento, ciudad, dirección)
- Información laboral (empleo, ciclo de pago, rango de ingresos)
- Referencias personales (2 referencias con nombre, teléfono, parentesco)
- Datos bancarios (banco, número de cuenta)
- Documentos (fotos de cédula y selfie en base64)

## Uso Recomendado

### Respaldo Diario
Crea un script que descargue todos los datos diariamente:

```bash
#!/bin/bash
# backup-daily.sh

DATE=$(date +%Y%m%d)
curl -X GET http://localhost:4001/admin/download/clientes \
  -H "Cookie: admin_token=$ADMIN_TOKEN" \
  -o "backup/clientes-$DATE.json"

curl -X GET http://localhost:4001/admin/download/formularios \
  -H "Cookie: admin_token=$ADMIN_TOKEN" \
  -o "backup/formularios-$DATE.json"
```

### Análisis de Datos
Los archivos JSON pueden ser importados fácilmente en herramientas de análisis:
- Excel (usando Power Query)
- Python (pandas)
- R
- Tableau
- Power BI

### Migración
Usa estos endpoints para mover datos entre ambientes (desarrollo, staging, producción).

## Notas Importantes

1. **Seguridad**: Los datos descargados incluyen información sensible. Mantenlos seguros.
2. **Tamaño**: Los documentos en base64 pueden hacer que los archivos sean grandes.
3. **Frecuencia**: No hagas descargas muy frecuentes para no sobrecargar el servidor.
4. **Autenticación**: El token de sesión expira. Si obtienes un error 401, vuelve a iniciar sesión.

## Solución de Problemas

### Error 401 (Unauthorized)
- Verifica que tu token de sesión sea correcto
- Verifica que tu usuario tenga rol de administrador
- Intenta iniciar sesión de nuevo

### Error 500 (Server Error)
- Verifica que el servidor esté funcionando
- Revisa los logs del servidor para más detalles
- Contacta al equipo de soporte

## Soporte

Para más información, consulta la documentación completa en `docs/DOWNLOAD_API.md`.

# Exportación de Formularios a Excel

## Resumen de Cambios

Se ha actualizado la funcionalidad de exportación en el panel de administración (`admin.html`) para que ahora exporte los datos a archivos Excel (.xlsx) en lugar de JSON.

## Características de la Exportación

### 1. **Exportar Formularios a Excel**

Al hacer clic en el botón "📥 Exportar Formularios", se genera un archivo Excel con **todos los campos** de los formularios:

#### Campos incluidos (35 columnas):

1. **Información Básica:**
   - ID
   - Nombre Completo (Primer Nombre + Segundo Nombre + Primer Apellido + Segundo Apellido)
   - Celular
   - Monto
   - Plazo
   - Paso Actual
   - Estado
   - Cliente Aceptó
   - Fecha Creación

2. **Datos Personales:**
   - Email
   - Número Documento
   - Fecha Nacimiento
   - Fecha Expedición Doc

3. **Información Demográfica:**
   - Nivel Educativo
   - Estado Civil
   - Género
   - Departamento
   - Ciudad
   - Localidad
   - Dirección

4. **Información Laboral y Financiera:**
   - Estado Empleo
   - Ciclo Pago
   - Rango Ingresos

5. **Referencias Personales:**
   - Ref 1 - Parentesco
   - Ref 1 - Nombre
   - Ref 1 - Teléfono
   - Ref 2 - Parentesco
   - Ref 2 - Nombre
   - Ref 2 - Teléfono

6. **Información Bancaria:**
   - Banco
   - Número Cuenta
   - Confirmación Cuenta

7. **Documentos Adjuntos:**
   - Foto ID Frontal (Sí/No)
   - Foto ID Trasera (Sí/No)
   - Selfie (Sí/No)

### 2. **Exportar Clientes a Excel**

Al hacer clic en el botón "📥 Exportar Clientes", se genera un archivo Excel con la información de todos los clientes:

#### Campos incluidos (3 columnas):
- ID
- Teléfono
- Fecha Creación

## Formato del Archivo

- **Nombre del archivo:** `formularios-YYYY-MM-DD.xlsx` o `clientes-YYYY-MM-DD.xlsx`
- **Formato:** Excel (.xlsx)
- **Hoja de trabajo:** "Formularios" o "Clientes"
- **Columnas:** Anchos ajustados automáticamente para mejor legibilidad

## Cómo Usar

1. Inicia sesión en el panel de administración
2. Navega a la sección "Clientes" o "Formularios"
3. Haz clic en el botón "📥 Exportar Clientes" o "📥 Exportar Formularios"
4. Espera a que se descargue el archivo Excel
5. Abre el archivo con Microsoft Excel, Google Sheets, o cualquier aplicación compatible

## Tecnología Utilizada

- **Librería:** SheetJS (xlsx) v0.20.1
- **CDN:** https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js
- **Formato de salida:** Excel 2007+ (.xlsx)

## Ventajas del Formato Excel

✅ **Fácil de usar:** Se puede abrir directamente en Excel o Google Sheets  
✅ **Filtros y ordenamiento:** Excel permite filtrar y ordenar datos fácilmente  
✅ **Análisis de datos:** Compatible con tablas dinámicas y gráficos  
✅ **Formato estructurado:** Columnas bien definidas y con anchos apropiados  
✅ **Información completa:** Todos los campos de cada formulario incluidos (35 columnas)  
✅ **Nombre completo:** Los nombres se concatenan automáticamente en una sola columna  
✅ **Compatible:** Funciona en Windows, Mac, Linux, y navegadores web

## Notas Técnicas

- Las imágenes (ID frontal, ID trasera, Selfie) se marcan como "Sí" o "No" en lugar de incluir los datos base64 completos
- Las columnas tienen anchos predefinidos para mejorar la legibilidad
- Los campos vacíos aparecen como cadenas vacías en el Excel
- El archivo se descarga automáticamente al navegador sin necesidad de guardar manualmente

## Soporte

Si encuentras algún problema con la exportación, verifica:
- Que tengas una conexión a internet activa (para cargar la librería SheetJS)
- Que tu navegador permita descargas automáticas
- Que no haya bloqueadores de pop-ups activos

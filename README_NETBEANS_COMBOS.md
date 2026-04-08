# Restaurante Zarape - NetBeans y modulo de Combos

## Estructura respetada

- `src/java/Model`
  Aqui quedaron actualizados los modelos `Combo.java` y `DetalleCombo.java`.

- `web/Html`
  Aqui estan las vistas del catalogo y detalle de `Combos`, `Alimentos` y `Bebidas`.

- `web/Js`
  Aqui se agrego la logica del lado cliente:
  - `DataStore.js`
  - `Alimentos.js`
  - `Bebidas.js`
  - `Combos.js`
  - `Sucursal.js`
  - `Usuario.js`

- `web/Style`
  Aqui se unifico el estilo visual en `EstiloGeneral.css`.

- `nbproject`
  Se ajustaron las referencias para que las librerias apunten al propio proyecto.

## Que implementa el modulo de Combos

- Alta de combo con:
  - id combo autogenerado
  - nombre
  - descripcion
  - precio
  - estatus
  - varios alimentos
  - varias bebidas

- Baja segun regla del requerimiento:
  - si el combo no tiene relacionados, se elimina
  - si tiene relacionados, solo cambia a baja

- Modificacion:
  - permite editar todos los campos excepto el ID

- Busqueda:
  - por nombre
  - por alimentos
  - por bebidas

- Impresion:
  - genera una vista imprimible de los resultados

## Como abrirlo en NetBeans

1. Abre NetBeans.
2. Ve a `File > Open Project`.
3. Selecciona la carpeta `RestauranteZarape-LDSM-501`.
4. Asegurate de tener configurado un servidor Tomcat en NetBeans.
5. Ejecuta el proyecto con `Run Project`.

## Como usarlo

1. Abre la aplicacion.
2. En la pantalla de acceso usa:
   - Usuario: `Chiken`
   - Contrasenia: `10`
3. Al entrar se abre el modulo `Combos`.
4. Puedes:
   - crear combos nuevos
   - seleccionar varios alimentos y bebidas
   - calcular precio sugerido
   - buscar registros
   - imprimir resultados
   - modificar o eliminar

## Base de datos

- El archivo `01_DDL.sql` ya refleja la nueva estructura de `combo` y `detalle_combo`.
- El modulo web de Combos funciona con almacenamiento local del navegador para que pueda demostrarse aun sin servicios backend.
- Si despues quieres conectarlo a MySQL y a servicios Java, la estructura de modelos ya quedo mas alineada a ese paso.

# Dibujo Técnico + CAD

Aula virtual de Marcelo Colombo. Sitio estático sin dependencias de compilación, preparado para GitHub Pages y adaptable a Netlify.

## Primera publicación

En [Settings → Pages](https://github.com/patagoniatec-ux/dibujo-cad/settings/pages), elegí **Deploy from a branch**, seleccioná **main** y **/ (root)**, y guardá con **Save**. Los siguientes cambios en `main` se publican automáticamente. GitHub creará su proceso de Pages sin instalar dependencias.

Dirección prevista: https://patagoniatec-ux.github.io/dibujo-cad/

## Secciones

Inicio, láminas y actividades, biblioteca y normas IRAM, tutoriales CAD/3D, IA aplicada al dibujo, realidad virtual, trabajos del aula y Expo, materiales y servicios, noticias, tema de clase, consultas y administración.

La portada respeta el diseño aprobado: Materiales y servicios ocupa el espacio destacado de tres imágenes; Trabajos del aula y Expo aparece como tarjeta de recursos.

## Panel docente

1. Abrí `administrar.html`.
2. Creá un **fine-grained personal access token** de la cuenta `patagoniatec-ux`, limitado a `dibujo-cad`, con permiso **Contents: Read and write**. Elegí una fecha de vencimiento. No hace falta permiso Workflows para publicar contenido desde el panel.
3. Conectá el token en el panel. Solo se mantiene en memoria durante la sesión; no se almacena en cookies, localStorage, archivos ni el repositorio.
4. Agregá o editá registros; guardalos en la sesión. Los archivos seleccionados también quedan pendientes hasta publicar.
5. Pulsá **Publicar en GitHub** para guardar contenido y archivos en un único commit. El panel verifica cambios concurrentes y evita sobrescribir una versión más reciente.
6. Revisá el resultado de GitHub Pages en Actions. Una confirmación de guardado en GitHub no significa que el despliegue ya haya terminado.

Carga de recursos: hasta 8 MB por archivo. Los archivos se guardan en `recursos/archivos/` y las imágenes en `assets/cargas/`. Para archivos mayores usá enlaces externos. Cerrar o recargar antes de publicar pierde los cambios de esa sesión. Podés descargar una copia JSON del contenido pendiente; los archivos todavía no subidos no se incluyen en esa copia. Quitar una ficha no borra su archivo previo del repositorio.

Los alumnos pueden ver la ruta del panel, pero solo la cuenta propietaria con permiso de escritura puede publicar. No se guarda una contraseña ni un token en el sitio. Todos los recursos que se publiquen en este repositorio son públicos.

También se puede editar `data/contenido.json` directamente desde GitHub. Mantené únicos los IDs de cada registro.

## Consultas

El formulario prepara un mensaje a `patagoniatec@gmail.com` mediante `mailto:`. Abre la aplicación de correo del visitante y requiere que este complete el envío. No almacena consultas ni afirma que fueron enviadas. Se pueden agregar archivos desde la aplicación de correo. Para recibir formularios directamente sin un cliente de correo será necesario conectar un servicio de formularios más adelante.

## Contenido inicial

Las actividades son propuestas didácticas; no tienen fechas de entrega confirmadas. El tema inicial también figura como propuesta. Hay una plantilla A3 SVG propia y una lista de revisión descargable. La biblioteca enlaza el manual externo de normas IRAM y la información oficial; no reproduce el manual dentro del repositorio.

Las noticias iniciales distinguen recursos, guías propias y propuestas. No anuncian versiones de software sin verificar. La galería y el directorio están preparados para cargar contenido real: no se inventan alumnos ni comercios. Las imágenes ilustrativas se extrajeron de la propuesta visual aprobada.

## Estructura

- `*.html`: páginas del aula.
- `styles.css`: diseño responsive.
- `app.js`: contenido público, filtros, detalle y consultas.
- `admin.js`: publicación del docente mediante API de GitHub.
- `data/contenido.json`: datos editables.
- `assets/`: imágenes y marca.
- `recursos/`: archivos de descarga.
- `scripts/validar.py`: comprobación de contenido y enlaces locales.

Validación local: `python3 scripts/validar.py`; `node --check app.js`; `node --check admin.js`.

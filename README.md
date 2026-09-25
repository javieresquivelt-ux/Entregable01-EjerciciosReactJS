# ConquerBlocks — ReactJS: Entrega de Ejercicios Prácticos

> Colección interactiva y modular de 9 soluciones prácticas desarrolladas con **React 19**, **Vite** (arquitectura multipágina MPA) y **Sass** bajo la metodología BEM y arquitectura 7-1. Diseñado para ofrecer una experiencia de usuario limpia, moderna y pedagógica.

---

## 🎯 1. Objetivos del Proyecto

El objetivo pedagógico principal es migrar ejercicios esenciales de JavaScript Vanilla hacia la arquitectura declarativa de **ReactJS**, aplicando buenas prácticas modernas sin sobrecargar las soluciones:

* **Manejo declarativo de estado:** Uso de los hooks `useState` (incluyendo su variante funcional y lazy initialization) y `useEffect` con sincronización de efectos y funciones de limpieza (*cleanup functions*).
* **Flujo unidireccional de datos:** Eventos sintéticos normalizados (`onClick`, `onChange`, `onSubmit`), paso de props e inmutabilidad en arrays y objetos.
* **Estado derivado (*Derived State*):** Computación de valores derivados al vuelo (filtros, conteos léxicos, métricas) para evitar duplicación y desincronización de estado.
* **Integración con Web APIs nativas:** Manipulación del DOM global (`document.body`), APIs criptográficas (`crypto.randomUUID()`), portapapeles (`navigator.clipboard`) y persistencia local (`localStorage`).
* **Arquitectura Multipágina (MPA):** Configuración de Vite para compilar múltiples puntos de entrada HTML independientes manteniendo un único bundle de estilos y componentes compartidos.

---

## 📁 2. Estructura de Archivos

```plaintext
.
├── index.html                      # Landing page principal y catálogo general
├── js_ejercicio_1.html             # Punto de entrada HTML: Ejercicio 1 (Color Picker)
├── js_ejercicio_2.html             # Punto de entrada HTML: Ejercicio 2 (Contador de Clics)
├── js_ejercicio_3.html             # Punto de entrada HTML: Ejercicio 3 (Lista Dinámica)
├── js_ejercicio_4.html             # Punto de entrada HTML: Ejercicio 4 (Filtro en Tiempo Real)
├── js_ejercicio_5.html             # Punto de entrada HTML: Ejercicio 5 (Calculadora Sencilla)
├── js_ejercicio_6.html             # Punto de entrada HTML: Ejercicio 6 (Temporizador)
├── js_ejercicio_7.html             # Punto de entrada HTML: Ejercicio 7 (Generador Contraseñas)
├── js_ejercicio_8.html             # Punto de entrada HTML: Ejercicio 8 (Contador de Palabras)
├── js_ejercicio_9.html             # Punto de entrada HTML: Ejercicio 9 (Lista con LocalStorage)
│
├── public/                         # Archivos estáticos servidos directamente por Vite
│   ├── favicon.svg                 # Favicon vectorial con marca "RJS"
│   └── icons.svg                   # Sprite SVG para iconos del proyecto
│
├── src/                            # Código fuente principal de la aplicación React
│   ├── main.jsx                    # Montaje de React para la landing (index.html)
│   ├── App.jsx                     # Componente raíz de la landing page
│   ├── js_ejercicio1.jsx           # Montaje de React para Ejercicio 1
│   ├── js_ejercicio2.jsx           # Montaje de React para Ejercicio 2
│   ├── js_ejercicio3.jsx           # Montaje de React para Ejercicio 3
│   ├── js_ejercicio4.jsx           # Montaje de React para Ejercicio 4
│   ├── js_ejercicio5.jsx           # Montaje de React para Ejercicio 5
│   ├── js_ejercicio6.jsx           # Montaje de React para Ejercicio 6
│   ├── js_ejercicio7.jsx           # Montaje de React para Ejercicio 7
│   ├── js_ejercicio8.jsx           # Montaje de React para Ejercicio 8
│   ├── js_ejercicio9.jsx           # Montaje de React para Ejercicio 9
│   │
│   ├── components/                 # Componentes funcionales reutilizables
│   │   ├── ExerciseCard.jsx        # Tarjeta interactiva del catálogo
│   │   ├── Ejercicio1.jsx          # Solución #01: Cambiador de color de fondo
│   │   ├── Ejercicio2.jsx          # Solución #02: Contador de clics reactivo
│   │   ├── Ejercicio3.jsx          # Solución #03: Lista dinámica con arrays inmutables
│   │   ├── Ejercicio4.jsx          # Solución #04: Filtro de búsqueda en tiempo real
│   │   ├── Ejercicio5.jsx          # Solución #05: Calculadora básica con validaciones
│   │   ├── Ejercicio6.jsx          # Solución #06: Cronómetro/temporizador con setInterval
│   │   ├── Ejercicio7.jsx          # Solución #07: Generador de contraseñas de alta entropía
│   │   ├── Ejercicio8.jsx          # Solución #08: Análisis léxico de palabras y caracteres
│   │   └── Ejercicio9.jsx          # Solución #09: Gestor de tareas con persistencia
│   │
│   ├── data/                       # Fuente de datos centralizada
│   │   └── exercises.js            # Catálogo con metadata, taxonomía y rutas de cada ejercicio
│   │
│   └── scss/                       # Arquitectura de estilos Sass (Patrón 7-1)
│       ├── abstracts/              # Variables de tokens, colores, tipografía y mixins
│       │   └── _variables.scss
│       ├── base/                   # Reseteo universal y tipografía base
│       │   └── _reset.scss
│       ├── components/             # Estilos de botones, tarjetas, badges y formularios
│       │   ├── _badge.scss
│       │   ├── _buttons.scss
│       │   └── _card.scss
│       ├── layout/                 # Estructuras de rejilla, cabeceras y contenedores
│       │   ├── _header.scss
│       │   └── _layout.scss
│       └── app.scss                # Archivo manifiesto de importación Sass
│
├── vite.config.js                  # Configuración de Vite con detección automática de entradas MPA
├── package.json                    # Dependencias y scripts del proyecto
├── eslint.config.js                # Reglas de linting modernas con ESLint 9
└── README.md                       # Documentación técnica integral
```

---

## 🖥️ 3. Secciones del Sitio y Características Técnicas

### 3.1. Landing Page (`index.html`)

| Sección | Descripción y Características de React / CSS |
| :--- | :--- |
| **Header (Navbar Sticky)** | Barra de navegación superior fija (`position: sticky`) con efecto translúcido `backdrop-filter: blur(12px)`. Incluye el logo badge monoespaciado `REACT`, título institucional `ConquerBlocks • Entrega 1` y badge de versión `React 19`. |
| **Hero Section** | Encabezado principal centrado con píldora superior (`🚀 Módulo Práctico de Frontend`), título con acento en color índigo (`text-gradient`) y subtítulo pedagógico explicativo. |
| **Catálogo de Ejercicios** | Rejilla responsive (`display: grid`) que recorre el arreglo `EXERCISES` mediante `.map()`. Renderiza instancias del componente [`ExerciseCard`](file:///src/components/ExerciseCard.jsx) con animación hover, elevación de sombra (`box-shadow`), badge de categoría y enlace a cada solución. |
| **Footer Unificado** | Pie institucional con créditos oficiales a ConquerBlocks. **Nota de diseño:** El footer se incluye de forma exclusiva en la landing page para no interferir visualmente con los fondos dinámicos de los ejercicios. |

### 3.2. Páginas de Ejercicio (`js_ejercicio_N.html`)

* **Navegación Unificada:** Navbar superior con botón de retorno intuitivo a la izquierda (`← Volver al catálogo`) y badge temático de categoría a la derecha.
* **Tarjeta de Ejercicio (`.exercise-card`):**
  * Cabecera con número identificador en tipografía monoespaciada (`#01` a `#09`), título del ejercicio y badge temático.
  * **Recuadro de Objetivo Pedagógico:** Bloque en tono Slate suave con borde lateral izquierdo índigo (`border-left: 3px solid #4f46e5`) que detalla la meta de aprendizaje.
  * **Área de Trabajo Interactiva (`.exercise-card__workspace`):** Contenedor delimitado donde vive y opera el componente React del ejercicio.

---

## 🛠️ 4. Tecnologías Utilizadas

* **[React 19](https://react.dev/):** Biblioteca principal para la interfaz de usuario, empleando componentes funcionales y hooks modernos (`useState`, `useEffect`).
* **[Vite 8](https://vitejs.dev/):** Entorno de compilación ultra-rápido configurado con arquitectura multipágina (*Multi-Page Application*) para generar 10 documentos HTML independientes.
* **[Sass (Dart Sass)](https://sass-lang.com/):** Preprocesador CSS organizado bajo la arquitectura modular **7-1**, utilizando variables, mixins y metodología BEM para clases legibles y mantenibles.
* **[ESLint 9](https://eslint.org/):** Análisis estático de código para garantizar buenas prácticas y ausencia de variables no utilizadas o dependencias faltantes.
* **Google Fonts:** Fuentes web optimizadas vía preconexión (`Inter` y `JetBrains Mono`).

---

## 🎨 5. Paleta de Colores

El proyecto implementa el sistema de diseño oficial **Slate Light + Indigo**, garantizando un contraste accesible (cumpliendo pautas WCAG) y una estética premium:

| Nombre del Token | Valor HEX | Uso y Propósito |
| :--- | :---: | :--- |
| **Fondo Base** (`$color-bg-base`) | `#f8fafc` | Fondo global limpio y suave de la aplicación (Slate 50). |
| **Superficie** (`$color-bg-surface`) | `#ffffff` | Fondo de tarjetas, campos de formulario y contenedores elevados. |
| **Fondo Sutil** (`$color-bg-subtle`) | `#f1f5f9` | Fondo de cajas informativas, objetivos y bloques de código (Slate 100). |
| **Acento Primario** (`$color-primary`) | `#4f46e5` | Color insignia (Indigo 600) para botones principales, badges activos y enlaces. |
| **Primario Hover** (`$color-primary-hover`) | `#4338ca` | Estado de interacción hover para botones y acciones principales (Indigo 700). |
| **Primario Light** (`$color-primary-light`) | `#eef2ff` | Fondo sutil de etiquetas, números de ejercicio y tags destacados. |
| **Borde Primario** (`$color-primary-border`) | `#c7d2fe` | Delimitador suave para números y anillos de foco accesible (Indigo 200). |
| **Texto Título** (`$color-text-title`) | `#0f172a` | Encabezados principales con máximo contraste y legibilidad (Slate 900). |
| **Texto Cuerpo** (`$color-text-body`) | `#475569` | Texto para párrafos, instrucciones y descripciones (Slate 600). |
| **Texto Muted** (`$color-text-muted`) | `#64748b` | Metadatos, etiquetas secundarias y textos complementarios (Slate 500). |
| **Borde Estándar** (`$color-border`) | `#e2e8f0` | Líneas divisorias, bordes de tarjetas e inputs (Slate 200). |
| **Borde Punteado** (`$color-border-dashed`) | `#cbd5e1` | Delimitador del área de trabajo interactiva de cada ejercicio (Slate 300). |
| **Éxito / Verde** (`$color-success`) | `#059669` | Indicadores de tareas completadas, temporizador activo y contraseñas fuertes. |
| **Alerta / Ámbar** (`$color-amber`) | `#b45309` | Indicadores de pausa en temporizador y contraseña de nivel medio. |
| **Peligro / Rojo** (`$color-danger`) | `#e11d48` | Mensajes de validación de formularios, división por cero y botones de borrado. |

---

## 🔤 6. Tipografías y Escala Tipográfica

Se emplean dos familias tipográficas de alta legibilidad técnica importadas desde Google Fonts:

1. **`Inter`** (`sans-serif`): Utilizada para todos los textos de navegación, títulos, botones y párrafos generales.
2. **`JetBrains Mono`** (`monospace`): Utilizada para números de ejercicio (`#01` a `#09`), displays digitales (reloj, clics, código HEX), inputs numéricos y contraseñas.

### Escala de Tamaños y Jerarquía

| Nivel / Elemento | Tamaño / Tamaño Relativo | Peso (*Weight*) | Familia |
| :--- | :---: | :---: | :--- |
| **Display Grande (Reloj / Clics)** | `3.25rem – 4rem` (52–64px) | 800 (Extra Bold) | `JetBrains Mono` |
| **Encabezado H1 (Hero Landing)** | `clamp(2rem, 4vw, 3rem)` | 800 (Extra Bold) | `Inter` |
| **Encabezado H1 (Página Ejercicio)** | `1.5rem – 1.75rem` (24–28px) | 700 (Bold) | `Inter` |
| **Encabezado H2 (Subsecciones)** | `clamp(1.5rem, 3vw, 2.25rem)` | 700 (Bold) | `Inter` |
| **Encabezado H3 (Títulos Tarjetas)** | `1.25rem – 1.35rem` (20–22px) | 700 (Bold) | `Inter` |
| **Texto de Cuerpo (`p`)** | `1rem` (16px) | 400 (Regular) / 500 (Medium) | `Inter` |
| **Inputs y Botones** | `0.95rem – 1rem` (15–16px) | 500 (Medium) / 600 (Semi Bold) | `Inter` / `Mono` |
| **Textos Muted y Metadatos** | `0.85rem – 0.875rem` (13–14px) | 400 (Regular) | `Inter` |
| **Badges y Etiquetas Píldora** | `0.75rem – 0.8rem` (12–13px) | 700 (Bold) | `JetBrains Mono` / `Inter` |

---

## 💡 7. Aprendizajes Clave

1. **El Estado (`useState`) hace la magia:**  
   En JavaScript tradicional teníamos que buscar elementos en el HTML con `document.querySelector` y cambiar su texto a mano. En React, simplemente guardamos el dato en una variable de estado (`useState`) y la pantalla se actualiza sola cada vez que cambia.

2. **Interacción con el usuario en tiempo real:**  
   Aprendimos a conectar lo que el usuario hace (hacer clic en un botón, escribir en un campo o marcar una casilla) usando eventos sencillos como `onClick` y `onChange`, viendo los resultados en pantalla al instante.

3. **Agregar y eliminar elementos sin dañar la lista original:**  
   Al crear listas dinámicas o listas de tareas, aprendimos que en React no modificamos el arreglo original directamente (no usamos `push`). En su lugar, creamos una lista nueva usando `[...tareas, nuevaTarea]` para agregar y `.filter()` para borrar.

4. **Calcular solo lo necesario (Mantener el código simple):**  
   Descubrimos que no hace falta guardar todo en variables de estado. Si algo se puede calcular directamente —como contar cuántas palabras hay escritas o filtrar elementos según lo que se busca—, es mucho mejor calcularlo al vuelo.

5. **Guardar datos en la memoria del navegador (`localStorage`):**  
   Vimos cómo guardar información (como la lista de tareas) para que no se pierda al recargar o cerrar la página web.

6. **Cuidado con los temporizadores (`useEffect`):**  
   Al crear el cronómetro aprendimos a usar `useEffect` y la importancia de apagar los intervalos (`clearInterval`) al pausar o salir del ejercicio, evitando que el navegador siga trabajando de fondo innecesariamente.

## 👨‍💻 8. Autor y Créditos
- **Estudiante / Desarrollador:** Javier Esquivel
- **Formación:** Master en Desarrollo Web / ReactJS — Conquer Blocks

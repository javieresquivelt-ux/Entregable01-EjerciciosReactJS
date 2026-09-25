/**
 * ConquerBlocks - ReactJS: Entrega de Ejercicios
 *
 * Catálogo centralizado de datos para el renderizado del catálogo interactivo en la landing.
 * Define la metadata, rutas relativas (MPA), badges temáticos y objetivos
 * pedagógicos de cada uno de los 9 ejercicios prácticos de React.
 */
export const EXERCISES = [
  {
    id: 1,
    number: '#01',
    title: 'Cambiador de Color',
    file: './js_ejercicio_1.html',
    badge: 'DOM & ESTILOS',
    badgeClass: 'badge--dom',
    description:
      'Generación y aplicación dinámica de colores aleatorios sobre los estilos del fondo mediante el estado reactivo de React.',
    objective:
      'Practicar eventos en React y manipulación reactiva de estilos en el DOM.',
    status: 'completed',
  },
  {
    id: 2,
    number: '#02',
    title: 'Contador de Clics',
    file: './js_ejercicio_2.html',
    badge: 'EVENTOS',
    badgeClass: 'badge--events',
    description:
      'Gestión de eventos de interacción y actualización reactiva del contador en el DOM mediante el hook useState.',
    objective:
      'Practicar el manejo de eventos y la actualización del contenido del DOM.',
    status: 'completed',
  },
  {
    id: 3,
    number: '#03',
    title: 'Lista Dinámica',
    file: './js_ejercicio_3.html',
    badge: 'NODOS DOM',
    badgeClass: 'badge--dom',
    description:
      'Inserción y eliminación dinámica de elementos en listas inmutables mediante renderizado declarativo.',
    objective:
      'Trabajar con la creación, eliminación y manipulación de elementos del DOM.',
    status: 'completed',
  },
  {
    id: 4,
    number: '#04',
    title: 'Filtro de Búsqueda',
    file: './js_ejercicio_4.html',
    badge: 'TIEMPO REAL',
    badgeClass: 'badge--events',
    description:
      'Filtrado reactivo sobre colecciones en tiempo real mediante eventos de teclado y estados derivados.',
    objective:
      'Practicar la interacción entre eventos del DOM y lógica en JavaScript.',
    status: 'completed',
  },
  {
    id: 5,
    number: '#05',
    title: 'Calculadora Sencilla',
    file: './js_ejercicio_5.html',
    badge: 'FORMULARIOS',
    badgeClass: 'badge--forms',
    description:
      'Operaciones aritméticas esenciales con validación de entradas numéricas y control de excepciones (división por cero).',
    objective:
      'Practicar la manipulación de formularios, eventos y lógica básica de JavaScript.',
    status: 'completed',
  },
  {
    id: 6,
    number: '#06',
    title: 'Temporizador Completo',
    file: './js_ejercicio_6.html',
    badge: 'ASINCRONIA',
    badgeClass: 'badge--async',
    description:
      'Control preciso de intervalos temporales con useEffect, formateo digital HH:MM:SS y limpieza de timers.',
    objective:
      'Practicar manejo de eventos, funciones de temporización y manipulación del DOM.',
    status: 'completed',
  },
  {
    id: 7,
    number: '#07',
    title: 'Generador de Contraseñas',
    file: './js_ejercicio_7.html',
    badge: 'SEGURIDAD',
    badgeClass: 'badge--events',
    description:
      'Algoritmo de generación criptográfica aleatoria de caracteres alfanuméricos y símbolos con longitud configurable.',
    objective:
      'Practicar generación de cadenas aleatorias y uso de formularios.',
    status: 'completed',
  },
  {
    id: 8,
    number: '#08',
    title: 'Contador de Palabras',
    file: './js_ejercicio_8.html',
    badge: 'STRINGS & REGEX',
    badgeClass: 'badge--dom',
    description:
      'Análisis léxico en tiempo real con expresiones regulares para conteo diferenciado de palabras y caracteres sin espacios.',
    objective:
      'Practicar eventos en tiempo real y manipulación avanzada del DOM.',
    status: 'completed',
  },
  {
    id: 9,
    number: '#09',
    title: 'Lista de Tareas (CRUD)',
    file: './js_ejercicio_9.html',
    badge: 'LOCALSTORAGE',
    badgeClass: 'badge--storage',
    description:
      'Persistencia de estado en el navegador mediante localStorage, operaciones CRUD y sincronización de datos.',
    objective:
      'Practicar persistencia de datos con localStorage.',
    status: 'completed',
  },
]

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'conquer_blocks_tasks'

// Tareas de muestra pedagógicas iniciales si localStorage está vacío
const INITIAL_TASKS = [
  {
    id: 'task-1',
    text: 'Aprender los fundamentos de useState y useEffect en React',
    completed: true,
  },
  {
    id: 'task-2',
    text: 'Comprender el ciclo de persistencia de datos con localStorage',
    completed: false,
  },
  {
    id: 'task-3',
    text: 'Validar la entrega final en GitHub Pages',
    completed: false,
  },
]

/**
 * Componente: Ejercicio9 (Lista de Tareas con LocalStorage)
 *
 * Conceptos clave de React y JavaScript practicados:
 * 1. Inicialización Perezosa (Lazy Initial State):
 *    ¡PATRÓN CLAVE DE RENDIMIENTO! Al pasar una función a `useState(() => ...)`,
 *    React ejecuta la lectura y parseo de `localStorage` ÚNICAMENTE en el montaje inicial,
 *    evitando operaciones de I/O sincrónicas bloqueantes en cada re-renderizado.
 * 2. Persistencia reactiva con `useEffect`:
 *    Cada vez que el estado `tasks` cambia (agregar, alternar completado, eliminar, limpiar),
 *    un efecto sincroniza automáticamente el array serializado con `localStorage.setItem`.
 * 3. Actualizaciones inmutables de colecciones complejas:
 *    - Agregar: `[...tasks, newTask]`
 *    - Modificar (Toggle): `tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)`
 *    - Eliminar: `tasks.filter(t => t.id !== id)`
 *    - Limpiar completadas: `tasks.filter(t => !t.completed)`
 * 4. Estado Derivado para filtros y métricas de progreso (pendientes, completadas, porcentaje).
 */
export function Ejercicio9() {
  // Estado para el texto del nuevo ítem a agregar
  const [taskInput, setTaskInput] = useState('')

  // Estado para el filtro de visualización activo: 'all' | 'pending' | 'completed'
  const [filter, setFilter] = useState('all')

  /**
   * Estado principal de tareas con Inicialización Perezosa (Lazy Initial State)
   */
  const [tasks, setTasks] = useState(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY)
      if (storedData) {
        return JSON.parse(storedData)
      }
    } catch {
      // Fallback a tareas iniciales si localStorage no está disponible
    }
    return INITIAL_TASKS
  })

  /**
   * Sincronización automática de tareas con localStorage ante cualquier modificación
   */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // Manejo silencioso en caso de superar cuota o navegación privada restringida
    }
  }, [tasks])

  /**
   * Agrega una nueva tarea a la lista
   */
  const handleAddTask = (e) => {
    e.preventDefault()
    const trimmed = taskInput.trim()
    if (trimmed === '') return

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    }

    setTasks((prev) => [newTask, ...prev])
    setTaskInput('')
  }

  /**
   * Alterna el estado de completada de una tarea
   */
  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  /**
   * Elimina una tarea individual por su identificador
   */
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  /**
   * Limpia todas las tareas completadas y actualiza localStorage
   * (Requisito explícito de la consigna)
   */
  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  // ── Métricas y Estado Derivado ───────────────────────────────────────────
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const pendingTasks = totalTasks - completedTasks
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  // Filtrado de la lista según la pestaña activa
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <>
      {/* ── Navbar Superior ───────────────────────────────────────────────── */}
      <header className="header">
        <div className="container header__content">
          <a href="./index.html" className="btn btn--back">
            ← Volver al catálogo
          </a>
          <span className="badge badge--storage">LocalStorage</span>
        </div>
      </header>

      {/* ── Contenido Principal ────────────────────────────────────────────── */}
      <main className="container container--narrow exercise-layout">
        <article className="exercise-card">

          <div className="exercise-card__header">
            <div className="exercise-card__title-group">
              <span className="exercise-card__number">#09</span>
              <h1 className="exercise-card__title">Lista de Tareas con LocalStorage</h1>
            </div>
          </div>

          <div className="exercise-card__objective">
            <strong>Objetivo:</strong> Implementar persistencia completa de datos en el navegador con
            <code>localStorage</code>. Cada tarea cuenta con checkbox para marcarla como completada,
            y se incluye un botón para limpiar las completadas manteniendo sincronizado el almacenamiento.
          </div>

          {/* ── Área de Trabajo Interactiva ───────────────────────────────── */}
          <div className="exercise-card__workspace">
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>

              {/* Formulario de entrada de nueva tarea */}
              <form
                onSubmit={handleAddTask}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom: '1.25rem',
                }}
              >
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  placeholder="¿Qué tarea tienes pendiente hoy?..."
                  style={{
                    flex: 1,
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4f46e5'
                    e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#cbd5e1'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={taskInput.trim() === ''}
                  style={{
                    opacity: taskInput.trim() === '' ? 0.6 : 1,
                    cursor: taskInput.trim() === '' ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Agregar tarea
                </button>
              </form>

              {/* Barra de progreso de tareas completadas */}
              {totalTasks > 0 && (
                <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      color: '#64748b',
                      marginBottom: '0.35rem',
                    }}
                  >
                    <span>
                      Progreso: <strong>{completedTasks}</strong> de <strong>{totalTasks}</strong> tareas ({progressPercent}%)
                    </span>
                    <span>{pendingTasks} pendiente{pendingTasks === 1 ? '' : 's'}</span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      background: '#e2e8f0',
                      borderRadius: '9999px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        background: '#10b981',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Filtros de vista y botón de limpieza de completadas */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {/* Selector de filtro */}
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setFilter('all')}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: filter === 'all' ? '#4f46e5' : '#e2e8f0',
                      background: filter === 'all' ? '#eef2ff' : '#ffffff',
                      color: filter === 'all' ? '#4f46e5' : '#64748b',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Todas ({totalTasks})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('pending')}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: filter === 'pending' ? '#4f46e5' : '#e2e8f0',
                      background: filter === 'pending' ? '#eef2ff' : '#ffffff',
                      color: filter === 'pending' ? '#4f46e5' : '#64748b',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Pendientes ({pendingTasks})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilter('completed')}
                    style={{
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: filter === 'completed' ? '#4f46e5' : '#e2e8f0',
                      background: filter === 'completed' ? '#eef2ff' : '#ffffff',
                      color: filter === 'completed' ? '#4f46e5' : '#64748b',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Completadas ({completedTasks})
                  </button>
                </div>

                {/* Botón de limpiar completadas (Requisito clave) */}
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleClearCompleted}
                  disabled={completedTasks === 0}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.3rem 0.75rem',
                    opacity: completedTasks === 0 ? 0.5 : 1,
                    cursor: completedTasks === 0 ? 'not-allowed' : 'pointer',
                    color: completedTasks > 0 ? '#ef4444' : '#94a3b8',
                    borderColor: completedTasks > 0 ? '#fca5a5' : '#e2e8f0',
                  }}
                  title="Eliminar todas las tareas marcadas como completadas"
                >
                  Limpiar completadas
                </button>
              </div>

              {/* Lista interactiva de tareas */}
              {filteredTasks.length === 0 ? (
                <div
                  style={{
                    padding: '2rem 1rem',
                    textAlign: 'center',
                    background: '#f8fafc',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '8px',
                    color: '#64748b',
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {filter === 'completed'
                      ? 'No hay tareas completadas todavía'
                      : filter === 'pending'
                      ? '¡Genial! No tienes tareas pendientes'
                      : 'La lista de tareas está vacía'}
                  </p>
                  <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.825rem' }}>
                    Las tareas que agregues se guardan automáticamente en tu navegador.
                  </p>
                </div>
              ) : (
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    textAlign: 'left',
                  }}
                >
                  {filteredTasks.map((task) => (
                    <li
                      key={task.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        background: task.completed ? '#f8fafc' : '#ffffff',
                        border: '1px solid',
                        borderColor: task.completed ? '#e2e8f0' : '#cbd5e1',
                        borderRadius: '8px',
                        boxShadow: task.completed ? 'none' : '0 1px 2px rgba(15, 23, 42, 0.04)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {/* Checkbox y Texto de la tarea */}
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          flex: 1,
                          userSelect: 'none',
                          marginRight: '0.5rem',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.id)}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#4f46e5',
                            cursor: 'pointer',
                          }}
                          aria-label={`Marcar como completada: ${task.text}`}
                        />
                        <span
                          style={{
                            fontSize: '0.95rem',
                            color: task.completed ? '#94a3b8' : '#1e293b',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            transition: 'color 0.2s ease, text-decoration 0.2s ease',
                            wordBreak: 'break-word',
                          }}
                        >
                          {task.text}
                        </span>
                      </label>

                      {/* Botón individual de eliminar tarea */}
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#94a3b8',
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          padding: '0.2rem 0.4rem',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                        title="Eliminar tarea"
                        aria-label="Eliminar tarea"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}

            </div>
          </div>
        </article>
      </main>
    </>
  )
}

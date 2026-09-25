import { useState } from 'react'

/**
 * Lista base predefinida de elementos a filtrar.
 * Se define fuera del componente para no recrear la referencia en cada render.
 */
const DEFAULT_ITEMS = [
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Vite',
  'HTML5',
  'CSS3',
  'Sass',
  'Git',
  'Next.js',
  'Python',
  'Docker',
]

/**
 * Componente: Ejercicio4 (Filtro de Búsqueda en Tiempo Real)
 *
 * Conceptos clave de React practicados:
 * 1. Inputs controlados: El campo de búsqueda refleja en todo momento
 *    el estado reactivo `searchTerm` vía `value` y `onChange`.
 * 2. Estado Derivado (Derived State):
 *    ¡PATRÓN RECOMENDADO EN REACT! No guardamos `filteredItems` en un segundo
 *    useState. Si un dato puede deducirse en tiempo de ejecución a partir
 *    del estado actual (`searchTerm`) y los datos base (`DEFAULT_ITEMS`),
 *    se calcula en el cuerpo de la función. Esto previene desincronizaciones
 *    y re-renders innecesarios.
 * 3. Inmutabilidad y funciones de orden superior: Uso de `.filter()` y
 *    `.includes()` con normalización en minúsculas (`.toLowerCase()`).
 */
export function Ejercicio4() {
  // Estado para el término de búsqueda ingresado
  const [searchTerm, setSearchTerm] = useState('')

  /**
   * Cálculo de estado derivado:
   * Filtramos los elementos que contengan la cadena buscada (insensible a mayúsculas/minúsculas).
   */
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredItems = DEFAULT_ITEMS.filter((item) =>
    item.toLowerCase().includes(normalizedSearch)
  )

  /**
   * Limpia el campo de búsqueda
   */
  const handleClear = () => {
    setSearchTerm('')
  }

  return (
    <>
      {/* ── Navbar Superior ───────────────────────────────────────────────── */}
      <header className="header">
        <div className="container header__content">
          <a href="./index.html" className="btn btn--back">
            ← Volver al catálogo
          </a>
          <span className="badge badge--events">Tiempo Real</span>
        </div>
      </header>

      {/* ── Contenido Principal ────────────────────────────────────────────── */}
      <main className="container container--narrow exercise-layout">
        <article className="exercise-card">

          <div className="exercise-card__header">
            <div className="exercise-card__title-group">
              <span className="exercise-card__number">#04</span>
              <h1 className="exercise-card__title">Filtro de Búsqueda en Tiempo Real</h1>
            </div>
          </div>

          <div className="exercise-card__objective">
            <strong>Objetivo:</strong> Practicar la interacción entre eventos de entrada en tiempo
            real y la reactividad de React. Implementar el concepto de <em>Estado Derivado</em>,
            filtrando la colección al vuelo sin estados redundantes.
          </div>

          {/* ── Área de Trabajo Interactiva ───────────────────────────────── */}
          <div className="exercise-card__workspace">
            <div style={{ maxWidth: '440px', margin: '0 auto' }}>

              {/* Barra de búsqueda interactiva */}
              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Escribe para filtrar (ej. 'React', 'Script')..."
                  aria-label="Buscar en la lista"
                  style={{
                    width: '100%',
                    padding: '0.625rem 2.5rem 0.625rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    boxSizing: 'border-box',
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

                {/* Botón de limpiar búsqueda cuando hay texto */}
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClear}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: '#e2e8f0',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      color: '#475569',
                      padding: 0,
                    }}
                    title="Limpiar búsqueda"
                    aria-label="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Contador de resultados */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                  color: '#64748b',
                }}
              >
                <span>
                  Resultados:{' '}
                  <strong style={{ color: '#0f172a' }}>{filteredItems.length}</strong> de{' '}
                  {DEFAULT_ITEMS.length}
                </span>
                {searchTerm && (
                  <span
                    style={{
                      fontSize: '0.8rem',
                      background: '#eef2ff',
                      color: '#4f46e5',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    Filtro: &quot;{searchTerm}&quot;
                  </span>
                )}
              </div>

              {/* Lista filtrada de elementos */}
              {filteredItems.length === 0 ? (
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
                  <p style={{ margin: 0, fontWeight: 500, color: '#475569' }}>
                    No se encontraron coincidencias
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '0.875rem' }}>
                    Ningún elemento coincide con &quot;{searchTerm}&quot;
                  </p>
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={handleClear}
                    style={{ fontSize: '0.875rem', padding: '0.35rem 0.85rem' }}
                  >
                    Restablecer lista
                  </button>
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
                  }}
                >
                  {filteredItems.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
                        transition: 'transform 0.15s ease, border-color 0.15s ease',
                      }}
                    >
                      <span style={{ color: '#1e293b', fontWeight: 500 }}>
                        {item}
                      </span>
                      <span
                        className="badge"
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.5rem',
                          background: '#f1f5f9',
                          color: '#64748b',
                        }}
                      >
                        Item
                      </span>
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

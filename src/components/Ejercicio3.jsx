import { useState } from 'react'

/**
 * Componente: Ejercicio3 (Lista Dinámica)
 *
 * Conceptos de React practicados:
 * 1. Formularios controlados (Controlled Components): El valor del input 
 *    está ligado al estado `inputValue`.
 * 2. Manejo de arrays en estado: Actualizamos arreglos inmutables usando 
 *    el operador spread `[...items, newItem]` o `.filter()`.
 * 3. Renderizado de listas: Uso de `map()` para generar elementos JSX. 
 *    Cada elemento requiere una prop `key` única.
 */
export function Ejercicio3() {
  // Estado para el valor del campo de texto
  const [inputValue, setInputValue] = useState('')
  // Estado para la lista de elementos (array vacío inicialmente)
  const [items, setItems] = useState([])

  /**
   * Actualiza el estado del input a medida que el usuario escribe.
   */
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  /**
   * Maneja el envío del formulario para agregar un nuevo elemento.
   */
  const handleAddItem = (e) => {
    e.preventDefault() // Previene la recarga de la página

    // Evitar añadir strings vacíos
    if (inputValue.trim() === '') return

    const newItem = {
      // Uso de crypto.randomUUID() para generar IDs únicos robustos
      id: crypto.randomUUID(), 
      text: inputValue.trim()
    }

    // Actualización inmutable del array
    setItems([...items, newItem])
    // Limpieza del input
    setInputValue('')
  }

  /**
   * Elimina un elemento de la lista filtrando su ID.
   */
  const handleDeleteItem = (idToDelete) => {
    // filter crea un NUEVO array excluyendo el elemento que coincida
    setItems(items.filter((item) => item.id !== idToDelete))
  }

  return (
    <>
      {/* ── Navbar Superior ───────────────────────────────────────────────── */}
      <header className="header">
        <div className="container header__content">
          <a href="./index.html" className="btn btn--back">
            ← Volver al catálogo
          </a>
          <span className="badge badge--listas" style={{ background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
            Listas & DOM
          </span>
        </div>
      </header>

      {/* ── Contenido Principal ────────────────────────────────────────────── */}
      <main className="container container--narrow exercise-layout">
        <article className="exercise-card">

          <div className="exercise-card__header">
            <div className="exercise-card__title-group">
              <span className="exercise-card__number">#03</span>
              <h1 className="exercise-card__title">Lista Dinámica</h1>
            </div>
          </div>

          <div className="exercise-card__objective">
            <strong>Objetivo:</strong> Trabajar con la creación, eliminación y manipulación 
            de elementos en una lista interactiva. Entender cómo mutar arrays en React 
            de forma inmutable y el uso de la propiedad <code>key</code> al renderizar.
          </div>

          {/* ── Área de Trabajo Interactiva ───────────────────────────────── */}
          <div className="exercise-card__workspace">
            
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              
              {/* Formulario de entrada */}
              <form 
                onSubmit={handleAddItem} 
                style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}
              >
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Escribe un nuevo elemento..."
                  style={{
                    flex: 1,
                    padding: '0.625rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
                  onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                />
                <button 
                  type="submit"
                  className="btn btn--primary"
                  disabled={inputValue.trim() === ''}
                  style={{ opacity: inputValue.trim() === '' ? 0.5 : 1, cursor: inputValue.trim() === '' ? 'not-allowed' : 'pointer' }}
                >
                  Agregar
                </button>
              </form>

              {/* Contenedor de la lista dinámica */}
              {items.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', background: '#f1f5f9', borderRadius: '8px', color: '#64748b' }}>
                  <p style={{ margin: 0 }}>La lista está vacía.</p>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>Escribe algo arriba y presiona Agregar.</p>
                </div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {items.map((item) => (
                    <li 
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)',
                        animation: 'fadeIn 0.3s ease-in-out'
                      }}
                    >
                      <span style={{ color: '#1e293b', fontWeight: 500, wordBreak: 'break-word', paddingRight: '1rem' }}>
                        {item.text}
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="btn btn--secondary"
                        style={{ 
                          padding: '0.35rem 0.75rem', 
                          fontSize: '0.875rem', 
                          color: '#ef4444', 
                          borderColor: '#fca5a5',
                          background: '#fef2f2',
                          flexShrink: 0 
                        }}
                        title="Eliminar este elemento"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </article>
      </main>
      
      {/* Añadimos un pequeño bloque de estilos inline para la animación de entrada suave */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

import { useState } from 'react'

/**
 * Componente: Ejercicio2 (Contador de Clics)
 *
 * Conceptos de React practicados:
 * 1. useState  - Almacena el conteo actual de clics de forma reactiva.
 *               Cada llamada a setState provoca un re-render automático
 *               que actualiza la UI sin manipular el DOM directamente.
 * 2. onClick   - Evento sintético de React equivalente al addEventListener
 *               del DOM nativo. React normaliza el evento entre navegadores.
 * 3. Expresión JSX - El valor de `count` se interpola directamente en el
 *               JSX mediante llaves `{}`, reflejando siempre el estado actual.
 *
 * Flujo de datos (unidireccional):
 *   clic del usuario → handleClick → setCount(count + 1) → re-render → UI actualizada
 */
export function Ejercicio2() {
  /**
   * Estado principal: número de clics acumulados.
   * - count      : valor actual (lectura).
   * - setCount   : función para actualizar el estado (escritura).
   * - Valor inicial: 0.
   */
  const [count, setCount] = useState(0)

  /**
   * handleClick: incrementa el contador en 1 por cada clic.
   *
   * Usamos la forma funcional `prev => prev + 1` para garantizar
   * que siempre se trabaja sobre el valor más reciente del estado,
   * evitando condiciones de carrera en actualizaciones rápidas.
   */
  const handleClick = () => setCount(prev => prev + 1)

  /**
   * handleReset: reinicia el contador a 0.
   * Permite al usuario comenzar el conteo de nuevo sin recargar la página.
   */
  const handleReset = () => setCount(0)

  /**
   * Determina el color del contador según el valor actual.
   * - 0         : gris neutro (sin actividad).
   * - 1 – 9    : texto índigo (comenzando a contar).
   * - 10 – 49  : naranja de alerta (conteo medio).
   * - ≥ 50     : rojo de énfasis (conteo alto).
   *
   * Esto introduce el concepto de renderizado condicional de estilos
   * basado en el estado, sin manipulación directa del DOM.
   */
  const getCountColor = () => {
    if (count === 0)  return '#94a3b8'   // slate-400 — neutro
    if (count < 10)   return '#4f46e5'   // indigo-600 — primario
    if (count < 50)   return '#f59e0b'   // amber-500  — alerta
    return '#ef4444'                      // red-500    — énfasis
  }

  return (
    <>
      {/* ── Navbar Superior ─────────────────────────────────────────────────
          ← Volver al catálogo  a la IZQUIERDA
          Badge de categoría    a la DERECHA
          (Regla de diseño establecida en instruction/prompt.md Sección 6)
      ──────────────────────────────────────────────────────────────────── */}
      <header className="header">
        <div className="container header__content">
          <a href="./index.html" className="btn btn--back">
            ← Volver al catálogo
          </a>
          <span className="badge badge--eventos">Eventos</span>
        </div>
      </header>

      {/* ── Contenido Principal ────────────────────────────────────────────── */}
      <main className="container container--narrow exercise-layout">
        <article className="exercise-card">

          {/* Cabecera de la tarjeta */}
          <div className="exercise-card__header">
            <div className="exercise-card__title-group">
              <span className="exercise-card__number">#02</span>
              <h1 className="exercise-card__title">Contador de Clics</h1>
            </div>
          </div>

          {/* Recuadro de Objetivo Pedagógico */}
          <div className="exercise-card__objective">
            <strong>Objetivo:</strong> Practicar el manejo de eventos y la
            actualización reactiva del contenido mediante{' '}
            <code>useState</code> — cada clic incrementa el estado y React
            re-renderiza la UI automáticamente sin tocar el DOM.
          </div>

          {/* ── Área de Trabajo Interactiva ─────────────────────────────────
              Muestra el conteo actual de forma visual y los controles.
          ──────────────────────────────────────────────────────────────────── */}
          <div className="exercise-card__workspace">

            {/* Etiqueta descriptiva del contador */}
            <p style={{ marginBottom: '0.5rem', color: '#64748b' }}>
              Clics registrados:
            </p>

            {/* Visualizador del conteo — cambia de color según el valor */}
            <div
              style={{
                fontSize: '4rem',
                fontWeight: 800,
                fontFamily: "'JetBrains Mono', monospace",
                color: getCountColor(),
                lineHeight: 1,
                marginBottom: '0.5rem',
                transition: 'color 0.3s ease',
                userSelect: 'none',
              }}
              aria-live="polite"
              aria-label={`Clics: ${count}`}
            >
              {count}
            </div>

            {/* Sub-texto que cambia dinámicamente según el valor del contador.
                Ejemplo sencillo de renderizado condicional con operador ternario. */}
            <p
              style={{
                fontSize: '0.875rem',
                color: '#94a3b8',
                marginBottom: '2rem',
                minHeight: '1.25rem',
              }}
            >
              {count === 0
                ? 'Pulsa el botón para comenzar'
                : count === 1
                ? '¡Primer clic!'
                : `¡Llevas ${count} clics!`}
            </p>

            {/* Botones de acción */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {/* Botón principal requerido por la consigna */}
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleClick}
              >
                Contar clics
              </button>

              {/* Botón de reinicio — solo visible cuando count > 0
                  (renderizado condicional con &&) */}
              {count > 0 && (
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleReset}
                  title="Reiniciar contador a 0"
                >
                  Reiniciar
                </button>
              )}
            </div>

          </div>
        </article>
      </main>
    </>
  )
}

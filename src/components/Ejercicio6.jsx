import { useState, useEffect } from 'react'

/**
 * Función utilitaria: formatea una cantidad total de segundos en formato estándar HH:MM:SS.
 *
 * @param {number} totalSeconds Segundos totales acumulados
 * @returns {string} Tiempo formateado como "00:00:00"
 */
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
    .map((val) => String(val).padStart(2, '0'))
    .join(':')
}

/**
 * Componente: Ejercicio6 (Temporizador con Inicio, Pausa y Reinicio)
 *
 * Conceptos clave de React practicados:
 * 1. useEffect y suscripciones a intervalos (setInterval):
 *    Manejo de efectos secundarios asíncronos vinculados al ciclo de vida del componente.
 * 2. Función de limpieza (Cleanup function):
 *    ¡CRUCIAL EN REACT! El retorno de useEffect ejecuta `clearInterval` para evitar fugas
 *    de memoria (memory leaks) e intervalos huérfanos cuando el componente se pausa o desmonta.
 * 3. Actualizador funcional de estado:
 *    Uso de `setSeconds((prev) => prev + 1)` para evitar problemas de "stale closures"
 *    (cierres desactualizados) dentro de la función de callback del temporizador.
 * 4. Control de estados combinados (`seconds` + `isActive`).
 */
export function Ejercicio6() {
  // Estado para los segundos transcurridos
  const [seconds, setSeconds] = useState(0)
  // Estado para indicar si el reloj está corriendo activamente
  const [isActive, setIsActive] = useState(false)

  /**
   * Efecto secundario que administra el ciclo de vida del setInterval.
   * Se re-ejecuta únicamente cuando cambia el estado `isActive`.
   */
  useEffect(() => {
    let intervalId = null

    if (isActive) {
      intervalId = setInterval(() => {
        // Forma funcional: siempre toma el valor más reciente del estado
        setSeconds((prev) => prev + 1)
      }, 1000)
    }

    // Función de limpieza: invocada al pausar, al cambiar isActive o al desmontar el componente
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isActive])

  /**
   * Inicia o reanuda el conteo del temporizador
   */
  const handleStart = () => {
    setIsActive(true)
  }

  /**
   * Pausa el conteo manteniendo el tiempo actual registrado
   */
  const handlePause = () => {
    setIsActive(false)
  }

  /**
   * Detiene el conteo y restablece el cronómetro a 00:00:00
   */
  const handleReset = () => {
    setIsActive(false)
    setSeconds(0)
  }

  return (
    <>
      {/* ── Navbar Superior ───────────────────────────────────────────────── */}
      <header className="header">
        <div className="container header__content">
          <a href="./index.html" className="btn btn--back">
            ← Volver al catálogo
          </a>
          <span className="badge badge--async">Asincronía</span>
        </div>
      </header>

      {/* ── Contenido Principal ────────────────────────────────────────────── */}
      <main className="container container--narrow exercise-layout">
        <article className="exercise-card">

          <div className="exercise-card__header">
            <div className="exercise-card__title-group">
              <span className="exercise-card__number">#06</span>
              <h1 className="exercise-card__title">Temporizador Completo</h1>
            </div>
          </div>

          <div className="exercise-card__objective">
            <strong>Objetivo:</strong> Practicar el control de funciones de temporización asíncronas
            (<code>setInterval</code>) con React mediante el hook <code>useEffect</code>, garantizando
            la limpieza adecuada de timers para evitar fugas de memoria.
          </div>

          {/* ── Área de Trabajo Interactiva ───────────────────────────────── */}
          <div className="exercise-card__workspace">
            <div style={{ maxWidth: '420px', margin: '0 auto', textAlign: 'center' }}>

              {/* Indicador de estado del temporizador */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  background: isActive ? '#ecfdf5' : seconds > 0 ? '#fffbeb' : '#f1f5f9',
                  color: isActive ? '#059669' : seconds > 0 ? '#b45309' : '#64748b',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: isActive ? '#10b981' : seconds > 0 ? '#f59e0b' : '#94a3b8',
                    boxShadow: isActive ? '0 0 8px #10b981' : 'none',
                    animation: isActive ? 'pulse 1.5s infinite' : 'none',
                  }}
                />
                {isActive ? 'En marcha' : seconds > 0 ? 'En pausa' : 'Listo para iniciar'}
              </div>

              {/* Display digital del reloj en JetBrains Mono */}
              <div
                style={{
                  background: '#0f172a',
                  color: '#38bdf8',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '3.25rem',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  padding: '1.5rem 1rem',
                  borderRadius: '12px',
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(15, 23, 42, 0.08)',
                  marginBottom: '2rem',
                  userSelect: 'none',
                }}
                aria-live="polite"
                aria-label={`Tiempo: ${formatTime(seconds)}`}
              >
                {formatTime(seconds)}
              </div>

              {/* Botonera de control de acciones */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {/* Botón Iniciar / Reanudar */}
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleStart}
                  disabled={isActive}
                  style={{
                    minWidth: '110px',
                    opacity: isActive ? 0.6 : 1,
                    cursor: isActive ? 'not-allowed' : 'pointer',
                  }}
                >
                  {seconds > 0 ? 'Reanudar' : 'Iniciar'}
                </button>

                {/* Botón Pausar */}
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handlePause}
                  disabled={!isActive}
                  style={{
                    minWidth: '110px',
                    opacity: !isActive ? 0.6 : 1,
                    cursor: !isActive ? 'not-allowed' : 'pointer',
                  }}
                >
                  Pausar
                </button>

                {/* Botón Reiniciar */}
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleReset}
                  disabled={seconds === 0 && !isActive}
                  style={{
                    minWidth: '110px',
                    opacity: seconds === 0 && !isActive ? 0.6 : 1,
                    cursor: seconds === 0 && !isActive ? 'not-allowed' : 'pointer',
                  }}
                >
                  Reiniciar
                </button>
              </div>

            </div>
          </div>
        </article>
      </main>

      {/* Animación del indicador pulsante */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.15); }
        }
      `}</style>
    </>
  )
}

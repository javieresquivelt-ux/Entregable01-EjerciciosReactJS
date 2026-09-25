import { useState, useEffect } from 'react'

/**
 * Función utilitaria: genera un color hexadecimal aleatorio (#RRGGBB).
 *
 * Explicación:
 * - Math.random() produce un número en [0, 1).
 * - Multiplicado por 0xFFFFFF (16777215) cubre toda la gama de colores RGB.
 * - .toString(16) convierte a base hexadecimal.
 * - .padStart(6, '0') garantiza siempre 6 dígitos.
 */
function generateRandomHex() {
  const randomInt = Math.floor(Math.random() * 16777215)
  return '#' + randomInt.toString(16).padStart(6, '0').toUpperCase()
}

/**
 * Componente: Ejercicio1 (Cambiador de Color de Fondo)
 *
 * Conceptos de React practicados:
 * 1. useState  - Almacena el color actual de forma reactiva.
 * 2. useEffect - Sincroniza el estado con un efecto secundario del DOM global
 *                (document.body.style.backgroundColor). Incluye función de
 *                limpieza (cleanup) para restaurar el fondo al desmontar.
 * 3. onClick   - Evento sintético que dispara la actualización de estado.
 */
export function Ejercicio1() {
  // Estado para el color de fondo actual
  const [bgColor, setBgColor] = useState('#f8fafc')
  const [copied, setCopied] = useState(false)

  /**
   * useEffect: cada vez que bgColor cambia, aplicamos el color al body completo.
   * La función de retorno (cleanup) restaura el color al salir de esta página.
   */
  useEffect(() => {
    document.body.style.backgroundColor = bgColor
    document.body.style.transition = 'background-color 0.4s ease'

    return () => {
      document.body.style.backgroundColor = ''
      document.body.style.transition = ''
    }
  }, [bgColor])

  const handleColorChange = () => {
    setBgColor(generateRandomHex())
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bgColor)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback silencioso si no hay permisos de portapapeles
    }
  }

  return (
    <>
      {/* ── Navbar Superior ─────────────────────────────────────────────────
          Botón "← Volver al catálogo" a la IZQUIERDA (intuitivo).
          Badge de categoría a la DERECHA (como en el sitio de referencia).
      ──────────────────────────────────────────────────────────────────── */}
      <header className="header">
        <div className="container header__content">
          <a href="./index.html" className="btn btn--back">
            ← Volver al catálogo
          </a>
          <span className="badge badge--dom">DOM &amp; Estilos</span>
        </div>
      </header>

      {/* ── Contenido Principal ────────────────────────────────────────────── */}
      <main className="container container--narrow exercise-layout">
        <article className="exercise-card">

          {/* Cabecera de la tarjeta */}
          <div className="exercise-card__header">
            <div className="exercise-card__title-group">
              <span className="exercise-card__number">#01</span>
              <h1 className="exercise-card__title">Cambiador de Color de Fondo</h1>
            </div>
          </div>

          {/* Recuadro de Objetivo Pedagógico */}
          <div className="exercise-card__objective">
            <strong>Objetivo:</strong> Generar dinámicamente un color aleatorio en
            cada clic y aplicarlo como estilo de fondo al documento
            mediante el estado reactivo de React.
          </div>

          {/* ── Área de Trabajo Interactiva ─────────────────────────────────
              El color de fondo se aplica al body completo (useEffect),
              este workspace muestra únicamente el visualizador y los controles.
          ──────────────────────────────────────────────────────────────────── */}
          <div className="exercise-card__workspace">
            {/* Etiqueta descriptiva */}
            <p style={{ marginBottom: '1rem', color: '#64748b' }}>
              Color actual de fondo:
            </p>

            {/* Código HEX destacado en pastilla mono */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                className="text-mono"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  background: '#f1f5f9',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              >
                {bgColor}
              </span>
            </div>

            {/* Botones de acción alineados horizontalmente */}
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
                onClick={handleColorChange}
              >
                Cambiar color
              </button>

              {/* Botón complementario para copiar el valor HEX */}
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleCopy}
                title="Copiar al portapapeles"
              >
                {copied ? '✓ Copiado' : 'Copiar HEX'}
              </button>
            </div>
          </div>

        </article>
      </main>

    </>
  )
}

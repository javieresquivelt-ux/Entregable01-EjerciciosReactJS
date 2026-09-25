import { useState } from 'react'

const SAMPLE_TEXT =
  'React es una biblioteca de JavaScript declarativa y eficiente para construir interfaces de usuario interactivas basadas en componentes.'

/**
 * Componente: Ejercicio8 (Contador de Palabras y Caracteres)
 *
 * Conceptos clave de React y JavaScript practicados:
 * 1. Eventos en tiempo real sobre `<textarea>`: Captura continua mediante `onChange`
 *    y renderizado instantáneo del análisis del texto.
 * 2. Estado Derivado con Expresiones Regulares (RegEx):
 *    - Palabras: `text.trim().split(/\s+/)` separa por cualquier secuencia de espacios,
 *      tabuladores o saltos de línea sin crear elementos vacíos.
 *    - Caracteres sin espacios: `text.replace(/\s/g, '').length` excluye de forma
 *      estricta todos los caracteres de espaciado en blanco (`\s`).
 * 3. Buenas prácticas de arquitectura React:
 *    No se usan `useState` redundantes para los contadores; se derivan al vuelo
 *    durante cada render, garantizando consistencia absoluta y cero desincronizaciones.
 */
export function Ejercicio8() {
  // Estado para el contenido del área de texto
  const [text, setText] = useState('')

  /**
   * ── Cálculo de Métricas (Estado Derivado) ─────────────────────────────────
   */
  // 1. Conteo de palabras: divide por uno o más espacios en blanco consecutivos
  const trimmedText = text.trim()
  const wordCount = trimmedText === '' ? 0 : trimmedText.split(/\s+/).length

  // 2. Conteo de caracteres SIN espacios ni saltos de línea (requisito estricto)
  const charCountNoSpaces = text.replace(/\s/g, '').length

  // 3. Métricas complementarias de apoyo
  const totalChars = text.length
  const paragraphCount =
    trimmedText === ''
      ? 0
      : text.split(/\n+/).filter((p) => p.trim().length > 0).length

  /**
   * Limpia el contenido del área de texto
   */
  const handleClear = () => {
    setText('')
  }

  /**
   * Carga un texto de ejemplo pedagógico para pruebas rápidas
   */
  const handleLoadSample = () => {
    setText(SAMPLE_TEXT)
  }

  return (
    <>
      {/* ── Navbar Superior ───────────────────────────────────────────────── */}
      <header className="header">
        <div className="container header__content">
          <a href="./index.html" className="btn btn--back">
            ← Volver al catálogo
          </a>
          <span className="badge badge--dom">Strings &amp; Regex</span>
        </div>
      </header>

      {/* ── Contenido Principal ────────────────────────────────────────────── */}
      <main className="container container--narrow exercise-layout">
        <article className="exercise-card">

          <div className="exercise-card__header">
            <div className="exercise-card__title-group">
              <span className="exercise-card__number">#08</span>
              <h1 className="exercise-card__title">Contador de Palabras y Caracteres</h1>
            </div>
          </div>

          <div className="exercise-card__objective">
            <strong>Objetivo:</strong> Practicar el procesamiento léxico de cadenas en tiempo real
            mediante expresiones regulares. Contabilizar palabras separadas por espacios y caracteres
            excluyendo estrictamente espacios en blanco y saltos de línea.
          </div>

          {/* ── Área de Trabajo Interactiva ───────────────────────────────── */}
          <div className="exercise-card__workspace">
            <div style={{ maxWidth: '520px', margin: '0 auto' }}>

              {/* Área de texto interactiva */}
              <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                <label
                  htmlFor="text-input"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#475569',
                    marginBottom: '0.5rem',
                  }}
                >
                  Ingresa o pega tu texto a continuación:
                </label>
                <textarea
                  id="text-input"
                  rows={6}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Comienza a escribir aquí para analizar en tiempo real..."
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontFamily: 'inherit',
                    fontSize: '0.975rem',
                    lineHeight: '1.6',
                    outline: 'none',
                    resize: 'vertical',
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
              </div>

              {/* Acciones auxiliares (Limpiar / Cargar ejemplo) */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'flex-end',
                  marginBottom: '1.5rem',
                }}
              >
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleLoadSample}
                  style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
                >
                  Cargar texto de ejemplo
                </button>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleClear}
                  disabled={text === ''}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.3rem 0.75rem',
                    opacity: text === '' ? 0.5 : 1,
                    cursor: text === '' ? 'not-allowed' : 'pointer',
                  }}
                >
                  Limpiar texto
                </button>
              </div>

              {/* Grid de métricas en tiempo real */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}
              >
                {/* 1. Métrica: Palabras (Requisito obligatorio) */}
                <div
                  style={{
                    padding: '1.25rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Palabras
                  </span>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: '#4f46e5',
                      lineHeight: 1,
                    }}
                  >
                    {wordCount}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem', display: 'block' }}>
                    separadas por espacios
                  </span>
                </div>

                {/* 2. Métrica: Caracteres sin espacios (Requisito obligatorio) */}
                <div
                  style={{
                    padding: '1.25rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Caracteres
                  </span>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: '#0f172a',
                      lineHeight: 1,
                    }}
                  >
                    {charCountNoSpaces}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem', display: 'block' }}>
                    sin espacios ni saltos
                  </span>
                </div>
              </div>

              {/* Barra resumen complementaria */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '0.65rem 1rem',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.825rem',
                  color: '#64748b',
                }}
              >
                <span>
                  Caracteres totales: <strong style={{ color: '#0f172a' }}>{totalChars}</strong>
                </span>
                <span>•</span>
                <span>
                  Párrafos: <strong style={{ color: '#0f172a' }}>{paragraphCount}</strong>
                </span>
              </div>

            </div>
          </div>
        </article>
      </main>
    </>
  )
}

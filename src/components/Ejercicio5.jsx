import { useState } from 'react'

/**
 * Componente: Ejercicio5 (Calculadora Sencilla)
 *
 * Conceptos clave de React y JavaScript practicados:
 * 1. Formularios y múltiples inputs controlados: Manejo independiente de dos campos numéricos
 *    con `useState` y eventos `onChange`.
 * 2. Validación defensiva de datos: Comprobación de campos vacíos, valores numéricos válidos
 *    y prevención de operaciones matemáticas inválidas (división por cero).
 * 3. Precisión en punto flotante de JavaScript: Uso de `parseFloat(val.toFixed(8))` para evitar
 *    problemas clásicos de precisión binaria (como 0.1 + 0.2 = 0.30000000000000004).
 * 4. Renderizado condicional de mensajes de error vs. resultados exitosos.
 */
export function Ejercicio5() {
  // Estados para los operandos de entrada
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')

  // Estados para el resultado, operador aplicado y mensajes de validación
  const [result, setResult] = useState(null)
  const [operator, setOperator] = useState(null)
  const [error, setError] = useState(null)

  /**
   * Ejecuta la operación aritmética solicitada con validaciones estrictas
   * @param {string} op Símbolo de la operación: '+', '−', '×', '÷'
   */
  const handleCalculate = (op) => {
    // 1. Validación de campos requeridos
    if (num1.trim() === '' || num2.trim() === '') {
      setError('Por favor, ingresa ambos números para calcular.')
      setResult(null)
      setOperator(null)
      return
    }

    const n1 = parseFloat(num1)
    const n2 = parseFloat(num2)

    // 2. Validación de números válidos
    if (Number.isNaN(n1) || Number.isNaN(n2)) {
      setError('Por favor, ingresa valores numéricos válidos.')
      setResult(null)
      setOperator(null)
      return
    }

    // 3. Validación de división por cero
    if (op === '÷' && n2 === 0) {
      setError('No es posible dividir por cero (indefinido).')
      setResult(null)
      setOperator(null)
      return
    }

    // 4. Ejecución del cálculo
    let rawResult
    switch (op) {
      case '+':
        rawResult = n1 + n2
        break
      case '−':
        rawResult = n1 - n2
        break
      case '×':
        rawResult = n1 * n2
        break
      case '÷':
        rawResult = n1 / n2
        break
      default:
        return
    }

    // Formateo para evitar problemas de precisión en números con decimales
    const cleanResult = parseFloat(rawResult.toFixed(8))

    setError(null)
    setOperator(op)
    setResult(cleanResult)
  }

  /**
   * Restablece todos los campos al estado inicial
   */
  const handleReset = () => {
    setNum1('')
    setNum2('')
    setResult(null)
    setOperator(null)
    setError(null)
  }

  return (
    <>
      {/* ── Navbar Superior ───────────────────────────────────────────────── */}
      <header className="header">
        <div className="container header__content">
          <a href="./index.html" className="btn btn--back">
            ← Volver al catálogo
          </a>
          <span className="badge badge--forms">Formularios</span>
        </div>
      </header>

      {/* ── Contenido Principal ────────────────────────────────────────────── */}
      <main className="container container--narrow exercise-layout">
        <article className="exercise-card">

          <div className="exercise-card__header">
            <div className="exercise-card__title-group">
              <span className="exercise-card__number">#05</span>
              <h1 className="exercise-card__title">Calculadora Sencilla</h1>
            </div>
          </div>

          <div className="exercise-card__objective">
            <strong>Objetivo:</strong> Practicar el control de inputs en formularios,
            el manejo de eventos sintéticos y la validación de operaciones matemáticas
            (incluyendo prevención de división por cero y control de campos vacíos).
          </div>

          {/* ── Área de Trabajo Interactiva ───────────────────────────────── */}
          <div className="exercise-card__workspace">
            <div style={{ maxWidth: '420px', margin: '0 auto' }}>

              {/* Campos de entrada numéricos */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <label
                    htmlFor="input-num1"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#475569',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Primer número
                  </label>
                  <input
                    id="input-num1"
                    type="number"
                    step="any"
                    value={num1}
                    onChange={(e) => {
                      setNum1(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="0"
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1.1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ flex: 1, textAlign: 'left' }}>
                  <label
                    htmlFor="input-num2"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#475569',
                      marginBottom: '0.35rem',
                    }}
                  >
                    Segundo número
                  </label>
                  <input
                    id="input-num2"
                    type="number"
                    step="any"
                    value={num2}
                    onChange={(e) => {
                      setNum2(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="0"
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1.1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Botonera de operaciones matemáticas */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => handleCalculate('+')}
                  title="Sumar"
                  style={{ fontSize: '1.1rem', padding: '0.6rem 0' }}
                >
                  Sumar
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => handleCalculate('−')}
                  title="Restar"
                  style={{ fontSize: '1.1rem', padding: '0.6rem 0' }}
                >
                  Restar
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => handleCalculate('×')}
                  title="Multiplicar"
                  style={{ fontSize: '1.1rem', padding: '0.6rem 0' }}
                >
                  Multiplicar
                </button>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => handleCalculate('÷')}
                  title="Dividir"
                  style={{ fontSize: '1.1rem', padding: '0.6rem 0' }}
                >
                  Dividir
                </button>
              </div>

              {/* Botón de limpiar / reiniciar */}
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleReset}
                  style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}
                >
                  Limpiar calculadora
                </button>
              </div>

              {/* Mensaje de validación / error */}
              {error && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    color: '#dc2626',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    animation: 'fadeIn 0.2s ease',
                  }}
                  role="alert"
                >
                  ⚠️ {error}
                </div>
              )}

              {/* Resultado visual de la operación */}
              {result !== null && !error && (
                <div
                  style={{
                    padding: '1.25rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
                    textAlign: 'center',
                  }}
                  aria-live="polite"
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.85rem',
                      color: '#64748b',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    Operación: {num1} {operator} {num2}
                  </p>
                  <div
                    style={{
                      marginTop: '0.35rem',
                      fontSize: '2.25rem',
                      fontWeight: 800,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#4f46e5',
                      lineHeight: 1.2,
                    }}
                  >
                    = {result}
                  </div>
                </div>
              )}

            </div>
          </div>
        </article>
      </main>
    </>
  )
}

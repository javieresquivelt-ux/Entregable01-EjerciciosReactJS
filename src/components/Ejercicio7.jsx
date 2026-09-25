import { useState } from 'react'

// Conjuntos de caracteres para la generación de contraseñas de alta entropía
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

/**
 * Genera una contraseña segura garantizando al menos un carácter de cada tipo
 * (minúsculas, mayúsculas, dígitos y símbolos).
 *
 * @param {number} len Longitud deseada de la contraseña (>= 4)
 * @returns {string} Cadena aleatoria generada
 */
function generateRandomPassword(len) {
  const allChars = LOWERCASE + UPPERCASE + NUMBERS + SYMBOLS

  // 1. Garantizamos al menos 1 carácter de cada conjunto para máxima seguridad
  const guaranteed = [
    LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)],
    UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)],
    NUMBERS[Math.floor(Math.random() * NUMBERS.length)],
    SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
  ]

  // 2. Completamos la longitud restante seleccionando aleatoriamente del pool total
  const remaining = []
  for (let i = 4; i < len; i += 1) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    remaining.push(allChars[randomIndex])
  }

  // 3. Mezclamos los caracteres (algoritmo Fisher-Yates) para no tener un orden predecible
  const combined = [...guaranteed, ...remaining]
  for (let i = combined.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = combined[i]
    combined[i] = combined[j]
    combined[j] = temp
  }

  return combined.join('')
}

/**
 * Evalúa la fortaleza de la contraseña según su longitud
 */
function getStrengthLevel(len) {
  if (len < 8) return { label: 'Débil', color: '#ef4444', percent: '25%' }
  if (len < 12) return { label: 'Media', color: '#f59e0b', percent: '50%' }
  if (len < 16) return { label: 'Fuerte', color: '#10b981', percent: '75%' }
  return { label: 'Muy fuerte', color: '#4f46e5', percent: '100%' }
}

/**
 * Componente: Ejercicio7 (Generador de Contraseñas Aleatorias)
 *
 * Conceptos clave de React y JavaScript practicados:
 * 1. Formularios y validaciones de entrada: Control de inputs numéricos y gestión defensiva
 *    de errores (campo vacío, longitud menor a 4, valores negativos).
 * 2. Algoritmos de generación de texto y cadenas aleatorias con permutación Fisher-Yates.
 * 3. Integración con Web APIs nativas: Copiado al portapapeles (`navigator.clipboard.writeText`)
 *    con estado transitorio de feedback visual ("✓ Copiada").
 * 4. Renderizado condicional de componentes y barras de fortaleza en tiempo real.
 */
export function Ejercicio7() {
  // Estado para la longitud solicitada por el usuario (por defecto 12)
  const [length, setLength] = useState('12')
  // Estado para la contraseña generada
  const [password, setPassword] = useState('')
  // Estado para mensajes de validación
  const [error, setError] = useState(null)
  // Estado para el feedback de copiado al portapapeles
  const [copied, setCopied] = useState(false)

  /**
   * Valida la longitud y ejecuta la generación de la contraseña
   */
  const handleGenerate = () => {
    // Validación 1: Campo vacío
    if (length.trim() === '') {
      setError('Por favor, ingresa una longitud para la contraseña.')
      setPassword('')
      return
    }

    const parsedLen = parseInt(length, 10)

    // Validación 2: Número entero no válido o menor a 4
    if (Number.isNaN(parsedLen) || parsedLen < 4) {
      setError('La longitud debe ser un número entero mayor o igual a 4.')
      setPassword('')
      return
    }

    // Validación 3: Límite superior razonable para evitar bloqueos del navegador
    if (parsedLen > 128) {
      setError('Por seguridad y rendimiento, la longitud máxima es de 128 caracteres.')
      setPassword('')
      return
    }

    // Generación exitosa
    setError(null)
    setCopied(false)
    setPassword(generateRandomPassword(parsedLen))
  }

  /**
   * Copia la contraseña actual al portapapeles con feedback temporal
   */
  const handleCopy = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback silencioso si el navegador bloquea permisos
    }
  }

  const currentLen = parseInt(length, 10) || 0
  const strength = currentLen >= 4 ? getStrengthLevel(currentLen) : null

  return (
    <>
      {/* ── Navbar Superior ───────────────────────────────────────────────── */}
      <header className="header">
        <div className="container header__content">
          <a href="./index.html" className="btn btn--back">
            ← Volver al catálogo
          </a>
          <span className="badge badge--events">Seguridad</span>
        </div>
      </header>

      {/* ── Contenido Principal ────────────────────────────────────────────── */}
      <main className="container container--narrow exercise-layout">
        <article className="exercise-card">

          <div className="exercise-card__header">
            <div className="exercise-card__title-group">
              <span className="exercise-card__number">#07</span>
              <h1 className="exercise-card__title">Generador de Contraseñas</h1>
            </div>
          </div>

          <div className="exercise-card__objective">
            <strong>Objetivo:</strong> Practicar la generación algorítmica de cadenas aleatorias
            con combinación de letras, números y caracteres especiales, validando que la longitud
            sea mayor o igual a 4.
          </div>

          {/* ── Área de Trabajo Interactiva ───────────────────────────────── */}
          <div className="exercise-card__workspace">
            <div style={{ maxWidth: '440px', margin: '0 auto' }}>

              {/* Formulario de longitud */}
              <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                <label
                  htmlFor="input-length"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#475569',
                    marginBottom: '0.35rem',
                  }}
                >
                  Longitud de la contraseña (mínimo 4):
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    id="input-length"
                    type="number"
                    min="4"
                    max="128"
                    value={length}
                    onChange={(e) => {
                      setLength(e.target.value)
                      if (error) setError(null)
                    }}
                    placeholder="12"
                    style={{
                      flex: 1,
                      padding: '0.625rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1.1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={handleGenerate}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Generar contraseña
                  </button>
                </div>
              </div>

              {/* Mensaje de validación / error si longitud < 4 o campo vacío */}
              {error && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    color: '#dc2626',
                    fontSize: '0.875rem',
                    textAlign: 'center',
                    marginBottom: '1.25rem',
                    animation: 'fadeIn 0.2s ease',
                  }}
                  role="alert"
                >
                  ⚠️ {error}
                </div>
              )}

              {/* Indicador visual de fortaleza */}
              {!error && strength && (
                <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem',
                      color: '#64748b',
                      marginBottom: '0.35rem',
                    }}
                  >
                    <span>Nivel de seguridad:</span>
                    <strong style={{ color: strength.color }}>{strength.label}</strong>
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
                        width: strength.percent,
                        height: '100%',
                        background: strength.color,
                        transition: 'width 0.3s ease, background 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Display de contraseña generada */}
              {password && !error && (
                <div
                  style={{
                    padding: '1.25rem',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)',
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '0.8rem',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Contraseña generada:
                  </p>
                  <div
                    style={{
                      padding: '0.75rem',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      wordBreak: 'break-all',
                      marginBottom: '1rem',
                      userSelect: 'all',
                    }}
                  >
                    {password}
                  </div>
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={handleCopy}
                    style={{ fontSize: '0.875rem', padding: '0.4rem 1rem' }}
                  >
                    {copied ? '✓ ¡Copiada al portapapeles!' : 'Copiar contraseña'}
                  </button>
                </div>
              )}

            </div>
          </div>
        </article>
      </main>
    </>
  )
}

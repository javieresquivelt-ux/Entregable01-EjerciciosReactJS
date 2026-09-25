import { EXERCISES } from './data/exercises'
import { ExerciseCard } from './components/ExerciseCard'

/**
 * Componente Principal: App (Landing Page de Catálogo)
 * Replica con exactitud la estructura y estética del proyecto de referencia oficial:
 * Navbar sticky translúcido, Hero de presentación con píldora y Grid de tarjetas limpias.
 */
function App() {
  return (
    <>
      {/* Encabezado Principal / Navbar Sticky */}
      <header className="header">
        <div className="container header__content">
          <div className="header__brand">
            <span className="header__logo-badge">REACT</span>
            <span className="header__title">
              ConquerBlocks <span className="text-muted">• Entrega de Ejercicios</span>
            </span>
          </div>
          <div className="header__meta">
            <span className="badge badge--dom">React 19</span>
          </div>
        </div>
      </header>

      {/* Contenido Central */}
      <main className="container">
        {/* Hero / Presentación */}
        <section className="home-hero">
          <div className="home-hero__tag">
            <span>🚀 Módulo Práctico de Frontend</span>
          </div>
          <h1 className="home-hero__title">
            Catálogo de <span className="text-gradient">Ejercicios ReactJS</span>
          </h1>
          <p className="home-hero__subtitle">
            Colección de soluciones interactivas implementadas con ReactJS 19,
            componentes funcionales, hooks, eventos sintéticos y arquitectura modular.
          </p>
        </section>

        {/* Grid de Ejercicios */}
        <section className="exercises-section" aria-label="Listado de ejercicios">
          <div className="exercises-grid">
            {EXERCISES.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer Unificado */}
      <footer className="footer">
        <div className="container">
          <p className="footer__text">
            Entrega de Ejercicios Prácticos •{' '}
            <span className="footer__highlight">ConquerBlocks Fullstack</span>
          </p>
        </div>
      </footer>
    </>
  )
}

export default App

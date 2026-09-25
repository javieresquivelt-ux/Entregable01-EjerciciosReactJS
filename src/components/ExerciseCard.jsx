/**
 * Componente: ExerciseCard
 * Renderiza la tarjeta interactiva del catálogo con el diseño y look & feel
 * idéntico al proyecto de referencia.
 */
export function ExerciseCard({ exercise }) {
  const { number, title, file, badge, badgeClass, description } = exercise

  return (
    <article
      className="card card--interactive"
      tabIndex={0}
      role="link"
      aria-label={`Ir a Ejercicio ${number}: ${title}`}
      onClick={() => {
        window.location.href = file
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.location.href = file
        }
      }}
    >
      {/* Cabecera de la tarjeta: Identificador Mono y Badge Temático */}
      <div className="card__header">
        <span className="card__number">{number}</span>
        <span className={`badge ${badgeClass}`}>{badge}</span>
      </div>

      {/* Título y Descripción */}
      <h3 className="card__title">{title}</h3>
      <p className="card__description">{description}</p>

      {/* Pie interactivo */}
      <div className="card__footer">
        <span className="card__action">
          Ver solución →
        </span>
      </div>
    </article>
  )
}

/**
 * Punto de entrada de React para Ejercicio 4 - Filtro de Búsqueda en Tiempo Real.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ejercicio4 } from './components/Ejercicio4.jsx'
import './scss/app.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ejercicio4 />
  </StrictMode>
)

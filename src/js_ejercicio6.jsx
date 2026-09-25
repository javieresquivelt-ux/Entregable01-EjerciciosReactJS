/**
 * Punto de entrada de React para Ejercicio 6 - Temporizador con Inicio, Pausa y Reinicio.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ejercicio6 } from './components/Ejercicio6.jsx'
import './scss/app.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ejercicio6 />
  </StrictMode>
)

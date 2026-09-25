/**
 * Punto de entrada de React para Ejercicio 7 - Generador de Contraseñas Aleatorias.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ejercicio7 } from './components/Ejercicio7.jsx'
import './scss/app.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ejercicio7 />
  </StrictMode>
)

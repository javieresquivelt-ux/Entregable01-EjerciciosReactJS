/**
 * Punto de entrada de React para Ejercicio 5 - Calculadora Sencilla.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ejercicio5 } from './components/Ejercicio5.jsx'
import './scss/app.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ejercicio5 />
  </StrictMode>
)

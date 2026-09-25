/**
 * Punto de entrada de React para Ejercicio 8 - Contador de Palabras y Caracteres.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ejercicio8 } from './components/Ejercicio8.jsx'
import './scss/app.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ejercicio8 />
  </StrictMode>
)

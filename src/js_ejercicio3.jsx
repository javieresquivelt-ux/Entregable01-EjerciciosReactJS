/**
 * Punto de entrada de React para Ejercicio 3 - Lista Dinámica.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ejercicio3 } from './components/Ejercicio3.jsx'
import './scss/app.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ejercicio3 />
  </StrictMode>
)

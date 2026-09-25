/**
 * Punto de entrada de React para Ejercicio 9 - Lista de Tareas con LocalStorage.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ejercicio9 } from './components/Ejercicio9.jsx'
import './scss/app.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ejercicio9 />
  </StrictMode>
)

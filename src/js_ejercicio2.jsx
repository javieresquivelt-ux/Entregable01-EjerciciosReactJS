/**
 * Punto de entrada de React para Ejercicio 2 - Contador de Clics.
 *
 * Monta el componente Ejercicio2 en el nodo #root del HTML.
 * Patrón idéntico al utilizado en js_ejercicio1.jsx.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Ejercicio2 } from './components/Ejercicio2.jsx'
import './scss/app.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Ejercicio2 />
  </StrictMode>
)

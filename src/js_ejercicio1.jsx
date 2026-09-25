import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './scss/app.scss'
import { Ejercicio1 } from './components/Ejercicio1.jsx'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Ejercicio1 />
    </StrictMode>,
  )
}

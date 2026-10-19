import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import { RouterProvider } from 'react-router'
import { ROUTER } from './app/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={ROUTER}/>
  </StrictMode>,
)

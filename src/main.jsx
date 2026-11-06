/** @fileoverview Bootstrap the React application and mount it into the root element. */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/** @fileoverview Bootstrap the React application and mount it into the root element. */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

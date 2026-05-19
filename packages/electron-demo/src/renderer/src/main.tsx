import React from 'react'
import ReactDOM from 'react-dom/client'
// Baukasten component styles + codicon font (self-contained, data-URI font).
import 'baukasten-ui/dist/baukasten-base.css'
// Concrete design-token values for standalone (non-VSCode) environments.
import 'baukasten-ui/dist/baukasten-web.css'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

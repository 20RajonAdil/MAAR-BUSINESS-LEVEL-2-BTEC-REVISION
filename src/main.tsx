import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { registerOffline } from './lib/offline'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

// The offline service worker only runs in the production build.
if (import.meta.env.PROD) registerOffline()

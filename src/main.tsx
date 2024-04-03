import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from "@/components/ui/sonner"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-center" toastOptions={{
      classNames: {
        error: 'bg-red-50 text-red-700',
        success: 'bg-green-50 text-green-700',
        warning: 'bg-yellow-50 text-yellow-700',
        info: 'bg-blue-50 text-blue-700',
      },
    }} />
  </React.StrictMode>,
)

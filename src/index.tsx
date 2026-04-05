import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n/config'
import App from './App.tsx'

// Initialize theme from localStorage or default to 'dark'
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import AuthContextProvider from './context/AuthContext.jsx'
import NotesContextProvider from './context/NotesContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <NotesContextProvider>
    <BrowserRouter>
    
    <App />
    </BrowserRouter>
    </NotesContextProvider>
    </AuthContextProvider>
    
  </StrictMode>,
)

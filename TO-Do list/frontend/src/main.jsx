import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TodoContext from './context/DataProvider.jsx'

hydrateRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoContext>
      <App />
    </TodoContext>
  </StrictMode>,
)

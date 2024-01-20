import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import State from './Context/State'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <State>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </State>
)

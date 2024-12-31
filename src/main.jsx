import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './screens/Home.jsx'
import Order from './screens/Order.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedido" element={<Order />} />
      </Routes>
    </Router>
  </StrictMode>,
)

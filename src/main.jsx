import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './screens/Home.jsx'
import Order from './screens/Order.jsx'
import Login from './screens/Login.jsx'
import Pedidos from './screens/Pedidos.jsx'
import Admin from './screens/Admin.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedido" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/pedidos" element={<Pedidos />} />
      </Routes>
    </Router>
  </StrictMode>,
)

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const setAuth = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <Router>
      <Navbar token={token} role={role} logout={logout} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList token={token} />} />
          <Route path="/cart" element={token ? <Cart token={token} /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={token ? <Checkout token={token} /> : <Navigate to="/login" />} />
          <Route path="/orders" element={token ? <OrderHistory token={token} /> : <Navigate to="/login" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={token && role === 'ADMIN' ? <AdminDashboard token={token} /> : <Navigate to="/" />} />
          <Route path="/login" element={<Contact setAuth={setAuth} isLogin={true} />} />
          <Route path="/signup" element={<Contact setAuth={setAuth} isLogin={false} />} />
        </Routes>
        <footer className="mt-5 text-center">
          <p>All India Delivery 🚚</p>
          <a href="https://instagram.com/Pooja.kit.in" target="_blank" rel="noopener noreferrer">
            Follow us on Instagram @Pooja.kit.in
          </a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
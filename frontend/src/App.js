import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getUserProfile } from './redux/slices/userSlice';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import ProductDetails from './pages/Product/ProductDetails';
import Cart from './pages/Cart/Cart';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
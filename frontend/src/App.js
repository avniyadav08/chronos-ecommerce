import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Chronous - Premium Watch Store</h1>
            <p>Home Page</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
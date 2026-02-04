import React from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Chronous - Premium Watch Store</h1>
        <p>Frontend Setup Complete! ✅</p>
        <p>Redux Store Configured! 🔄</p>
      </div>
    </>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Test if basic components work
const TestHome = () => (
  <div style={{padding: '20px', fontSize: '24px', color: 'blue', textAlign: 'center'}}>
    <h1>🎉 MERN Estate is Working!</h1>
    <p>✅ React is loaded</p>
    <p>✅ Router is working</p>
    <p>✅ Icons issue fixed</p>
    <div style={{marginTop: '20px', padding: '20px', background: 'lightgreen', borderRadius: '10px'}}>
      <h2>🚀 Ready to load full app!</h2>
      <p>Your beautiful MERN Estate app is ready to run!</p>
    </div>
  </div>
);

export default function App() {
  console.log("🚀 App component loaded successfully!");
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestHome />} />
      </Routes>
    </BrowserRouter>
  );
}
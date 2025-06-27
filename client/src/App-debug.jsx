import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Simple test components
const TestHome = () => <div style={{padding: '20px', fontSize: '24px', color: 'blue'}}>🏠 Home Page Working!</div>;
const TestAbout = () => <div style={{padding: '20px', fontSize: '24px', color: 'green'}}>📖 About Page Working!</div>;
const TestHeader = () => <div style={{padding: '10px', background: 'lightblue'}}>🔝 Header Working!</div>;

export default function App() {
  console.log("🚀 App component loaded!");
  
  return (
    <div style={{padding: '20px', fontFamily: 'Arial'}}>
      <h1 style={{color: 'red', fontSize: '32px'}}>🎉 MERN Estate Debug Mode</h1>
      <p style={{fontSize: '18px'}}>If you can see this, React is working!</p>
      
      <BrowserRouter>
        <TestHeader />
        <Routes>
          <Route path="/" element={<TestHome />} />
          <Route path="/about" element={<TestAbout />} />
        </Routes>
      </BrowserRouter>
      
      <div style={{marginTop: '20px', padding: '10px', background: 'lightyellow'}}>
        <p>✅ React: Working</p>
        <p>✅ Router: Working</p>
        <p>✅ Components: Working</p>
      </div>
    </div>
  );
}
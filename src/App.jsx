import React, { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Stadistics from "./components/Stadistics";
import Footer from "./components/Footer";

export default function App() {
  const [modoOscuro, setModoOscuro] = useState(false);

  return (
    <Router>
      <div className={modoOscuro ? "dark bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
        {/* <header className="bg-blue-700 dark:bg-blue-900 text-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">🚗 Mi Garage Hot Wheels</h1>
          <DarkModeToggle activo={modoOscuro} setActivo={setModoOscuro} />
        </div>
      </header> */}
        <Header activo={modoOscuro} setActivo={setModoOscuro} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/estadisticas" element={<Stadistics />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
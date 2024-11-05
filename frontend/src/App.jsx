import "./App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Register } from "./components/index.js";
import { Home } from "./pages/index.js";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

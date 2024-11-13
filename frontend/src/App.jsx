import "./App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Register } from "./components";
import { Home, Products, Layout } from "./pages";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </main>
  );
}

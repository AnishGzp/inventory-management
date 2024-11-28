import "./App.css";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Register } from "./components";
import {
  Home,
  Products,
  Layout,
  AddProducts,
  EditProducts,
  Vendor,
  AddVendors,
  EditVendor,
  Category,
  EditCategory,
  AddCategory,
} from "./pages";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Product Routes */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/addProducts" element={<AddProducts />} />
          <Route path="/products/editProducts" element={<EditProducts />} />
          {/* Vendor Routes */}
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/vendor/addVendor" element={<AddVendors />} />
          <Route path="/vendor/editVendor" element={<EditVendor />} />
          {/* Category Routes */}
          <Route path="/category" element={<Category />} />
          <Route path="/category/AddCategory" element={<AddCategory />} />
          <Route path="/category/editCategory" element={<EditCategory />} />
        </Route>
      </Routes>
    </main>
  );
}

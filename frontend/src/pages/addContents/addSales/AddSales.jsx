import "../style.css";
import "./addSales.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddInput } from "../../../components";
import { addSales } from "../../../utilities";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [salesData, setSalesData] = useState({
    customer: "",
    product: "",
    quantity: "",
    price: "",
    vendor: "",
  });

  const [addProductSelect, setAddProductSelect] = useState([
    {
      id: "product",
      values: [],
    },
    {
      id: "vendor",
      values: [],
    },
  ]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function getProduct() {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();

    const ProductValue = data.map((item) => ({
      value: item.name,
      price: item.price,
    }));

    setAddProductSelect((prevData) =>
      prevData.map((field) =>
        field.id === "product" ? { ...field, values: ProductValue } : field
      )
    );
  }

  async function getVendor() {
    const res = await fetch("http://localhost:3000/vendors");
    const data = await res.json();

    const vendorValue = data.map((item) => ({ value: item.name }));

    setAddProductSelect((prevData) =>
      prevData.map((field) =>
        field.id === "vendor" ? { ...field, values: vendorValue } : field
      )
    );
  }

  useEffect(() => {
    getProduct();
    getVendor();
  }, []);

  useEffect(() => {
    document.getElementById("price").classList.remove("error");
    document.getElementById("price").value = salesData.price;
  }, [salesData]);

  function handleChange(e) {
    const { id, value } = e.target;
    document.getElementById(id).classList.remove("error");

    setSalesData((prevData) => {
      const updatedData = { ...prevData, [id]: value };

      if (id === "product" || id === "quantity") {
        const selectedProduct = addProductSelect
          .find((field) => field.id === "product")
          ?.values.find((product) => product.value === updatedData.product);

        if (selectedProduct && updatedData.quantity) {
          updatedData.price = (
            parseFloat(selectedProduct.price) *
            parseInt(updatedData.quantity, 10)
          ).toFixed(2);
        }
      }

      return updatedData;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/add/sales", {
        method: "POST",
        body: JSON.stringify(salesData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.status === 400 && data.missingFields) {
        setLoading(false);
        toast.error("Enter all fields");
        data.missingFields.map((item) => {
          document.getElementById(item).classList.add("error");
        });
      } else if (res.status === 500) {
        setLoading(false);
        toast.error("Internal server error");
      } else if (res.status === 400 && data.code === 2211) {
        setLoading(false);
        toast.error("Not enough stocks.");
      } else if (res.status === 404) {
        setLoading(false);
        toast.error("Product not found. Try again later");
      } else if (res.status === 200) {
        toast.success("Sales addded successfully");
        setTimeout(() => {
          navigate("/sales");
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Data not Submitted.Try again later");
    }
  }
  return (
    <div className="addProducts">
      <div className="addProducts_container addSales_container">
        <AddInput
          title="Add Products"
          addContents={addSales}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          select={true}
          addSelect={addProductSelect}
          loading={loading}
        />
      </div>
      <ToastContainer position="bottom-right" autoClose="2000" />
    </div>
  );
}

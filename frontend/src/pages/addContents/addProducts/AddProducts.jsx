import "../style.css";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddInput } from "../../../components";
import { addProducts, addProductSelect } from "../../../utilities";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [productdata, setProductData] = useState({
    skuNo: "",
    name: "",
    category: "",
    desc: "",
    quantity: "",
    price: "",
    vendor: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { id, value } = e.target;
    document.getElementById(id).classList.remove("error");
    setProductData((prevData) => ({ ...prevData, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/add/products", {
        method: "POST",
        body: JSON.stringify(productdata),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.status === 400 && data.missingFields) {
        toast.error("Enter all fields");
        data.missingFields.map((item) => {
          document.getElementById(item).classList.add("error");
        });
      } else if (res.status === 500) {
        toast.error("Internal server error");
      } else if (res.status === 400 && data.error.code === "ER_DUP_ENTRY") {
        toast.error("SKU already exist");
      } else if (res.status === 200) {
        toast.success("Product addded successfully");
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Data not Submitted.Try again later");
    }
  }
  return (
    <div className="addProducts">
      <div className="addProducts_container">
        <AddInput
          title="Add Products"
          addContents={addProducts}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          select={true}
          addSelect={addProductSelect}
        />
      </div>
      <ToastContainer position="bottom-right" autoClose="2000" />
    </div>
  );
}

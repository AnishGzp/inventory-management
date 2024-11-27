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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { id, value } = e.target;
    document.getElementById(id).classList.remove("error");
    setProductData((prevData) => ({ ...prevData, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/add/products", {
        method: "POST",
        body: JSON.stringify(productdata),
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
      } else if (res.status === 400 && data.error.code === "ER_DUP_ENTRY") {
        setLoading(false);
        toast.error("SKU already exist");
      } else if (res.status === 200) {
        setLoading(false);
        toast.success("Product addded successfully");
        setTimeout(() => {
          navigate("/products");
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
      <div className="addProducts_container">
        <AddInput
          title="Add Products"
          addContents={addProducts}
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

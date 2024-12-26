import "../style.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AddInput } from "../../../components";
import {
  editProducts as originalEditProducts,
  editProductSelect as originalEditProductSelect,
} from "../../../utilities";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditProducts() {
  const [productdata, setProductData] = useState({
    skuNo: "",
    name: "",
    category: "",
    description: "",
    quantity: "",
    price: "",
    vendor: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { item } = location.state || {};

  useEffect(() => {
    if (item) {
      setProductData(item);
    }
  }, [item]);

  const editProducts = originalEditProducts.map((field) => ({
    ...field,
    value: productdata[field.id],
  }));

  const editProductSelect = originalEditProductSelect.map((field) => ({
    ...field,
    value: productdata[field.id],
  }));

  function handleChange(e) {
    const { id, value } = e.target;
    document.getElementById(id).classList.remove("error");
    setProductData((prevData) => ({ ...prevData, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `https://inventory-management-1m3p.onrender.com/edit/products/${productdata.skuNo}`,
        {
          method: "POST",
          body: JSON.stringify(productdata),
          headers: { "Content-Type": "application/json" },
        }
      );

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
        toast.success("Product edited successfully");
        setTimeout(() => {
          navigate("/products");
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
    <div className="editProducts">
      <div className="addProducts_container">
        <AddInput
          title="Edit Products"
          addContents={editProducts}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          select={true}
          addSelect={editProductSelect}
          loading={loading}
        />
      </div>
      <ToastContainer position="bottom-right" autoClose="2000" />
    </div>
  );
}

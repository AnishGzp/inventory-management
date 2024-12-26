import "../style.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddInput } from "../../../components";
import { addProducts } from "../../../utilities";
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

  const [addProductSelect, setAddProductSelect] = useState([
    {
      id: "category",
      values: [],
    },
    {
      id: "vendor",
      values: [],
    },
  ]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function getCategory() {
    const res = await fetch(
      "https://inventory-management-1m3p.onrender.com/category"
    );
    const data = await res.json();

    const categoryValue = data.map((item) => ({ value: item.name }));

    setAddProductSelect((prevData) =>
      prevData.map((field) =>
        field.id === "category" ? { ...field, values: categoryValue } : field
      )
    );
  }

  async function getVendor() {
    const res = await fetch(
      "https://inventory-management-1m3p.onrender.com/vendors"
    );
    const data = await res.json();

    const vendorValue = data.map((item) => ({ value: item.name }));

    setAddProductSelect((prevData) =>
      prevData.map((field) =>
        field.id === "vendor" ? { ...field, values: vendorValue } : field
      )
    );
  }

  useEffect(() => {
    getCategory();
    getVendor();
  }, []);

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
        "https://inventory-management-1m3p.onrender.com/add/products",
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
        toast.success("Product addded successfully");
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

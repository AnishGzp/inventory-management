import "../style.css";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddInput } from "../../../components";
import { addCategory } from "../../../utilities";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    const { id, value } = e.target;
    document.getElementById(id).classList.remove("error");
    setCategoryData((prevData) => ({ ...prevData, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        "https://inventory-management-1m3p.onrender.com/add/category",
        {
          method: "POST",
          body: JSON.stringify(categoryData),
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
        toast.error("Name already exist");
      } else if (res.status === 200) {
        toast.success("Category addded successfully");
        setTimeout(() => {
          navigate("/category");
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
          title="Add Category"
          addContents={addCategory}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          select={false}
          loading={loading}
        />
      </div>
      <ToastContainer position="bottom-right" autoClose="2000" />
    </div>
  );
}

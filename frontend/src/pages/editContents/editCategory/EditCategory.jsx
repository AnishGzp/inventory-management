import "../style.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AddInput } from "../../../components";
import { addCategory as originaladdCategory } from "../../../utilities";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditCategory() {
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { item } = location.state || {};

  useEffect(() => {
    if (item) {
      setCategoryData(item);
    }
  }, [item]);

  const addCategory = originaladdCategory.map((field) => ({
    ...field,
    value: categoryData[field.id],
  }));

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
        `https://inventory-management-1m3p.onrender.com/edit/category/${categoryData.name}`,
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
        toast.error("Category name already exist");
      } else if (res.status === 200) {
        toast.success("Category edited successfully");
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
    <div className="editProducts">
      <div className="addProducts_container">
        <AddInput
          title="Edit Category"
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

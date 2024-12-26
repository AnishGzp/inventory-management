import "../style.css";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AddInput } from "../../../components";
import { addVendors as originalAddVendors } from "../../../utilities";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditVendor() {
  const [vendorData, setVendorData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { item } = location.state || {};

  console.log(item);

  useEffect(() => {
    if (item) {
      setVendorData(item);
    }
  }, [item]);

  const addVendors = originalAddVendors.map((field) => ({
    ...field,
    value: vendorData[field.id],
  }));

  function handleChange(e) {
    const { id, value } = e.target;
    document.getElementById(id).classList.remove("error");
    setVendorData((prevData) => ({ ...prevData, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `https://inventory-management-1m3p.onrender.com/edit/vendor/${vendorData.name}`,
        {
          method: "POST",
          body: JSON.stringify(vendorData),
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
        toast.error("Vendor name already exist");
      } else if (res.status === 200) {
        toast.success("Vendor edited successfully");
        setTimeout(() => {
          navigate("/vendor");
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
          title="Edit Vendor"
          addContents={addVendors}
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

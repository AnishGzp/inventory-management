import "./sales.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchAdd, SalesTableInfo } from "../../components";
import { salesTitle } from "../../utilities";
import { toast } from "react-toastify";

export default function Sales() {
  const [salesData, setSalesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  async function getsales() {
    const res = await fetch(
      "https://inventory-management-1m3p.onrender.com/sales"
    );
    const data = await res.json();

    setSalesData(data);
    console.log(salesData);
  }

  useEffect(() => {
    getsales();
  }, []);

  const filteredData =
    searchQuery.trim() !== ""
      ? salesData.filter((item) => {
          return item.customer
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase());
        })
      : salesData;

  function handleDelete(id) {
    const delteAlert = window.confirm("Delete the product");
    if (delteAlert) {
      fetch(
        `https://inventory-management-1m3p.onrender.com/delete/sales/${id}`
      ).then((res) => {
        if (res.status === 500) {
          toast.error("Internal server error");
        } else if (res.status === 404) {
          toast.error("Sales not found");
        } else if (res.status === 200) {
          toast.success("Sales deleted successfully");
          setSalesData((prevData) => prevData.filter((item) => item.id !== id));
        }
      });
    } else return;
  }

  return (
    <div className="sales">
      <div className="sales_container">
        <SearchAdd
          title="sales"
          handleClick={() => {
            navigate("/sales/addsales");
          }}
          setSearchQuery={setSearchQuery}
        />
        <SalesTableInfo
          title="sales"
          salesTitle={salesTitle}
          salesData={filteredData}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

import "./vendor.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchAdd, VendorTableInfo } from "../../components";
import { vendorTitle } from "../../utilities";
import { toast } from "react-toastify";

export default function Vendor() {
  const [vendorData, setVendorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  async function getVendor() {
    const res = await fetch(
      "https://inventory-management-1m3p.onrender.com/vendors"
    );
    const data = await res.json();

    setVendorData(data);
  }

  useEffect(() => {
    getVendor();
  }, []);

  const filteredData =
    searchQuery.trim() !== ""
      ? vendorData.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase());
        })
      : vendorData;

  function handleDelete(name) {
    const delteAlert = window.confirm("Delete the product");
    if (delteAlert) {
      fetch(
        `https://inventory-management-1m3p.onrender.coms/delete/vendor/${name}`
      ).then((res) => {
        if (res.status === 500) {
          toast.error("Internal server error");
        } else if (res.status === 404) {
          toast.error("Vendor not found");
        } else if (res.status === 200) {
          toast.success("Vendor deleted successfully");
          setVendorData((prevData) =>
            prevData.filter((item) => item.name !== name)
          );
        }
      });
    } else return;
  }

  return (
    <div className="vendor">
      <div className="vendor_container">
        <SearchAdd
          title="vendors"
          handleClick={() => {
            navigate("/vendor/addVendor");
          }}
          setSearchQuery={setSearchQuery}
        />
        <VendorTableInfo
          title="vendors"
          vendorTitle={vendorTitle}
          vendorData={filteredData}
          handleDelete={handleDelete}
          handleEdit={(item) => {
            navigate("/vendor/editVendor", { state: { item } });
          }}
        />
      </div>
    </div>
  );
}

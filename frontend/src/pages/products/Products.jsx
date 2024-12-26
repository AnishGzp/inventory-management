import "./product.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchAdd, ProductTableInfo } from "../../components";
import { productTitle } from "../../utilities";
import { toast } from "react-toastify";

export default function Products() {
  const [prouctData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  async function getProduct() {
    const res = await fetch(
      "https://inventory-management-1m3p.onrender.com/products"
    );
    const data = await res.json();

    setProductData(data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  const filteredData =
    searchQuery.trim() !== ""
      ? prouctData.filter((item) => {
          return item.name
            .toLowerCase()
            .includes(searchQuery.toLocaleLowerCase());
        })
      : prouctData;

  function handleDelete(skuNo) {
    const delteAlert = window.confirm("Delete the product");
    if (delteAlert) {
      fetch(
        `https://inventory-management-1m3p.onrender.com/delete/product/${skuNo}`
      ).then((res) => {
        if (res.status === 500) {
          toast.error("Internal server error");
        } else if (res.status === 404) {
          toast.error("Product not found");
        } else if (res.status === 200) {
          toast.success("Product deleted successfully");
          setProductData((prevData) =>
            prevData.filter((item) => item.skuNo !== skuNo)
          );
        }
      });
    } else return;
  }

  return (
    <div className="product">
      <div className="product_container">
        <SearchAdd
          title="products"
          handleClick={() => {
            navigate("/products/addProducts");
          }}
          setSearchQuery={setSearchQuery}
        />
        <ProductTableInfo
          title="products"
          productTitle={productTitle}
          prouctData={filteredData}
          handleDelete={handleDelete}
          handleEdit={(item) => {
            navigate("/products/editProducts", { state: { item } });
          }}
        />
      </div>
    </div>
  );
}
